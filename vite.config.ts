import { build, defineConfig, mergeConfig } from "vite";
import { serveDirectoryPlugin } from "./vite-plugins/serveDirectoryPlugin.js";
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import { sitemapPlugin } from "./vite-plugins/sitemapPlugin.js";
import { render } from "svelte/server";
import { imagetools } from 'vite-imagetools'
import fs from "fs/promises";

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
				"404": root + "/404.html",
				"cv": root + "/cv/index.html",
			}
		}
	},
	plugins: [
		imagetools(),
		serveDirectoryPlugin(["external/symlinks"]),
		sitemapPlugin({ hostname: "https://heledron.com" }),
		tailwindcss(),
		svelte({
			configFile: path.resolve(__dirname, "svelte.config.js"),
		}),
		{
			name: "vite-plugin-svelte-ssr",
			enforce: "post",
			async transformIndexHtml(html, context) {
				const componentPaths = {
					"/index.html": "/home/MyApp.svelte",
				}
				

				const componentPath = componentPaths[context.path];
				if (!componentPath) return html;

				const module = await (context.server ? 
					context.server.ssrLoadModule(componentPath) :
					compileAndImportTemporaryModule(componentPath));

				// render component
				const result = render(module.default, {});

				// replace HTML
				return html
					.replace("<!-- ssr_body -->", result.body);
			}
		}
	]
});

async function compileAndImportTemporaryModule(modulePath: string) {
	const compileDir = path.resolve(__dirname, "dist/ssr-temp");

	await build({
		configFile: path.resolve(__dirname, "vite.config.ts"),
		publicDir: false,
		build: {
			ssr: true,
			emptyOutDir: true,
			emitAssets: false,
			rollupOptions: {
				input: modulePath,
				output: {
					entryFileNames: "ssr.js",
					dir: compileDir,
				}
			}
		}
	});

	const module = await import(path.join(compileDir, "ssr.js"));

	await fs.rm(compileDir, { recursive: true });

	return module;
}