"use client";

import UserWorkoutsList from "@/src/components/user-workouts/user-workout-list/UserWorkoutsList";
import UserWorkouts from "@/src/components/user-workouts/UserWorkouts";
import exp from "constants";
import { FC } from "react";

const UserWorkoutsPage: FC = () => {
	return (
		<div className="flex flex-col flex-wrap">
			<UserWorkoutsList></UserWorkoutsList>
			<UserWorkouts></UserWorkouts>
		</div>
	);
};

export default UserWorkoutsPage;
