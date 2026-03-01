//declare module '*&format=webp' {
//	const value: string
//	export default value
//}

//declare module '*?format=webp' {
//	const value: string
//	export default value
//}

interface WebpPictureMetadata {
	img: {
		src: string;
		w: number;
		h: number;
	};
	sources: {
		webp: string;
	};
}

declare module '*?format=webp&as=picture' {
	const value: WebpPictureMetadata
	export default value
}

declare module '*&format=webp&as=picture' {
	const value: WebpPictureMetadata
	export default value
}