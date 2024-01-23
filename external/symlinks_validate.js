import { symlinks, inputFolder } from "./symlinks_config.js";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

// get flag from command line
const doFetch = Deno.args.includes("--fetch");

console.log(`Validating repositories... (fetch: ${doFetch})`);

for (const [_, inputPath] of Object.entries(symlinks)) {
	scanRepo(inputPath, doFetch).then(result => {
		if (!result) return;

		const { gitIsUpToDate, noUnStagedChanges, buildIsUpToDate } = result;

		if (gitIsUpToDate && noUnStagedChanges && buildIsUpToDate) {
			console.log(inputPath + ": " + "✅");
			return;
		}

		console.log(inputPath + ": ");
		console.log(" ".repeat(4) + "git: " + (gitIsUpToDate ? "✅" : "❌"));
		console.log(" ".repeat(4) + "unstaged: " + (noUnStagedChanges ? "✅" : "❌"));
		console.log(" ".repeat(4) + "build: " + (buildIsUpToDate ? "✅" : "❌"));
		if (!buildIsUpToDate) {
			console.log(" ".repeat(4 * 2) + "last build: " + result.lastBuild);
			console.log(" ".repeat(4 * 2) + "last commit: " + result.lastCommit);
		}
	});
}

async function scanRepo(inputPath, fetch = false) {
	try {
		const repositoryPath = Deno.realPathSync(inputFolder + inputPath + "/../");
		const buildPath = Deno.realPathSync(inputFolder + inputPath);

		// cd
		Deno.chdir(repositoryPath);

		// fetch updates
		if (fetch) await exec("git fetch");

		const gitStatus = await exec("git status", { output: OutputMode.Capture });

		const gitIsUpToDate = gitStatus.output.includes("Your branch is up to date with 'origin/master'");
		const noUnStagedChanges = !gitStatus.output.includes("Changes not staged for commit");

		const lastCommitOutput = await exec("git log -1 --format=%cd", { output: OutputMode.Capture });
		const lastCommit = new Date(lastCommitOutput.output);
		const lastBuild = Deno.statSync(buildPath).mtime;

		const buildIsUpToDate = lastCommit <= lastBuild;

		return {
			gitIsUpToDate,
			noUnStagedChanges,
			buildIsUpToDate,
			lastBuild,
			lastCommit,
		};
	}
	catch (error) {
		console.error(error);
	}
}