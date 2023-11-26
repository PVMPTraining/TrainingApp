"use client";

import UserWorkoutsList from "@/src/components/user-workouts/user-workout-list/UserWorkoutsList";
import { FC } from "react";

const UserWorkoutsPage: FC = () => {
	return (
		<div className="flex flex-col flex-wrap">
			<UserWorkoutsList></UserWorkoutsList>
		</div>
	);
};

export default UserWorkoutsPage;
