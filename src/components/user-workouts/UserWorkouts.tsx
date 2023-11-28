import { FC, useState } from "react";
import useFetchUserWorkouts from "@/src/utils/hooks/useFetchUserWorkouts";
import { Button } from "../UI/Button/Button";
import { AddUserWorkout, GetUserID } from "@/src/utils/helpers/supabase";
import { Workout } from "@/src/types/types";
import { CreateWorkout } from "../user-workouts/user-workout-creator/create-workout/CreateWorkout";

/**
 * Props for the UserWorkouts component.
 */
interface UserWorkoutsProps {}

/**
 * Renders the UserWorkouts component.
 * @component
 */
const UserWorkouts: FC<UserWorkoutsProps> = ({}) => {
	return (
		<div className="flex flex-col gap-4 m-4">
			<CreateWorkout></CreateWorkout>
		</div>
	);
};

export default UserWorkouts;
