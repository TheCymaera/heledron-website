<script lang="ts">
import { fa5_brands_discord, fa5_brands_github, fa5_brands_instagram, fa5_brands_redditAlien, fa5_brands_tiktok, fa5_brands_twitter, fa5_brands_youtube, fa5_solid_envelope, fa6_brands_bluesky } from "fontawesome-svgs";

import QRCodeGeneratorThumbnail          from "../../external/symlinks/tools/qr-code-generator/thumbnail.webp?w=512&format=webp";
import ImageFolderResizerThumbnail       from "../../external/symlinks/tools/image-folder-resizer/thumbnail.webp?w=512&format=webp"
import FileConverterThumbnail            from "../../external/symlinks/tools/file-converter/thumbnail.webp?w=512&format=webp"
import VisualAcuityTestThumbnail         from "../../external/symlinks/tools/visual-acuity-test/thumbnail.webp?w=512&format=webp"
import BoidsThumbnail                    from "../../external/symlinks/misc/boids/thumbnail.webp?w=512&format=webp"
import SortingAlgorithmThumbnail         from "../../external/symlinks/misc/sorting-algorithm-visualizer/thumbnail.webp?w=512&format=webp"
import KinematicChainThumbnail           from "../../external/symlinks/misc/kinematic-chain/thumbnail.webp?w=512&format=webp"
import DoublePendulumThumbnail           from "../../external/symlinks/misc/double-pendulum/thumbnail.webp?w=512&format=webp"
import UniversalTimeThumbnail            from "../../external/symlinks/tools/universal-time/thumbnail.webp?w=512&format=webp"
import EMCLCompilerThumbnail             from "../../external/symlinks/tools/emcl-compiler/thumbnail.webp?w=512&format=webp"
import ReuleauxPolygonGeneratorThumbnail from "../../external/symlinks/tools/reuleaux-polygon-generator/thumbnail.webp?w=512&format=webp"
import PixelTextGeneratorThumbnail       from "../../external/symlinks/tools/pixel-text-generator/thumbnail.webp?w=512&format=webp"
import SuvatCalculatorThumbnail          from "../../external/symlinks/tools/suvat-calculator/thumbnail.webp?w=512&format=webp"
import Ascii3DThumbnail                  from "../../external/symlinks/misc/ascii3d/demos/water/thumbnail.webp?w=512&format=webp"

const tools = [
	{
		href: "./tools/qr-code-generator/",
		imageSrc: QRCodeGeneratorThumbnail,
		title: "QR Code Generator",
		details: "Generate QR Codes.",
	},
	
	{
		href: "./tools/image-folder-resizer/",
		imageSrc: ImageFolderResizerThumbnail,
		title: "Image Folder Resizer",
		details: "Batch resize images inside a folder hierarchy.",
	},
	
	{
		href: "./tools/file-converter/",
		imageSrc: FileConverterThumbnail,
		title: "File Converter",
		details: "Convert audio, image and video formats.",
	},
	
	{
		href: "./tools/visual-acuity-test/",
		imageSrc: VisualAcuityTestThumbnail,
		title: "Visual Acuity Test",
		details: "Randomized eye test.",
	},
	
	{
		href: "./misc/boids/",
		imageSrc: BoidsThumbnail,
		title: "Boids",
		details: "Flocking Simulation.",
	},
	
	{
		href: "./misc/sorting-algorithm-visualizer/",
		imageSrc: SortingAlgorithmThumbnail,
		title: "Sorting Algorithm Visualizer",
		details: "Visualize Sorting Algorithms.",
	},
	
	{
		href: "./misc/kinematic-chain/",
		imageSrc: KinematicChainThumbnail,
		title: "Kinematic Chain",
		details: "Kinematic Chain simulation.",
	},
	
	{
		href: "./misc/double-pendulum/",
		imageSrc: DoublePendulumThumbnail,
		title: "Double Pendulum",
		details: "Double Pendulum physics simulation.",
	},
	
	{
		href: "./tools/universal-time/",
		imageSrc: UniversalTimeThumbnail,
		title: "Universal Time",
		details: "Share date times across timezones.",
	},
	
	{
		href: "./tools/emcl-compiler/",
		imageSrc: EMCLCompilerThumbnail,
		title: "EMCL Compiler",
		details: "A compiler for Minecraft functions.",
	},
	
	{
		href: "./tools/reuleaux-polygon-generator/",
		imageSrc: ReuleauxPolygonGeneratorThumbnail,
		title: "Reuleaux Polygon Generator",
		details: "Generate figures of constant width.",
	},
	
	{
		href: "./tools/pixel-text-generator/",
		imageSrc: PixelTextGeneratorThumbnail,
		title: "Pixel Text Generator",
		details: "Generate pixel text of various styles.",
	},
	
	{
		href: "./tools/suvat-calculator/",
		imageSrc: SuvatCalculatorThumbnail,
		title: "SUVAT Calculator",
		details: "Automatically solve SUVAT equations.",
	},
	
	{
		href: "./misc/ascii3d/demos/water/",
		imageSrc: Ascii3DThumbnail,
		title: "Ascii 3D Water Demo",
		details: "A text-based 3D renderer for JavaScript.",
	},
]

