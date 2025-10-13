import { symlinks, inputFolder } from "./symlinks_config.js";
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import * as readline from 'readline';

export const execAsync = promisify(exec);

export async function getUserInput(prompt: string): Promise<string> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	return new Promise((resolve) => {
		rl.question(prompt, (answer) => {
			rl.close();
			resolve(answer);
		});
	});
}

// Execute a command with streaming output to the terminal
export async function execWithOutput(command: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const child = spawn(command, {
			shell: true,
			stdio: 'inherit' // This streams output directly to parent process
		});

		child.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`Command failed with exit code ${code}`));
			}
		});

		child.on('error', (error) => {
			reject(error);
		});
	});
}

export async function getRepoInfo(inputPath: string, fetch = false) {
	try {
		const repositoryPath = fs.realpathSync(inputFolder + inputPath.split("/").shift());
		const buildPath = fs.realpathSync(inputFolder + inputPath);

		// fetch updates
		if (fetch) await execAsync("git fetch", { cwd: repositoryPath });

		const { stdout: gitStatus } = await execAsync("git status", { cwd: repositoryPath });
		
		const { stdout: lastCommitOutput } = await execAsync("git log -1 --format=%cd", { cwd: repositoryPath });

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
		return undefined;
	}
}


export async function validateAllRepositories(fetch = false): Promise<boolean> {
	const result = await Promise.all(Object.entries(symlinks).map(async ([_, inputPath]) => {
		const info = await getRepoInfo(inputPath, fetch);
		if (!info) return false;

		const isValid = info.gitIsUpToDate && info.noUnStagedChanges && info.buildIsUpToDate;

		if (isValid) {
			console.log(inputPath + ": " + "✅");
		} else {
			console.log(inputPath + ": ");
			console.log(" ".repeat(4) + "git: " + (info.gitIsUpToDate ? "✅" : "❌"));
			console.log(" ".repeat(4) + "unstaged: " + (info.noUnStagedChanges ? "✅" : "❌"));
			console.log(" ".repeat(4) + "build: " + (info.buildIsUpToDate ? "✅" : "❌"));
			if (!info.buildIsUpToDate) {
				console.log(" ".repeat(4 * 2) + "last build: " + info.lastBuild);
				console.log(" ".repeat(4 * 2) + "last commit: " + info.lastCommit);
			}
		}

		return isValid;
	}));

	return result.every(Boolean);
}