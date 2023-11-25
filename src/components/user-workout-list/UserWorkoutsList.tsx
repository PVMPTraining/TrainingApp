import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import useFetchUserWorkouts from "@/src/utils/hooks/useFetchUserWorkouts";
import { Button } from "../re-usable/Button/Button";
import { AddUserWorkout, GetUserID } from "@/src/utils/helpers/supabase";
import { Json, Workout } from "@/src/types/types";
import { CreateWorkout } from "../create-workout/CreateWorkout";
import { Card } from "../re-usable/Card/Card";

/**
 * Props for the UserWorkouts component.
 */
interface UserWorkoutsListProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * Renders the UserWorkouts component.
 * @component
 */
const UserWorkoutsList: FC<UserWorkoutsListProps> = ({}) => {
	const { isLoading, userWorkouts } = useFetchUserWorkouts();

	useEffect(() => {
		console.log("User Workouts:", userWorkouts);
	}, [userWorkouts]);

	return (
		<div className="flex flex-col m-4">
			{userWorkouts.map((workout: Workout) => {
				return <Card>Test</Card>;
			})}
		</div>
	);
};

export default UserWorkoutsList;
