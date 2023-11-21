'use client';

import CalorieCalculator from '@/src/components/calorie-calculator/CalorieCalculator';
import useFetchUserID from '@/src/utils/hooks/useFetchUserID';
import BodyFatCalculator from '@/src/components/body-fat/BodyFatCalculator';
import FoodScanner from '@/src/components/food-scanner/FoodScanner';

export default function Account() {
<<<<<<< Updated upstream
	const { isLoading, userID } = useFetchUserID();

	return (
		<>
			<div>
				Account
				<div>{userID}</div>
				<CalorieCalculator />
				<FoodScanner />
			</div>
		</>
	)
}
=======
  const { isLoading, userID } = useFetchPosts();

  console.log(isLoading);

  return (
    <>
      <div>
        Account
        <div>{userID}</div>
        <CalorieCalculator />
        <FoodScanner />
      </div>
    </>
  );
}
>>>>>>> Stashed changes
