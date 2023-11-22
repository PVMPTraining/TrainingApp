'use client';

import { useState, useEffect } from 'react';

import { GetUserID, GetUserWorkouts } from '../helpers/supabase';

const useFetchUserWorkouts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [userWorkouts, setUserWorkouts] = useState<any>([]);

	useEffect(() => {
		const fetchPosts = async () => {
		const user_workouts = await GetUserWorkouts(await GetUserID() as string);
		setUserWorkouts(user_workouts);
		setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, userWorkouts };
};

export default useFetchUserWorkouts;
