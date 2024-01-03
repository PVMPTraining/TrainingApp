"use client";

import { FC } from "react";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { liveWorkoutPagePath } from "@/src/pathmap/pathmap";

const LogWorkoutPage: FC = () => {
	const router = useRouter();

	const startWorkout = () => {
		router.push(liveWorkoutPagePath);
	};

	return (
		<div className="flex flex-col justify-center gap-4 m-4">
			<Button onClick={startWorkout}>New Workout</Button>
			<Button
				onClick={() => {
					router.push("/fitness/user-workouts");
				}}
			>
				From a logged workout
			</Button>
			<Button>From My Workout</Button>
		</div>
	);
};

export default LogWorkoutPage;