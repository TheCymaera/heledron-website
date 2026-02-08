import { defineConfig } from 'astro/config';
import { defineConfig as defineViteConfig } from 'vite';
import { serveDirectoryPlugin } from "./vite-plugins/serveDirectoryPlugin.js";
import tailwindcss from '@tailwindcss/vite'
import { writeSitemap } from "./vite-plugins/sitemapPlugin.js";
import { imagetools } from 'vite-imagetools'
import svelte from '@astrojs/svelte';
import type { AstroIntegration, ViteUserConfig } from 'astro';

export default defineConfig({
	site: "https://heledron.com",
	integrations: [svelte(), sitemapIntegration()],
	vite: defineViteConfig({
		plugins: [
			imagetools(),
			serveDirectoryPlugin(["external/symlinks"]),
			tailwindcss(),
		]
	}) as ViteUserConfig,
});

function sitemapIntegration(): AstroIntegration {
	return {
		name: "sitemap-integration",
		hooks: {
			'astro:build:done': async ({ dir }) => {
				const dirPath = decodeURIComponent(dir.pathname);
				await writeSitemap({
					hostname: "https://heledron.com",
					scanDirectoryPath: dirPath,
					outputPath: dirPath + "/sitemap.xml",
				});
			}
		}
	}
}