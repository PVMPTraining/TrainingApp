export const arraysAreEqual = (arr1: any[], arr2: any[]): boolean => {
	return arr1.length === arr2.length && arr1.every((element, index) => element === arr2[index]);
};

export const enumStringArray = (e: { [key: string]: any }): string[] => {
	return Object.keys(e)
		.filter((key) => isNaN(Number(e[key])))
		.map((key) => e[key]);
};

export const formatStringToLowerCaseSpacesToUnderscores = (str: string): string => {
	return str.toLowerCase().replace(/\s/g, "_");
};

export const concatClassName = (...args: (string | undefined | null)[]): string => {
	return args.filter((arg) => arg).join(" ");
};
