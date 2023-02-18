import { defineConfig } from "vite";
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteSingleFile } from 'vite-plugin-singlefile'

const page_url = "https://heledron.com/"

const page_title					= "Heledron";
const page_description		= "Heledron - Home Page";
const page_author					= "Morgan";
const page_keywords				= "Heledron, Hadron, Cymaera";
const page_og_title 				= page_title;
const page_og_description 	= page_description;
const page_og_url 					= page_url;
const page_og_image 				= page_og_url + "thumbnail.webp";
const page_og_type 					= "website";

export default defineConfig({
	base: "./",
	build: {
		polyfillModulePreload: false,
	},
	plugins: [
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					page_url,
					page_title,
					page_description,
					page_author,
					page_keywords,
					page_og_title,
					page_og_description,
					page_og_url,
					page_og_image,
					page_og_type,
				}
			}
		}),
		viteSingleFile(),
	],
});