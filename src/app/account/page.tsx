'use client';

import CalorieCalculator from '@/src/components/calorie-calculator/CalorieCalculator';
import useFetchUserID from '@/src/utils/hooks/useFetchUserID';
import BodyFatCalculator from '@/src/components/body-fat/BodyFatCalculator';
import FoodScanner from '@/src/components/food-scanner/FoodScanner';

export default function Account() {
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