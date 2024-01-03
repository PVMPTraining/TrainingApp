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
import { UserWorkoutsDay } from "@/src/components/UserWorkouts/UserWorkoutsDay/UserWorkoutsDay";
import { UserWorkoutsCalendar } from "@/src/components/UserWorkouts/UserWorkoutsCalendar/UserWorkoutsCalendar";
import { FaDumbbell } from "react-icons/fa";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { WorkoutHistoryWidget } from "@/src/components/UserWorkouts/WorkoutWidgets/WorkoutHistoryWidget/WorkoutHistoryWidget";

const FitnessPage: FC = () => {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [isModalOpen, setIsModalOpen] = useState(false);

	const buttonLabel: FC<{ text: string }> = ({ text }) => {
		return (
			<div className="w-full flex items-center gap-2 mx-2">
				<FaDumbbell className="text-accent text-2xl" />
				<span className="uppercase">{text}</span>
			</div>
		);
	};

	const randomX = Math.floor(Math.random() * 100);
	const randomY = Math.floor(Math.random() * 100);

	const backgroundStyles = {
		background: `radial-gradient(farthest-corner at ${randomX}% ${randomY}%, rgba(84, 226, 16, 1) -150%, rgba(18, 18, 18, 1) 100%)`
	};

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
								{buttonLabel({ text: "Exercises" })}
							</Button>
							<Button
								className="basis-[48%] grow"
								onClick={() => {
									router.push(workoutPagePath);
								}}
							>
								{buttonLabel({ text: "Workouts" })}
							</Button>
							<Button
								className="basis-[48%] grow"
								onClick={() => {
									router.push(fitnessToolsPagePath);
								}}
							>
								{buttonLabel({ text: "Tools" })}
							</Button>
							<Button
								className="basis-[48%] grow"
								onClick={() => {
									setIsModalOpen(true);
								}}
							>
								{buttonLabel({ text: "Log-Workout" })}
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
