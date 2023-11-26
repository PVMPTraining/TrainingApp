"use client";

import UserWorkouts from "@/src/components/user-workouts/UserWorkouts";
import { FC } from "react";

const UserWorkoutsPage: FC = () => {
	return (
		<div className="flex flex-col flex-wrap">
			<UserWorkouts></UserWorkouts>
		</div>
	);
};

export default UserWorkoutsPage;
