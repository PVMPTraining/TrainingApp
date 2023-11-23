import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "training.app",
	appName: "training-app",
	webDir: "build",
	server: {
		androidScheme: "https"
	}
};

export default config;
