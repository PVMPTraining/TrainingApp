// Imports and Redux Store setup
import { useSelector } from "react-redux";
import store, { RootState } from "@/src/utils/redux/store";
import { setLanguage } from "@/src/utils/redux/slices/Language/LanguageSlice";
import { localStrings } from "@/src/utils/localisation/stringKeys";

const localeContext = require.context("@/src/utils/localisation/locals", false, /^\.\/.*\.json$/);

const strings: { [key: string]: localStrings } = localeContext.keys().reduce((locales: { [key: string]: localStrings }, file) => {
	const locale = localeContext(file);
	return { ...locales, ...locale };
}, {});

// Hook to use localized strings
export const useLocalizedStrings = () => {
	const language = useSelector((state: RootState) => state.language.value);
	return strings[language];
};

// Function to set the current locale
export const setLocal = (language: string) => {
	store.dispatch(setLanguage(language));
};

// Function to get the current locale
export const getLocal = () => {
	return store.getState().language.value;
};
