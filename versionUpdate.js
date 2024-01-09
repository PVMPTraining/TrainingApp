const fs = require("fs");

// Function to read and parse the version.json file
function readVersionFile(filePath) {
	const data = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(data);
}

// Function to increment the build revision
function incrementBuildRevision(version) {
	const parts = version.split(".");
	if (parts.length === 3) {
		const buildRevision = parseInt(parts[2]);
		if (!isNaN(buildRevision)) {
			parts[2] = (buildRevision + 1).toString();
			return parts.join(".");
		}
	}
	throw new Error("Invalid version format.");
}

// Function to save the updated version back to version.json
function saveVersionToFile(filePath, versionInfo) {
	fs.writeFileSync(filePath, JSON.stringify(versionInfo, null, 4));
}

const versionFilePath = "version.json";

try {
	// Read the version.json file
	const versionInfo = readVersionFile(versionFilePath);

	// Increment the build revision
	versionInfo.version = incrementBuildRevision(versionInfo.version);

	// Save the updated version back to version.json
	saveVersionToFile(versionFilePath, versionInfo);

	console.log(`Build revision incremented to ${versionInfo.version}`);
} catch (error) {
	console.error(`Error: ${error.message}`);
}
