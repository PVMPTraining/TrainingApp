"use client";
import { FC, useState } from "react";

import NavLayout from "@/src/layouts/NavLayout";

// Next
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { UserWorkoutsDay } from "@/src/components/UserWorkouts/UserWorkoutsDay/UserWorkoutsDay";
import { UserWorkoutsCalendar } from "@/src/components/UserWorkouts/UserWorkoutsCalendar/UserWorkoutsCalendar";
import { FaDumbbell } from "react-icons/fa";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { WorkoutHistoryWidget } from "@/src/components/UserWorkouts/WorkoutWidgets/WorkoutHistoryWidget/WorkoutHistoryWidget";
import { IconType } from "react-icons";
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";
import { Section } from "@/src/components/UI/Section/Section";
import { formatLongDate } from "@/src/utils/helpers/dateHelpers";
import { Workout } from "@/src/types/fitnessTypes";
import { LiveWorkoutStartNewModal } from "@/src/components/UserWorkouts/LiveWorkoutStartNewModal/LiveWorkoutStartNewModal";
import {
	exercisePagePath,
	fitnessToolsPagePath,
	liveWorkoutPagePath,
	logWorkoutPagePath,
	workoutHistoryPagePath,
	workoutPagePath
} from "@/src/pathmap/pathmap";

enum MODAL_CONTENT {
	LOG_WORKOUT,
	START_NEW_WORKOUT
}

const FitnessPage: FC = () => {
	const strings = useLocalizedStrings();

	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState<MODAL_CONTENT>();
	const [workout, setWorkout] = useState<Workout>({ name: "", exercises: [{ name: "", sets: [{ reps: 0, weight: 0, rest: 0 }], rest: 0 }] });

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
		{
			icon: FaDumbbell,
			text: strings.fitness.logWorkoutButton,
			onClick: () => {
				setIsModalOpen(true);
				setModalContent(MODAL_CONTENT.LOG_WORKOUT);
			}
		}
	];

	const modalButtons = [
		{ text: strings.fitness.logWorkoutModal.buttons.newWorkout, onClick: () => setModalContent(MODAL_CONTENT.START_NEW_WORKOUT) },
		{ text: strings.fitness.logWorkoutModal.buttons.fromLogged, onClick: () => router.push(workoutHistoryPagePath) },
		{ text: strings.fitness.logWorkoutModal.buttons.fromWorkout, onClick: () => router.push(workoutPagePath) }
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
						<div className="grid grid-cols-1 2xs:grid-cols-2 mt-auto">
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
						{modalContent === MODAL_CONTENT.START_NEW_WORKOUT && <LiveWorkoutStartNewModal />}
						{modalContent === MODAL_CONTENT.LOG_WORKOUT && (
							<>
								{
									<div className="flex flex-col">
										<span className="text-xl font-bold ml-2 mb-1">{strings.fitness.logWorkoutModal.header}</span>
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
								}
							</>
						)}
					</Modal>
				</>
			}
		/>
	);
};

export default FitnessPage;
