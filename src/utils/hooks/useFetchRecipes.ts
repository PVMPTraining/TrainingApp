"use client";

import { useState, useEffect } from "react";

import { GetRecipes } from "src/utils/helpers/supabase";
import { Log, LogLevel } from "src/utils/helpers/debugLog";
import { RecipesData } from "@/src/types/supabaseDataTypes";

export const useFetchRecipes = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [recipes, setRecipes] = useState<RecipesData[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const recipes = await GetRecipes();
			Log(LogLevel.DEBUG, `useFetchRecipes:`, recipes);
			if (recipes) {
				setRecipes(recipes);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, recipes };
};
