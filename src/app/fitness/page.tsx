"use client";
import { FC, use, useState } from "react";

// Next
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import {
	exercisePagePath,
	fitnessToolsPagePath,
	liveWorkoutPagePath,
	logWorkoutPagePath,
	workoutHistoryPagePath,
	workoutPagePath
} from "@/src/pathmap/pathmap";
import NavLayout from "@/src/layouts/NavLayout";
import { UserWorkoutsDay } from "@/src/components/user-workouts/user-workouts-day/UserWorkoutsDay";
import { UserWorkoutsCalendar } from "@/src/components/user-workouts/user-workouts-calendar/UserWorkoutsCalendar";
import { FaDumbbell } from "react-icons/fa";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { WorkoutHistoryWidget } from "@/src/components/user-workouts/workout-widgets/workout-history-widget/WorkoutHistoryWidget";

const FitnessPage: FC = () => {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<NavLayout
			header={<div>Fitness</div>}
			content={
				<>
					<div className="flex-grow flex flex-col justify-end gap-4 p-4">
						<WorkoutHistoryWidget />
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
									setIsModalOpen(true);
								}}
							>
								<FaDumbbell />
								Log-Workout
							</Button>
						</div>
					</div>
					<Modal openModal={isModalOpen} closeModalCallback={setIsModalOpen}>
						<div className="flex flex-col">
							<Button
								onClick={() => {
									router.push(liveWorkoutPagePath);
								}}
							>
								New Workout
							</Button>
							<Button
								onClick={() => {
									router.push(workoutHistoryPagePath);
								}}
							>
								From a logged workout
							</Button>
							<Button
								onClick={() => {
									router.push(workoutPagePath);
								}}
							>
								From My Workout
							</Button>
						</div>
					</Modal>
				</>
			}
		/>
	);
};

export default FitnessPage;
