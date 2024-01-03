import { useSelector } from "react-redux";
import store, { RootState } from "@/src/utils/redux/store";
import { setLanguage } from "@/src/utils/redux/slices/Language/LanguageSlice";

import en from "@/src/utils/localisation/locals/en.json";
import fr from "@/src/utils/localisation/locals/fr.json";

export const useLocalizedStrings = () => {
	const language = useSelector((state: RootState) => state.language.value);

	const strings = {
		...en,
		...fr
	};

	return strings[language as keyof typeof strings];
};

export const setLocal = (language: string) => {
	store.dispatch(setLanguage(language));
};
