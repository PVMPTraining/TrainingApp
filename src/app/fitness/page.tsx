"use client";
import { FC } from "react";

// Next
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { exercisePagePath, fitnessToolsPagePath, logWorkoutPagePath, workoutPagePath } from "@/src/pathmap/pathmap";
import NavLayout from "@/src/layouts/NavLayout";
import { UserWorkoutsDay } from "@/src/components/user-workouts/user-workouts-day/UserWorkoutsDay";
import { UserWorkoutsCalendar } from "@/src/components/user-workouts/user-workouts-calendar/UserWorkoutsCalendar";

const FitnessPage: FC = () => {
	const router = useRouter();

	return (
		<NavLayout>
			<div className="flex-grow flex flex-col justify-end gap-4 p-4">
				<UserWorkoutsCalendar></UserWorkoutsCalendar>
				<UserWorkoutsDay></UserWorkoutsDay>
				<div>Welcome to the Fitness Section!</div>
				<Button
					onClick={() => {
						router.push(exercisePagePath);
					}}
				>
					Exercises
				</Button>
				<Button
					onClick={() => {
						router.push(workoutPagePath);
					}}
				>
					Workouts
				</Button>
				<Button
					onClick={() => {
						router.push(fitnessToolsPagePath);
					}}
				>
					Tools
				</Button>
				<Button
					onClick={() => {
						router.push(logWorkoutPagePath);
					}}
				>
					Log-Workout
				</Button>
			</div>
		</NavLayout>
	);
};

export default FitnessPage;
