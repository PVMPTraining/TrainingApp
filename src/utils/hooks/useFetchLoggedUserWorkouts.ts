"use client";

import { useState, useEffect } from "react";

import { GetUserID, GetUserLoggedWorkouts } from "src/utils/helpers/supabase";
import { Log, LogLevel } from "src/utils/helpers/debugLog";

/**
 * Custom hook to fetch user workouts.
 * @returns An object containing isLoading flag and userWorkouts array.
 */
const useFetchLoggedUserWorkouts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loggedUserWorkouts, setUserWorkouts] = useState<any>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const user_workouts = await GetUserLoggedWorkouts((await GetUserID()) as string);
			Log(LogLevel.DEBUG, `useFetchLoggedUserWorkouts:`, user_workouts);
			if (loggedUserWorkouts) {
				setUserWorkouts(user_workouts);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, loggedUserWorkouts };
};

export default useFetchLoggedUserWorkouts;
