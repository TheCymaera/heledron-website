import { type Plugin } from "vite";

// @ts-ignore
import * as fs from "fs";
export function serveDirectoryPlugin(directories: string[]): Plugin {
	const mimeTypes = {
		".html": "text/html",
		".js": "text/javascript",
		".css": "text/css",
		".png": "image/png",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".svg": "image/svg+xml",
		".json": "application/json",
		".woff": "font/woff",
		".woff2": "font/woff2",
		".ttf": "font/ttf",
		".eot": "font/eot",
		".otf": "font/otf",
		".wasm": "application/wasm",
		".mjs": "text/javascript",
		".txt": "text/plain",
		".xml": "text/xml",
		".mp3": "audio/mpeg",
		".mp4": "video/mp4",
		".webm": "video/webm",
		".webp": "image/webp",
		".ico": "image/x-icon",
		".tiff": "image/tiff",
		".gz": "application/gzip",
		".zip": "application/zip",
		".rar": "application/x-rar-compressed",
		".7z": "application/x-7z-compressed",
	}

	const indices = [
		"index.html",
	]
	
	return {
		name: "alt-public",
		async configureServer({ middlewares }) {
			middlewares.use(async (req, res, next) => {
				if (req.originalUrl === undefined) return next();

				const pathname = req.originalUrl.split("?")[0] || "/";
				const possibleSuffices = pathname.endsWith("/") ? indices : [""];

				for (const dir of directories) {
					for (const suffix of possibleSuffices) {
						const filePath = dir + pathname + suffix;
						const extension = filePath.substring(filePath.lastIndexOf("."));

						if (fs.existsSync(filePath)) {
							res.statusCode = 200;
							res.setHeader("Content-Type", mimeTypes[extension] || "text/plain");
							res.end(fs.readFileSync(filePath));
							return;
						}
					}
				}
				next();
			});
		},
		async writeBundle(options, bundle) {
			for (const dir of directories) {
				const src = dir;
				const dst = options.dir;
				if (!dst) throw new Error("options.dir is undefined");

				copyRecursively(src, dst);

				function copyRecursively(src: string, dst: string) {
					if (fs.statSync(src).isDirectory()) {
						// folder
						if (!fs.existsSync(dst)) {
							fs.mkdirSync(dst);
						}
						for (const file of fs.readdirSync(src)) {
							copyRecursively(src + "/" + file, dst + "/" + file);
						}
					} else {
						// file
						fs.copyFileSync(src, dst);
					}
				}
			}
		}
	};
}