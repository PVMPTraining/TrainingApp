"use client";
import { FC } from "react";

// Next
import Link from "next/link";
import { loginPagePath, signupPagePath } from "@/src/pathmap/pathmap";
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import config from "@/tailwind.config";

const AuthPage: FC = () => {
	const strings = useLocalizedStrings();
	if (Capacitor.isPluginAvailable("StatusBar")) {
		StatusBar.setBackgroundColor({ color: config.daisyui.themes[0].dark["base-100"] });
	}

	return (
		<>
			<div className="min-h-screen flex flex-col justify-end gap-4 p-8">
				<h1 className="text-4xl font-bold">{strings.authPage.title}</h1>
				<p>{strings.authPage.subtitle}</p>
				<div className="flex gap-4 flex-col">
					<Link className="btn" href={loginPagePath}>
						{strings.authPage.login}
					</Link>
					<Link className="btn" href={signupPagePath}>
						{strings.authPage.signup}
					</Link>
				</div>
			</div>
		</>
	);
};

export default AuthPage;
