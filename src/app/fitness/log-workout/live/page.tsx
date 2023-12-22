"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { LiveWorkout } from "@/src/components/user-workouts/live-workout/LiveWorkout";

/**
 * Represents the page component for user workouts.
 */
const UserWorkoutsPage: FC = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get("workout");

	return <LiveWorkout workoutProp={JSON.parse(search as string)} />;
};

export default UserWorkoutsPage;
