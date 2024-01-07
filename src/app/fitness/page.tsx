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
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { Section } from "@/src/components/UI/Section/Section";
import { formatLongDate } from "@/src/utils/helpers/dateHelpers";

const FitnessPage: FC = () => {
	const strings = useLocalizedStrings();

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
		{ icon: FaDumbbell, text: strings.fitness.exercisesButton, onClick: () => router.push(exercisePagePath) },
		{ icon: FaDumbbell, text: strings.fitness.workoutsButton, onClick: () => router.push(workoutPagePath) },
		{ icon: FaDumbbell, text: strings.fitness.toolsButton, onClick: () => router.push(fitnessToolsPagePath) },
		{ icon: FaDumbbell, text: strings.fitness.logWorkoutButton, onClick: () => setIsModalOpen(true) }
	];

	const modalButtons = [
		{ text: "New Workout", onClick: () => router.push(liveWorkoutPagePath) },
		{ text: "From a logged workout", onClick: () => router.push(workoutHistoryPagePath) },
		{ text: "From My Workout", onClick: () => router.push(workoutPagePath) }
	];

	return (
		<NavLayout
			header={<div>{strings.fitness.fitnessHeader}</div>}
			content={
				<>
					<div className="flex-grow flex flex-col justify-end gap-4 p-4">
						<Section header="Workout History">
							<WorkoutHistoryWidget />
						</Section>
						<Section header="Calendar">
							<UserWorkoutsCalendar className="top-0" dateChangeCallback={setSelectedDate}></UserWorkoutsCalendar>
						</Section>
						<Section header={`Workouts for ${formatLongDate(selectedDate)}`}>
							<UserWorkoutsDay date={selectedDate}></UserWorkoutsDay>
						</Section>
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
							<span className="text-xl font-bold ml-2 mb-1">Log Workout From:</span>
							{modalButtons.map((button, i) => {
								return (
									<Button
										key={i}
										onClick={() => {
											button.onClick();
										}}
									>
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
