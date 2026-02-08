import { type Plugin } from "vite";

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

export function sitemapToXML(sitemap: SiteMap): string {
	const urlset = sitemap.routes
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

export async function writeSitemap(options: {
	hostname: string,
	scanDirectoryPath: string,
	outputPath: string
}) {
	if (!options.hostname.endsWith("/")) options.hostname += "/";

	const files = await fsGetRecursive(options.scanDirectoryPath);
	const htmlFiles = files.filter((file) => file.isFile && file.name === "index.html");

	const routes = htmlFiles.map((file) => {
		return options.hostname + file.path.substring(0, file.path.length - "index.html".length);
	});


	routes.sort((a, b) => a.localeCompare(b));

	const siteMap = siteMapFromRouteList(routes);
	const xml = sitemapToXML(siteMap);

	await fs.writeFile(options.outputPath, xml);
}


export function sitemapPlugin({ hostname }: { hostname: string }): Plugin {
	let outputDir: string | undefined = undefined;

	return {
		enforce: "post",
		name: "sitemap-plugin",
		async configResolved(config) {
			outputDir = config.build.outDir;
		},
		async closeBundle() {
			if (!outputDir) {
				throw new Error("outputDir is undefined");
			}
			
			await writeSitemap({
				hostname,
				scanDirectoryPath: outputDir,
				outputPath: outputDir + "/sitemap.xml",
			});
		},
	};
}

import { promises as fs } from "fs";
async function fsGetRecursive(folder: string, base = ""): Promise<{ isDirectory: boolean; isFile: boolean; name: string; path: string; }[]> {
	const direntList = await fs.readdir(folder, { withFileTypes: true });

	const prefix = base === "" ? "" : base + "/";

	const files = await Promise.all(
		direntList.map(async (dirent) => {
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