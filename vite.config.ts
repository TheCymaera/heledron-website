import { defineConfig } from "vite";
import { serveDirectoryPlugin } from "./vite-plugins/serveDirectoryPlugin.js";
import path from "path";
import { sitemapPlugin } from "./vite-plugins/sitemapPlugin.js";

const root = path.resolve(__dirname, "src");

export default defineConfig({
	root: root,
	publicDir: path.resolve(__dirname, "public"),

	build: {
		outDir: path.resolve(__dirname, "dist"),
		emptyOutDir: true,

		modulePreload: {
			polyfill: false,
		},

		rollupOptions: {
			input: {
				"home": root + "/index.html",
				"403": root + "/error-pages/403.html",
				"404": root + "/error-pages/404.html",
				"cv": root + "/cv/index.html",
			}
		}
	},
	plugins: [
		serveDirectoryPlugin(["external/symlinks"]),
		sitemapPlugin({ hostname: "https://heledron.com" }),
	],
});