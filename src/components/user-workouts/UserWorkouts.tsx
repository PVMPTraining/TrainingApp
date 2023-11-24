import { FC, useState } from "react";
import useFetchUserWorkouts from "@/src/utils/hooks/useFetchUserWorkouts";
import { Button } from "../re-usable/Button/Button";
import { AddUserWorkout, GetUserID } from "@/src/utils/helpers/supabase";
import { Json } from "@/src/types/types";
import { CreateWorkout } from "../create-workout/CreateWorkout";

/**
 * Props for the UserWorkouts component.
 */
interface UserWorkoutsProps {}

/**
 * Renders the UserWorkouts component.
 * @component
 */
const UserWorkouts: FC<UserWorkoutsProps> = ({}) => {
	const { isLoading, userWorkouts } = useFetchUserWorkouts();

	const dummyWorkout: Json = {
		Name: "Test Workout",
		Description: "This is a test workout"
	};

	return (
		<div className="flex flex-col">
			{/* {userWorkouts && <div>{userWorkouts}</div>} */}
			<CreateWorkout></CreateWorkout>
			{/* <Button
				onClick={async () => {
					AddUserWorkout((await GetUserID()) as string, dummyWorkout);
				}}
			>
				Add Workout
			</Button> */}
		</div>
	);
};

export default UserWorkouts;
