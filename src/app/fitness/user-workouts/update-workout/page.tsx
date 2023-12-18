"use client";

import { CreateWorkout } from "@/src/components/user-workouts/user-workout-creator/create-workout/CreateWorkout";
import { Workout } from "@/src/types/fitnessTypes";
import { UpdateUserWorkout } from "@/src/utils/helpers/supabase";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

const UserWorkoutsPage: FC = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get("workout");

	return (
		<div className="flex flex-col flex-wrap m-4">
			<CreateWorkout initialValues={JSON.parse(search as string)} supabaseCallback={UpdateUserWorkout}></CreateWorkout>
		</div>
	);
};

export default UserWorkoutsPage;
