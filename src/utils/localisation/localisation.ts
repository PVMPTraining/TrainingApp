// Imports and Redux Store setup
import { useSelector } from "react-redux";
import store, { RootState } from "@/src/utils/redux/store";
import { setLanguage } from "@/src/utils/redux/slices/Language/LanguageSlice";

// Context for localization files
const localeContext = require.context("@/src/utils/localisation/locals", false, /^\.\/.*\.json$/);

const strings: any = localeContext.keys().reduce((locales: { [key: string]: any }, file) => {
	const locale = localeContext(file);

	if (Object.keys(locales).length > 0) {
		const referenceLocale = locales[Object.keys(locales)[0]];
		const keysInReference = Object.keys(referenceLocale);
		const keysInCurrent = Object.keys(locale[Object.keys(locale)[0]]);
		const missingKeys = keysInReference.filter((key) => !keysInCurrent.includes(key));

		if (missingKeys.length > 0) {
			console.error(`Locale file: ${file} is missing keys: ${missingKeys.join(", ")}`);
		}
	}

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
