"use client";

import { useState, useEffect } from "react";

import { GetLocales, GetRecipes } from "src/utils/helpers/supabase";
import { Log, LogLevel } from "src/utils/helpers/debugLog";
import { RecipeData } from "@/src/types/supabase/recipesData";
import { getLocal } from "@/src/utils/localisation/localisation";

export const localizeObject = (keyStrings: any, localizedStrings: any[], local: string): RecipeData => {
	return Object.keys(keyStrings).reduce((localizedRecipe: any, key: any) => {
		const value: any = keyStrings[key];

		if (Array.isArray(value)) {
			localizedRecipe[key] = value.map((innerKey) => {
				const localizedEntry = localizedStrings.find((localizedString) => localizedString.key === innerKey);
				return localizedEntry ? localizedEntry[local] : innerKey;
			});
		} else {
			const localizedEntry = localizedStrings.find((localizedString) => localizedString.key === value);
			localizedRecipe[key] = localizedEntry ? localizedEntry[local] : value;
		}

		return localizedRecipe;
	}, {});
};

export const useFetchRecipes = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [recipes, setRecipes] = useState<RecipeData[]>([]);
	const local = getLocal();

	useEffect(() => {
		const fetchPosts = async () => {
			const recipes = await GetRecipes();
			const localizedStrings = await GetLocales("recipes", local);
			if (recipes && localizedStrings) {
				const localizedRecipes: RecipeData[] = recipes.map((recipe: RecipeData) => {
					const localizedRecipe: RecipeData = localizeObject(recipe, localizedStrings, local);
					return localizedRecipe;
				});
				console.log(localizedRecipes);
				Log(LogLevel.DEBUG, `useFetchRecipes:`, recipes);
				setRecipes(localizedRecipes);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, recipes };
};
