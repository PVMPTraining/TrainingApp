'use client';

import { useState, useEffect } from 'react';

import { GetUserID, GetUserWorkouts } from '../helpers/supabase';
import { Log, LogLevel } from '../helpers/debugLog';

const useFetchUserWorkouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userWorkouts, setUserWorkouts] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user_workouts = await GetUserWorkouts(
          (await GetUserID()) as string,
        );

        setUserWorkouts(user_workouts);
        setIsLoading(false);
      } catch (error: any) {
        Log(LogLevel.ERROR, error.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { isLoading, userWorkouts };
};

export default useFetchUserWorkouts;
