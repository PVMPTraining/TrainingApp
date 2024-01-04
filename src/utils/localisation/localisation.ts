import { useSelector } from "react-redux";
import store, { RootState } from "@/src/utils/redux/store";
import { setLanguage } from "@/src/utils/redux/slices/Language/LanguageSlice";

import en from "@/src/utils/localisation/locals/en.json";
import fr from "@/src/utils/localisation/locals/fr.json";
import it from "@/src/utils/localisation/locals/it.json";

export const useLocalizedStrings = () => {
	const language = useSelector((state: RootState) => state.language.value);

	const strings: any = {
		...en,
		...fr,
		...it
	};

	return strings[language];
};

export const setLocal = (language: string) => {
	store.dispatch(setLanguage(language));
};

export const getLocal = () => {
	return store.getState().language.value;
};
