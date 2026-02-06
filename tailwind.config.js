/** @type {import('tailwindcss').Config}*/
export default {
	content: ["./src/**/*.{html,js,svelte,ts,css}"],

	experimental: {
		optimizeUniversalDefaults: true,
	},
	future: {
		hoverOnlyWhenSupported: true,
	}
};