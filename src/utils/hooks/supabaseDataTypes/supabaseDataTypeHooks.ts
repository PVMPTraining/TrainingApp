import { useState, useEffect } from "react";
import { getColumnFromTable, GetLocales } from "src/utils/helpers/supabase";
import { getLocal } from "@/src/utils/localisation/localisation";

type LocalizeData = (table: string, column: string, locale: string) => Promise<any[]>;

// Fetches column data from a table and localizes it
const useFetchAndLocalize: LocalizeData = async (table, column, locale) => {
	try {
		const data = await getColumnFromTable(table, column);
		const localizedStrings = await GetLocales("recipes", locale);
		return data ? localizeArray(Array.from(new Set(data.flat())), localizedStrings, locale) : [];
	} catch (error) {
		console.error("Error fetching and localizing data:", error);
		return [];
	}
};

// Localizes an array of keys using the provided localization map
const localizeArray = (keysArray: string[], localizedStrings: any[], locale: string) => {
	const localizationMap = new Map(localizedStrings.map((item) => [item.key, item[locale]]));
	return keysArray.map((key) => localizationMap.get(key) || key);
};

// A custom hook to fetch and localize data from Supabase for different types
export const useFetchSupabaseDataTypes = (table: string, column: string) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<any[]>([]);
	const local = getLocal();

	useEffect(() => {
		const FetchData = async () => {
			const localizedData = await useFetchAndLocalize(table, column, local);
			setData(localizedData);
			setIsLoading(false);
		};

		FetchData();
	}, [table, column, local]);

	return { isLoading, data };
};

// Custom hooks for fetching recipe filter data types
export const useFetchDietTypes = () => useFetchSupabaseDataTypes("diet_types", "diet_type");
export const useFetchHighContents = () => useFetchSupabaseDataTypes("high_contents", "high_content");
export const useFetchLowContents = () => useFetchSupabaseDataTypes("low_contents", "low_content");
export const useFetchFreeFroms = () => useFetchSupabaseDataTypes("free_froms", "free_from");
export const useFetchFitnessGoals = () => useFetchSupabaseDataTypes("fitness_goals", "fitness_goal");
export const useFetchCuisineTypes = () => useFetchSupabaseDataTypes("cuisine_types", "cuisine_type");
export const useFetchMealTypes = () => useFetchSupabaseDataTypes("meal_types", "meal_type");
export const useFetchSpecialFeatures = () => useFetchSupabaseDataTypes("special_features", "special_feature");
export const useFetchSkillLevels = () => useFetchSupabaseDataTypes("skill_levels", "skill_level");
export const useFetchEquipments = () => useFetchSupabaseDataTypes("equipments", "equipment");

// Custom hooks for fetching exercise filter data types
export const useFetchExerciseTypes = () => useFetchSupabaseDataTypes("exercise_types", "exercise_type");
export const useFetchMandatoryEquipments = () => useFetchSupabaseDataTypes("mandatory_equipments", "mandatory_equipment");
