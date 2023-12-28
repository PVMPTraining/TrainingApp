"use client";

import { useState, useEffect } from "react";

import { GetRecipes } from "src/utils/helpers/supabase";
import { Log, LogLevel } from "src/utils/helpers/debugLog";
import { RecipesData } from "@/src/types/types";

export const useFetchUserExercsiseDatabase = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [recipes, setRecpies] = useState<RecipesData[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const recipes = await GetRecipes();
			Log(LogLevel.DEBUG, `useFetchUserExercsiseDatabase:`, recipes);
			if (recipes) {
				setRecpies(recipes);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, recipes };
};
