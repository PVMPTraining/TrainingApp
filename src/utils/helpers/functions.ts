export const arraysAreEqual = (arr1: any[], arr2: any[]): boolean => {
	return arr1.length === arr2.length && arr1.every((element, index) => element === arr2[index]);
};
