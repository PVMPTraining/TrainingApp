"use client";

import { useState, useEffect } from "react";

import { GetExercises, GetUserID, GetUserWorkouts } from "src/utils/helpers/supabase";
import { Log, LogLevel } from "src/utils/helpers/debugLog";
import { ExerciseData } from "@/src/types/supabase/exerciseData";

/**
 * Custom hook to fetch user workouts.
 * @returns An object containing isLoading flag and userWorkouts array.
 */
export const useFetchExercsiseDatabase = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [exercises, setExercises] = useState<ExerciseData[]>([]);

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