const socials = [
	{
		target: "_blank",
		href: "https://www.youtube.com/channel/UCW9KvoeUz2CsBwIGh3ux1ew",
		icon: fa5_brands_youtube,
		label: "YouTube",
	},
	{
		target: "_blank",
		href: "https://discord.gg/HMdveNKPVb",
		icon: fa5_brands_discord,
		label: "Discord",
	},
	{
		target: "_blank",
		href: "https://twitter.com/cymaera",
		icon: fa5_brands_twitter,
		label: "Twitter",
	},
	{
		target: "_blank",
		href: "https://bsky.app/profile/cymaera.bsky.social",
		icon: fa6_brands_bluesky,
		label: "Bluesky",
	},
	{
		target: "_blank",
		href: "https://www.instagram.com/cymaera.ig/",
		icon: fa5_brands_instagram,
		label: "Instagram",
	},
	{
		target: "_blank",
		href: "https://www.tiktok.com/@cymaera",
		icon: fa5_brands_tiktok,
		label: "TikTok",
	},
	{
		target: "_blank",
		href: "https://github.com/TheCymaera",
		icon: fa5_brands_github,
		label: "GitHub",
	},
	{
		target: "_blank",
		href: "https://www.reddit.com/user/Cymaera/",
		icon: fa5_brands_redditAlien,
		label: "Reddit",
	},
	{
		target: "_top",
		href: "mailto:cymaera@heledron.com",
		icon: fa5_solid_envelope,
		label: "Email",
	}
]

function youtubeThumbnail(href: string) {
	const video = href.split("/").pop();
	return `https://img.youtube.com/vi/${video}/maxresdefault.jpg`;
}

const youtubeVideos = [
	{
		title: "Working Globe Hologram in Minecraft",
		href: "https://youtu.be/ae_Gns9ZBqY",
	},
	{
		title: "Arbitrary Colors in Minecraft",
		href: "https://youtu.be/uZmEYYs0ZKs",
	},
	{
		title: "Procedurally Animated Robots in Minecraft",
		href: "https://youtu.be/PSnPOYeTW-0",
	},
	{
		title: "Orbital Lasers in Minecraft (Sky Torch)",
		href: "https://youtu.be/OKXTGbp6AMk",
	},
	{
		title: "Procedural Running / Galloping in Minecraft",
		href: "https://youtu.be/r70xJytj0sw",
	},
	{
		title: "Procedural Walking Animation in Minecraft",
		href: "https://youtu.be/Hc9x1e85L0w",
	},
	{
		title: "3D Renderer in Minecraft",
		href: "https://youtu.be/dr83cXTESXY",
	},
	{
		title: "11 Better Sorting Algorithms in Minecraft",
		href: "https://youtu.be/Lvd03mSjYZ0"
	},
	{
		title: "Flocking Simulation in Minecraft (Boids)",
		href: "https://youtu.be/RgxZzHCI4Z4",
	},
	{
		title: "Double Pendulum Physics Simulation in Minecraft",
		href: "https://youtu.be/cchJOxrStrs",
	},
	{
		title: "Mastermind / Wordle in Minecraft (Datapack)",
		href: "https://youtu.be/9qgtdOIxbpQ",
	},
	{
		title: "MIDI Player in Minecraft (Sequencer Datapack)",
		href: "https://youtu.be/rYRog-1iQrc",
	},
	{
		title: "Animated 3D Graphs in Minecraft (Datapack)",
		href: "https://youtu.be/sY0uiRyFe6s",
	},
	{
		title: "Minecraft - Sculk Sludge (Fluid Physics Datapack)",
		href: "https://youtu.be/CF7bSmH7HzI",
	},
	{
		title: "Conway's Game of Life in Minecraft",
		href: "https://youtu.be/arYu6-V5m2I",
	}
]

