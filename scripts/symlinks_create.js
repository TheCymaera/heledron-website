// node symlinks_create_node.js

import { symlinks, inputFolder, outputFolder } from "./symlinks_config.js";
import fs from 'fs';
import path from 'path';

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
