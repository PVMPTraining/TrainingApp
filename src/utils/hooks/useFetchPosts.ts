'use client';

import { useState, useEffect } from 'react';

import { GetUser, GetUserID } from '../../utils/helpers/supabase';

const useFetchPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const user = await GetUser();
      const user_id = await GetUserID(user?.id as string);
      setUserID(user_id);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return { isLoading, userID };
};

export default useFetchPosts;
