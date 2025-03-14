import { symlinks, inputFolder } from "./symlinks_config.js";

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
		const repositoryPath = Deno.realPathSync(inputFolder + inputPath.split("/").shift());
		const buildPath = Deno.realPathSync(inputFolder + inputPath);

		// fetch updates
		if (fetch) {
			Deno.chdir(repositoryPath);
			await new Deno.Command("git", { args: ["fetch"] }).output();
		}

		Deno.chdir(repositoryPath);
		const gitStatus = await new Deno.Command("git", { args: ["status"], stdout: "piped" }).output();
		
		Deno.chdir(repositoryPath);
		const lastCommitOutput = await new Deno.Command("git", { args: ["log", "-1", "--format=%cd"], stdout: "piped" }).output();

		const gitStatusDecoded = new TextDecoder("utf-8").decode(gitStatus.stdout);
		const gitIsUpToDate = gitStatusDecoded.includes("Your branch is up to date with 'origin/master'");
		const noUnStagedChanges = !gitStatusDecoded.includes("Changes not staged for commit");

		const lastCommitOutputDecoded = new TextDecoder("utf-8").decode(lastCommitOutput.stdout);
		const lastCommit = new Date(lastCommitOutputDecoded);

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