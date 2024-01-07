import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import useFetchUserWorkouts from "@/src/utils/hooks/useFetchUserWorkouts";
import { Workout } from "@/src/types/fitnessTypes";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import NavLayout from "@/src/layouts/NavLayout";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";
import { liveWorkoutPagePath, updateWorkoutPagePath } from "@/src/pathmap/pathmap";

/**
 * Props for the UserWorkouts component.
 */
interface UserWorkoutsListProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * Renders the UserWorkouts component.
 * @component
 */
const UserWorkoutsList: FC<UserWorkoutsListProps> = ({}) => {
	const strings = useLocalizedStrings();

	const { isLoading, userWorkouts } = useFetchUserWorkouts();
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [workoutSelected, setWorkout] = useState<Workout>({} as Workout);

	// Function to open the modal
	const openModal = () => {
		setIsModalOpen(true);
	};

	return (
		<NavLayout
			header={<div>{strings.UserWorkoutsList.header}</div>}
			content={
				<div className="flex flex-grow flex-col gap-4 m-2">
					<div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
						{userWorkouts.map((workout: Workout, index: number) => {
							return (
								<Button
									key={index}
									className="h-24 uppercase text-center m-0"
									onClick={() => {
										openModal();
										setWorkout(workout);
									}}
								>
									<div>{workout.name}</div>
								</Button>
							);
						})}
					</div>
					<Button
						className="mt-auto"
						onClick={() => {
							router.push("/fitness/user-workouts/new-workout");
						}}
					>
						{strings.UserWorkoutsList.addWorkoutButton}
					</Button>
					<Modal openModal={isModalOpen} closeModalCallback={setIsModalOpen}>
						{workoutSelected && workoutSelected.exercises && (
							<Card className="flex flex-col gap-4">
								<Button
									onClick={() => {
										router.push(`${liveWorkoutPagePath}?workout=${JSON.stringify(workoutSelected)}`);
									}}
								>
									{strings.UserWorkoutsList.startButton}
								</Button>
								<Button
									onClick={() => {
										router.push(`${updateWorkoutPagePath}?workout=${JSON.stringify(workoutSelected)}`);
									}}
								>
									{strings.UserWorkoutsList.editButton}
								</Button>
								{workoutSelected.name}
								{workoutSelected.exercises.map((exercise: any, index: number) => {
									return (
										<div key={index}>
											<div>{exercise.name}</div>
											{exercise.sets.map((set: any, index: number) => {
												return (
													<div className="flex gap-2" key={index}>
														<span>{set.reps}</span>
														<span>{set.weight}</span>
														<span>{set.rest}</span>
													</div>
												);
											})}
										</div>
									);
								})}
							</Card>
						)}
					</Modal>
				</div>
			}
		/>
	);
};

export default UserWorkoutsList;
