"use client";

import { CreateWorkout } from "@/src/components/UserWorkouts/UserWorkoutCreator/CreateWorkout/CreateWorkout";
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
