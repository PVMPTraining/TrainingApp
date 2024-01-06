"use client";
import { FC, useState } from "react";

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
import { IconType } from "react-icons";

const FitnessPage: FC = () => {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [isModalOpen, setIsModalOpen] = useState(false);

	const buttonLabel: FC<{ text: string; icon?: IconType }> = ({ text, icon: Icon }) => {
		return (
			<div className="w-full flex items-center gap-4">
				{Icon && <Icon className="text-accent text-2xl" />}
				<span className="uppercase">{text}</span>
			</div>
		);
	};

	const fitnessPageButtons = [
		{ icon: FaDumbbell, text: "Exercises", onClick: () => router.push(exercisePagePath) },
		{ icon: FaDumbbell, text: "Workouts", onClick: () => router.push(workoutPagePath) },
		{ icon: FaDumbbell, text: "Tools", onClick: () => router.push(fitnessToolsPagePath) },
		{ icon: FaDumbbell, text: "Log-Workout", onClick: () => setIsModalOpen(true) }
	];

	const modalButtons = [
		{ text: "New Workout", onClick: () => router.push(liveWorkoutPagePath) },
		{ text: "From a logged workout", onClick: () => router.push(workoutHistoryPagePath) },
		{ text: "From My Workout", onClick: () => router.push(workoutPagePath) }
	];

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
						<div className="grid grid-cols-1 xs:grid-cols-2 mt-auto">
							{fitnessPageButtons.map((button, i) => {
								return (
									<Button
										key={i}
										onClick={() => {
											button.onClick();
										}}
									>
										{buttonLabel({ icon: button.icon, text: button.text })}
									</Button>
								);
							})}
						</div>
					</div>
					<Modal openModal={isModalOpen} closeModalCallback={setIsModalOpen}>
						<div className="flex flex-col">
							{modalButtons.map((button, i) => {
								return (
									<Button
										key={i}
										onClick={() => {
											button.onClick();
										}}
									>
										{/* {button.text} */}
										{buttonLabel({ text: button.text })}
									</Button>
								);
							})}
						</div>
					</Modal>
				</>
			}
		/>
	);
};

export default FitnessPage;
