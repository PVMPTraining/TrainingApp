'use client';

import CalorieCalculator from '@/src/components/calorie-calculator/CalorieCalculator';
import useFetchPosts from '@/src/utils/hooks/useFetchPosts';

export default function Account() {
  const { isLoading, userID } = useFetchPosts();

  console.log(isLoading);

  return (
    <>
      <div>
        Account
        <div>{isLoading}</div>
        <div>{userID}</div>
        <CalorieCalculator />
      </div>
    </>
  );
}
