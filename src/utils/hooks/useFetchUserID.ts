'use client';

import { useState, useEffect } from 'react';

import { GetUserID } from '../helpers/supabase';
import { Log, LogLevel } from '../helpers/debugLog';

const useFetchUserID = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user_id = await GetUserID();
        setUserID(user_id);
        setIsLoading(false);
      } catch (error: any) {
        Log(LogLevel.ERROR, error.message);
      }
    };

    fetchPosts();
  }, []);

  return { isLoading, userID };
};

export default useFetchUserID;
