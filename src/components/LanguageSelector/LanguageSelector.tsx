import React, { FC, HTMLAttributes } from "react";
import { setLocal } from "@/src/utils/localisation/localisation";
import { GB, CH, CN, IT, TR } from "country-flag-icons/react/3x2";
import { Button } from "../UI/Button/Button";

interface LanguageSelectorProps extends HTMLAttributes<HTMLElement> {}

export const LanguageSelector: FC<LanguageSelectorProps> = () => {
	const languages = [
		{ flag: GB, title: "Great Britain", name: "English" },
		{ flag: CH, title: "Switzerland", name: "German" },
		{ flag: CN, title: "China", name: "Chinese" },
		{ flag: IT, title: "Italy", name: "Italian" },
		{ flag: TR, title: "Turkey", name: "Türkçe" }
	];

	return (
		<div className="grid grid-cols-2">
			{languages.map(({ flag: Flag, title, name }) => (
				<Button key={title} className="justify-start m-1">
					<div className="flex gap-2 items-center">
						<Flag title={title} className="h-4" />
						{name}
					</div>
				</Button>
			))}
		</div>
	);
};
