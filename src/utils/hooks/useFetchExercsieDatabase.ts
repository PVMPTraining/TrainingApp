"use client";

import { useState, useEffect } from "react";

import { GetExercises, GetUserID, GetUserWorkouts } from "../helpers/supabase";
import { Log, LogLevel } from "../helpers/debugLog";

/**
 * Custom hook to fetch user workouts.
 * @returns An object containing isLoading flag and userWorkouts array.
 */
export const useFetchUserExercsiseDatabase = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [exercises, setExercises] = useState<any>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const exercises = await GetExercises();
			Log(LogLevel.DEBUG, `useFetchUserExercsiseDatabase:`, exercises);
			if (exercises) {
				setExercises(exercises);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, exercises };
};