const tabs = [
	{
		hash: "#tools",
		label: "Tools",
	},
	{
		hash: "#youtube-videos",
		label: "YouTube",
	},
];

let urlHash = $state(globalThis.location?.hash);
const hash = $derived(tabs.find(tab => tab.hash === urlHash) ? urlHash : tabs[0]!.hash);
globalThis.addEventListener?.("hashchange", () => urlHash = location.hash);
</script>
<style>
#app {
	display: grid;
	gap: 1em;
	grid-template: 
		"header header" min-content
		"main sidebar" 1fr / 1fr 210px;

	margin: auto;
	width: min(100%, 850px);
}

@media (max-width: 700px) {
	#app {
		grid-template: 
			"header" min-content
			"main" min-content
			"sidebar" min-content;
	}
}
</style>
<div id="app" class="p-4">
	<h1 class="text-center m-0 text-[300%] font-bold" style="grid-area: header;">
		Heledron
	</h1>

	<div class="flex flex-col gap-4" style="grid-area: main;">
		<main class="Card p-4">
			<h2 class="text-xl font-bold">Welcome!</h2>
			<p>
				This is my personal website. I post my projects here, including free tools, packages, and more.
			</p>
		</main>

		<div class="Card p-4 py-3">
			Current Project: <code><a href="https://youtu.be/uZmEYYs0ZKs" target="_blank" class="text-primary-600">https://youtu.be/uZmEYYs0ZKs</a></code>
		</div>

		<div class="flex justify-center gap-4">
			<div class="grid grid-cols-[repeat(2,1fr)] bg-surfaceContainer text-onSurfaceContainer rounded-full">
				{#each tabs as tab}
					{@const isActive = tab.hash === hash}
					{@const activeClasses = "cursor-default bg-primary-600! text-onPrimary"}
					<a 
						href={tab.hash} 
						class="
							text-center
							opacity-80 
							px-7 py-1 rounded-full
							transition-colors
							hover:bg-onSurfaceContainer/5
							active:bg-onSurfaceContainer/5
							{isActive ? activeClasses : ""}
						"
					>
						{tab.label}
					</a>
				{/each}
			</div>
		</div>

		<nav class="WrappingGrid gap-4" style="--min-column-width: 250px;" hidden={tabs[0]!.hash !== hash}>
			{#each tools as tool}
				<a class="Card" href={tool.href} target="_blank">
					<img src={tool.imageSrc} width="1200" height="630" loading="lazy" alt="thumbnail">
					<div class="p-3 py-2 leading-5">
						<h2 class="font-bold">{tool.title}</h2>
						<small>{tool.details}</small>
					</div>
				</a>
			{/each}
		</nav>

		<nav class="WrappingGrid gap-4" style="--min-column-width: 250px;" hidden={tabs[1]!.hash !== hash}>
			{#each youtubeVideos as video}
				<a class="Card" href={video.href} target="_blank">
					<img src={youtubeThumbnail(video.href)} width="1280" height="720" loading="lazy" alt="thumbnail">
					<div class="p-3 py-2 leading-5">
						<h2 class="font-bold">{video.title}</h2>
						<!--<small>{video.details}</small>-->
					</div>
				</a>
			{/each}
		</nav>
	</div>

	<aside style="grid-area: sidebar">
		<nav class="WrappingGrid gap-4 items-start" id="links" style="--min-column-width: 90px;">
			{#each socials as social}
				<a class="Card flex flex-col justify-center items-center gap-2 aspect-square" target={social.target} href={social.href}>
					<i class="grid place-items-center height-4 width-4 text-3xl">{@html social.icon}</i>
					<span class="text-sm">{social.label}</span>
				</a>
			{/each}
		</nav>
	</aside>
</div>