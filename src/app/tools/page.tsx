'use client';
import { FC, useState } from 'react';
import BodyFatCalculator from '@/src/components/body-fat/BodyFatCalculator';
import CalorieCalculator from '@/src/components/calorie-calculator/CalorieCalculator';

const CalculatorsPage: FC = ({}) => {
  const [selectedCalculator, setSelectedCalculator] = useState<null | string>(
    null,
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-10 pb-10">
        <button
          className="btn"
          onClick={() => setSelectedCalculator('bodyFat')}
        >
          Body fat percentage calculator
        </button>
        <button
          className="btn"
          onClick={() => setSelectedCalculator('calorie')}
        >
          Calorie calculator
        </button>
      </div>
      {selectedCalculator === 'calorie' ? (
        <CalorieCalculator />
      ) : (
        <BodyFatCalculator />
      )}
    </div>
  );
};

export default CalculatorsPage;