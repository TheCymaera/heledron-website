#!/usr/bin/env bun
import { validateAllRepositories } from "./utilities/utilities.js";

const doFetch = process.argv.includes("--fetch");

const allValid = await validateAllRepositories(doFetch);
if (allValid) {
	console.log("\n✅ All repositories are valid!\n");
	process.exit(0);
} else {
	console.log("\n❌ Some repositories have issues!\n");
	process.exit(1);
}