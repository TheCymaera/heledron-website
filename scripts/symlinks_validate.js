import { symlinks, inputFolder } from "./symlinks_config.js";
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// get flag from command line
const doFetch = process.argv.includes("--fetch");

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
		const repositoryPath = fs.realpathSync(inputFolder + inputPath.split("/").shift());
		const buildPath = fs.realpathSync(inputFolder + inputPath);

		// fetch updates
		if (fetch) {
			process.chdir(repositoryPath);
			execSync("git fetch");
		}

		process.chdir(repositoryPath);
		const gitStatus = execSync("git status", { encoding: 'utf8' });
		
		process.chdir(repositoryPath);
		const lastCommitOutput = execSync("git log -1 --format=%cd", { encoding: 'utf8' });

		const gitIsUpToDate = 
			gitStatus.includes("Your branch is up to date with 'origin/master'") ||
			gitStatus.includes("Your branch is up to date with 'origin/main'");
		const noUnStagedChanges = !gitStatus.includes("Changes not staged for commit");

		const lastCommit = new Date(lastCommitOutput);

		const stats = fs.statSync(buildPath);
		const lastBuild = stats.mtime;

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
		return null;
	}
}
