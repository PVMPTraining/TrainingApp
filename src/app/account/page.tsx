'use client';

import CalorieCalculator from '@/src/components/calorie-calculator/CalorieCalculator';
import useFetchUserID from '@/src/utils/hooks/useFetchUserID';
import BodyFatCalculator from '@/src/components/body-fat/BodyFatCalculator';
import FoodScanner from '@/src/components/food-scanner/FoodScanner';

import { SignOut } from '../../utils/helpers/supabase';
import Button from '@/src/components/re-usable/Button/Button';

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
				<Button onClick={() => SignOut()}>Sign out</Button>
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
