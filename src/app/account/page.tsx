'use client';

import BodyFatCalculator from '@/src/components/body-fat/BodyFatCalculator';
import CalorieCalculator from '@/src/components/calorie-calculator/CalorieCalculator';

export default function Account() {
  return (
    <>
      <div>
        Account
        {/* <BodyFatCalculator /> */}
        <CalorieCalculator />
      </div>
    </>
  );
}
