import React, { FC, HTMLAttributes } from "react";
import { setLocal, getLocal, useLocalizedStrings } from "@/src/utils/localisation/localisation";
import { GB, CH, CN, IT, TR, FR } from "country-flag-icons/react/3x2";
import { Button } from "../UI/Button/Button";
import { FaCheck } from "react-icons/fa";

interface LanguageSelectorProps extends HTMLAttributes<HTMLElement> {}

export const LanguageSelector: FC<LanguageSelectorProps> = () => {
	const strings = useLocalizedStrings();

	const languages = [
		{ flag: GB, title: "Great Britain", name: strings.languageSelector.english, local: "en" },
		{ flag: FR, title: "France", name: strings.languageSelector.french, local: "fr" },
		// { flag: CH, title: "Switzerland", name: "German", local: "de" },
		// { flag: CN, title: "China", name: "Chinese", local: "zh" },
		{ flag: IT, title: "Italy", name: strings.languageSelector.italian, local: "it" }
		// { flag: TR, title: "Turkey", name: "Türkçe", local: "tr" }
	];

	return (
		<div className="grid grid-cols-2">
			{languages.map(({ flag: Flag, title, name, local }) => (
				<Button
					onClick={() => {
						setLocal(local);
					}}
					key={title}
					className={["justify-start m-1", getLocal() === local ? "border border-accent" : ""].join(" ")}
				>
					<div className="flex gap-2 items-center">
						<Flag title={title} className="h-4 rounded" />
						{name}
					</div>
					{getLocal() === local && (
						<span className="ml-auto">
							<FaCheck />
						</span>
					)}
				</Button>
			))}
		</div>
	);
};
