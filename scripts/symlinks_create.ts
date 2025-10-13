#!/usr/bin/env bun
import { symlinks, inputFolder, outputFolder } from "./utilities/symlinks_config.js";
import fs from 'fs';

for (const [outputPath, inputPath] of Object.entries(symlinks)) {
	try {
		const inputFile = fs.realpathSync(inputFolder + inputPath);
		const outputFile = outputFolder + outputPath;

		const parentFolder = outputFile.substring(0, outputFile.lastIndexOf("/"));
		fs.mkdirSync(parentFolder, { recursive: true });

		fs.symlinkSync(inputFile, outputFile);
	}
	catch (error) {
		console.error(error + "\n" + inputFolder + inputPath + "\n -> " + outputFolder + outputPath);
		continue;
	}
}
