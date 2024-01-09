import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			textShadow: {
				solid: "-1px -1px 0 var(--tw-shadow-color), 1px -1px 0 var(--tw-shadow-color),-1px 1px 0 var(--tw-shadow-color),1px 1px 0 var(--tw-shadow-color);",
				sm: "0 1px 2px var(--tw-shadow-color)",
				DEFAULT: "0 2px 4px var(--tw-shadow-color)",
				lg: "0 8px 16px var(--tw-shadow-color)"
			}
		},
		screens: {
			xs: "360px"
		}
	},
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
	plugins: [
		require("daisyui"),
		require("tailwindcss-animated"),
		plugin(({ matchUtilities, theme }: { matchUtilities: any; theme: any }) => {
			matchUtilities(
				{
					"text-shadow": (value: any) => ({
						textShadow: value
					})
				},
				{ values: theme("textShadow") }
			);
		})
	]
};

export default config;
