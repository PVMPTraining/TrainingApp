"use client";

import { CreateWorkout } from "@/src/components/user-workouts/user-workout-creator/create-workout/CreateWorkout";
import { UpdateUserWorkout } from "@/src/utils/helpers/supabase";
import { FC } from "react";

const UserWorkoutsPage: FC = () => {
	return (
		<div className="flex flex-col flex-wrap m-4">
			<CreateWorkout supabaseCallback={UpdateUserWorkout}></CreateWorkout>
		</div>
	);
};

export default UserWorkoutsPage;
