import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {},
	daisyui: {
		themes: [
			// "dark"
			{
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					// "base-100": "black",
					// "base-200": colors.zinc[950],
					// "base-300": colors.zinc[900],
					"base-100": "#121212",
					"base-200": "#0b0b0b",
					"base-300": "#0f0f0f",
					color: "#ffffff",
					accent: "#54E210"
				}
			}
		]
	},
	plugins: [require("daisyui"), require("tailwindcss-animated")]
};

export default config;
