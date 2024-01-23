// deno run --allow-read --allow-write createSymlinks.js

import { symlinks, inputFolder, outputFolder } from "./symlinks_config.js";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

// Deno create symlink
const maxLength = Math.max(...Object.keys(symlinks).map(s => s.length));

for (const [outputPath, inputPath] of Object.entries(symlinks)) {
	try {
		const inputRepository = Deno.realPathSync(inputFolder + inputPath + "/../");


		// cd into repository, show an error if repository is not on the latest version using "git status"
		Deno.chdir(inputRepository);
		const gitStatus = await exec("git status", { output: OutputMode.Capture });

		const isUpToDate = gitStatus.output.includes("Your branch is up to date with 'origin/master'");
		const hasUnStagedChanges = gitStatus.output.includes("Changes not staged for commit");

		console.log(inputPath.padEnd(maxLength) + ": " + (isUpToDate ? "up to date" : "not up to date") +  " | " + (hasUnStagedChanges ? "has unstaged changes" : ""));
	}
	catch (error) {
		console.error(error + "\n" + inputFolder + inputPath + "\n -> " + outputFolder + outputPath);
		continue;
	}
}