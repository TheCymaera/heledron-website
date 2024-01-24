interface SiteMapRoute {
	path: string;
	lastmod: string;
	priority: number;
	changefreq: string;
}

interface SiteMap {
	routes: SiteMapRoute[];
}

export function siteMapFromRouteList(routes: string[]): SiteMap {
	const now = new Date().toISOString();
	const siteMapRoutes = routes.map((route) => ({
		path: route,
		lastmod: now,
		priority: 1.0,
		changefreq: "monthly",
	}));

	return {
		routes: siteMapRoutes,
	};
}

export function sitemapToXML(routes: SiteMapRoute[]): string {
	const urlset = routes
		.map(
			(route) => `	<url>
		<loc>${route.path}</loc>
		<lastmod>${route.lastmod}</lastmod>
		<priority>${route.priority}</priority>
		<changefreq>${route.changefreq}</changefreq>
	</url>`
		)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>`;
}

import { Dirent, promises as fs } from "fs";
async function fsGetRecursive(folder: string, base = ""): Promise<{ isDirectory: boolean; isFile: boolean; name: string; path: string; }[]> {
	const dirents = await fs.readdir(folder, { withFileTypes: true });

	const prefix = base === "" ? "" : base + "/";

	const files = await Promise.all(
		dirents.map(async (dirent) => {
			const res = {
				isDirectory: dirent.isDirectory(),
				isFile: dirent.isFile(),
				name: dirent.name,
				path: prefix + dirent.name,
			};
			if (res.isDirectory) {
				return await fsGetRecursive(folder + "/" + dirent.name, prefix + dirent.name);
			} else {
				return [res];
			}
		})
	);

	return files.flat();
}




import { type Plugin } from "vite";
export function sitemapPlugin({ hostname }: { hostname: string }): Plugin {
	if (!hostname.endsWith("/")) hostname += "/";

	return {
		name: "sitemap-plugin",
		async writeBundle(options) {
			const outputDir = options.dir;
			if (!outputDir) throw new Error("options.dir is undefined");

			const files = await fsGetRecursive(outputDir);

			const routes = files.filter((file) => file.isFile && file.name === "index.html").map((file) => {
				return hostname + file.path.substring(0, file.path.length - "index.html".length);
			});

			const siteMap = siteMapFromRouteList(routes);
			const xml = sitemapToXML(siteMap.routes);
			
			await fs.writeFile(outputDir + "/sitemap.xml", xml);
		},
	};
}