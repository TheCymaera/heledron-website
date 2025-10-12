import "vite/client";

declare module '*&format=webp' {
	const value: string
	export default value
}

declare module '*?format=webp' {
	const value: string
	export default value
}