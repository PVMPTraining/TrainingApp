'use client';

import { useState, useEffect } from 'react';

import { GetUserID, GetUserWorkouts } from '../helpers/supabase';
import { Log, LogLevel } from '../helpers/debugLog';

/**
 * Custom hook to fetch user workouts.
 * @returns An object containing isLoading flag and userWorkouts array.
 */
const useFetchUserWorkouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userWorkouts, setUserWorkouts] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const user_workouts = await GetUserWorkouts(
        (await GetUserID()) as string,
      );
      Log(LogLevel.DEBUG, `useFetchUserWorkouts: ${user_workouts}`);
      if (userWorkouts) {
        setUserWorkouts(user_workouts);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return { isLoading, userWorkouts };
};

export default useFetchUserWorkouts;
