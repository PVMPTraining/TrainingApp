'use client';

import CalorieCalculator from '@/src/components/calorie-calculator/CalorieCalculator';
import useFetchPosts from '@/src/utils/hooks/useFetchPosts';
import BodyFatCalculator from '@/src/components/body-fat/BodyFatCalculator';
import FoodScanner from '@/src/components/food-scanner/FoodScanner';

export default function Account() {
  const { isLoading, userID } = useFetchPosts();

  console.log(isLoading);

		fetchPosts()
	  }, [])

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