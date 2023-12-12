"use client";
import { FC, useState } from "react";

// Next
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { exercisePagePath, fitnessToolsPagePath, logWorkoutPagePath, workoutPagePath } from "@/src/pathmap/pathmap";
import NavLayout from "@/src/layouts/NavLayout";
import { UserWorkoutsDay } from "@/src/components/user-workouts/user-workouts-day/UserWorkoutsDay";
import { UserWorkoutsCalendar } from "@/src/components/user-workouts/user-workouts-calendar/UserWorkoutsCalendar";
import { FaDumbbell } from "react-icons/fa";

const FitnessPage: FC = () => {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(new Date());

	const header = <div>Test</div>;

	return (
		<NavLayout
			header={<div>Fitness</div>}
			children={
				<div className="flex-grow flex flex-col justify-end gap-4 p-4">
					<UserWorkoutsCalendar className="top-0" dateChangeCallback={setSelectedDate}></UserWorkoutsCalendar>
					<UserWorkoutsDay date={selectedDate}></UserWorkoutsDay>
					<div className="flex flex-wrap mt-auto">
						<Button
							className="basis-[48%] grow"
							onClick={() => {
								router.push(exercisePagePath);
							}}
						>
							<FaDumbbell />
							Exercises
						</Button>
						<Button
							className="basis-[48%] grow"
							onClick={() => {
								router.push(workoutPagePath);
							}}
						>
							<FaDumbbell />
							Workouts
						</Button>
						<Button
							className="basis-[48%] grow"
							onClick={() => {
								router.push(fitnessToolsPagePath);
							}}
						>
							<FaDumbbell />
							Tools
						</Button>
						<Button
							className="basis-[48%] grow"
							onClick={() => {
								router.push(logWorkoutPagePath);
							}}
						>
							<FaDumbbell />
							Log-Workout
						</Button>
					</div>
				</div>
			}
		/>
	);
};

export default FitnessPage;
