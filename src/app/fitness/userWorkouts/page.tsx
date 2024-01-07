"use client";

import UserWorkoutsList from "@/src/components/UserWorkouts/UserWorkoutList/UserWorkoutsList";
import { FC } from "react";

const UserWorkoutsPage: FC = () => {
	return (
		<div className="flex flex-col flex-wrap">
			<UserWorkoutsList />
		</div>
	);
};

export default UserWorkoutsPage;
