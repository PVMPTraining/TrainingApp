"use client";

import { useState, useEffect } from "react";

import { GetExercises, GetExercisesCount, GetExercisesForPage, GetUserID, GetUserWorkouts } from "src/utils/helpers/supabase";
import { Log, LogLevel } from "src/utils/helpers/debugLog";
import { ExerciseData } from "@/src/types/supabase/exerciseData";

/**
 * Custom hook to fetch user workouts.
 * @returns An object containing isLoading flag and userWorkouts array.
 */
export const useFetchExerciseCount = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [exerciseCount, setExercises] = useState<number>(0);

	useEffect(() => {
		const fetchPosts = async () => {
			const exerciseCount = await GetExercisesCount();
			if (exerciseCount) {
				setExercises(exerciseCount);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, exerciseCount };
};
