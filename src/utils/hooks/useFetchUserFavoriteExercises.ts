"use client";

import { useState, useEffect } from "react";

import { GetUserID, GetUserFavoriteExercises } from "../helpers/supabase";
import { Log, LogLevel } from "../helpers/debugLog";

/**
 * Custom hook to fetch user's favorite exercises.
 * @returns An object containing isLoading flag and userFavoriteExercises array.
 */
const useFetchUserFavoriteExercises = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [userFavoriteExercises, setUserFavoriteExercises] = useState<any>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const user_favorite_exercises = await GetUserFavoriteExercises((await GetUserID()) as string);
			Log(LogLevel.DEBUG, `useFetchUserFavoriteExercises: ${user_favorite_exercises}`);
			if (userFavoriteExercises) {
				setUserFavoriteExercises(user_favorite_exercises);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, userFavoriteExercises };
};

export default useFetchUserFavoriteExercises;
