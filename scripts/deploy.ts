#!/usr/bin/env bun
import { execWithOutput, getUserInput, validateAllRepositories } from "./utilities/utilities.js";

console.log("Current working directory:", process.cwd());
console.log("\nValidating repositories...\n");

const allValid = await validateAllRepositories(false);

if (!allValid) {
	console.log("\n❌ Some repositories have issues!");
	console.log("Run 'pnpm run validate-w-fetch' to see details.");
	console.log("Deployment aborted.\n");
	process.exit(1);
}

console.log("\n✅ All repositories are valid!\n");

const confirmationCode = "heledron";
const answer = await getUserInput(`Enter "${confirmationCode}" to deploy: `);

if (answer !== confirmationCode) {
	console.log("Canceled");
	process.exit(0);
}


try {
	console.log("Building...\n");
	await execWithOutput("npm run build");

	console.log("\n\n");

	console.log("Deploying...\n");
	await execWithOutput("wrangler pages deploy --branch=production");
} catch (error) {
	console.error("\n❌ Deployment failed:", error);
	process.exit(1);
}

console.log("\n✅ Deployment successful!");