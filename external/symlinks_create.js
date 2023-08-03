// deno run --allow-read --allow-write createSymlinks.js

import { symlinks, inputFolder, outputFolder } from "./symlinks_config.js";

// Deno create symlink
for (const [outputPath, inputPath] of Object.entries(symlinks)) {
	try {
		const inputFile = Deno.realPathSync(inputFolder + inputPath);
		const outputFile = outputFolder + outputPath;

		const parentFolder = outputFile.substring(0, outputFile.lastIndexOf("/"));
		Deno.mkdirSync(parentFolder, { recursive: true });


		// copySync(inputFile, outputFile);
		Deno.symlinkSync(inputFile, outputFile);
	}
	catch (error) {
		console.error(error + "\n" + inputFolder + inputPath + "\n -> " + outputFolder + outputPath);
		continue;
	}
}