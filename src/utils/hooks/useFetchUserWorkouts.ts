'use client';

import { useState, useEffect } from 'react';

import { GetUserID, GetUserWorkouts } from '../helpers/supabase';
import { Log, LogLevel } from '../helpers/debugLog';

const useFetchUserWorkouts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [userWorkouts, setUserWorkouts] = useState<any>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const user_workouts = await GetUserWorkouts(await GetUserID() as string);
			Log(LogLevel.DEBUG, `useFetchUserWorkouts: ${user_workouts}`);
			if(userWorkouts) {
				setUserWorkouts(user_workouts);
			}
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, userWorkouts };
};

export default useFetchUserWorkouts;