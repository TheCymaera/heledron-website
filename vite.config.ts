import { createServer, defineConfig } from "vite";
import { serveDirectoryPlugin } from "./vite-plugins/serveDirectoryPlugin.js";
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import { sitemapPlugin } from "./vite-plugins/sitemapPlugin.js";
import { render } from "svelte/server";
import { imagetools } from 'vite-imagetools'

const root = path.resolve(__dirname, "src");

export default defineConfig({
	root: root,
	publicDir: path.resolve(__dirname, "public"),
	ssr: {
		
	},

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
		serveDirectoryPlugin(["external/symlinks"]),
		sitemapPlugin({ hostname: "https://heledron.com" }),
		tailwindcss(),
		imagetools(),
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

				const module = context.server ? 
					await context.server.ssrLoadModule(componentPath) :
					await (async ()=>{
						const server = await createBuildServer();
						await server.transformIndexHtml(context.path, html);
						const module =  await server.ssrLoadModule(componentPath);
						await server.close();
						return module;
					})();
				
				if (!module) return html;

				// render the component
				const result = render(module.default, {});

				// replace HTML
				return html
					.replace("<!-- ssr_body -->", result.body);
			}
		}
	],
	server: {
		
	}
});

function createBuildServer() {
	return createServer({
		customLogger: {
			info() {},
			warn() {},
			warnOnce() {},
			error() {},
			clearScreen() {},
			hasErrorLogged: ()=>false,
			hasWarned: false,
		},
	})
}