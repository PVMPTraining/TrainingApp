import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import useFetchUserWorkouts from "@/src/utils/hooks/useFetchUserWorkouts";
import { Workout } from "@/src/types/types";
import { Card, CardBody } from "../../UI/Card/Card";
import { Button } from "../../UI/Button/Button";
import { useRouter } from "next/navigation";

/**
 * Props for the UserWorkouts component.
 */
interface UserWorkoutsListProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * Renders the UserWorkouts component.
 * @component
 */
const UserWorkoutsList: FC<UserWorkoutsListProps> = ({}) => {
	const { isLoading, userWorkouts } = useFetchUserWorkouts();
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [workoutSelected, setWorkout] = useState<Workout>({} as Workout);

	// Function to open the modal
	const openModal = () => {
		setIsModalOpen(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="flex flex-col gap-4 m-4">
			<div className="flex gap-4 items-center bg-base-300 rounded p-2">
				<Button
					onClick={() => {
						router.back();
					}}
				>
					BACK
				</Button>
				<div className="w-full text-center">
					<h1 className="uppercase">User Workouts</h1>
				</div>
				<Button
					onClick={() => {
						router.push("/fitness/user-workouts/new-workout");
					}}
				>
					Add New Workout
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				{userWorkouts.map((workout: Workout, index: number) => {
					return (
						<Button
							key={index}
							className="w-[48%] h-24 uppercase text-center"
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
			{isModalOpen && (
				<dialog id="my_modal_1" className="modal" open>
					<div className="modal-box">
						<Card>
							<Button
								onClick={() => {
									router.push("/fitness/user-workouts/update-workout");
								}}
							>
								Edit
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
					</div>
					<div className="modal-backdrop">
						<button onClick={closeModal}>close</button>
					</div>
				</dialog>
			)}
		</div>
	);
};

export default UserWorkoutsList;
