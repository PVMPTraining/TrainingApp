"use client";

import { Exercise } from "@/src/components/exercise/exercise";
import { CreateWorkout } from "@/src/components/user-workouts/user-workout-creator/create-workout/CreateWorkout";
import { AddUserWorkout } from "@/src/utils/helpers/supabase";
import { FC } from "react";

const UserWorkoutsPage: FC = () => {
	return (
		<div className="flex flex-col flex-wrap m-4">
			<CreateWorkout initialValues={{ name: "", exercises: [] }} supabaseCallback={AddUserWorkout}></CreateWorkout>
		</div>
	);
};

export default UserWorkoutsPage;
