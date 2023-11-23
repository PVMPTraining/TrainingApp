'use client';
import Button from '@/src/components/re-usable/Button/Button';
import { Json } from '@/src/types/types';
import { AddFavoriteExercise, GetUserID } from '@/src/utils/helpers/supabase';
import useFetchUserFavoriteExercises from '@/src/utils/hooks/useFetchUserFavoriteExercises';
import { FC, useState } from 'react';

const FavoritesPage: FC = ({}) => {
  const { userFavoriteExercises } = useFetchUserFavoriteExercises();

  const dummyExercise: Json = {
    Name: 'Incline press',
    Description: 'This is a test bench press exercise',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col">
        Bench press
        <Button
          onClick={async () => {
            AddFavoriteExercise((await GetUserID()) as string, dummyExercise);
          }}
        >
          Add Exercise
        </Button>
      </div>
      {userFavoriteExercises}
    </div>
  );
};

export default FavoritesPage;
