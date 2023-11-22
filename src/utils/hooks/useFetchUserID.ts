'use client';

import { useState, useEffect } from 'react';

import { GetUserID } from '../helpers/supabase';

const useFetchUserID = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [userID, setUserID] = useState<any>([]);

	useEffect(() => {
		const fetchPosts = async () => {
		const user_id = await GetUserID();
		setUserID(user_id);
		setIsLoading(false);
		};

		fetchPosts();
	}, []);

	return { isLoading, userID };
};

export default useFetchUserID;
