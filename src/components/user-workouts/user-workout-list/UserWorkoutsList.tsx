import { FC, InputHTMLAttributes, useEffect } from "react";
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
						router.push("/user-workouts/new-workout");
					}}
				>
					Add New Workout
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				{userWorkouts.map((workout: Workout, index: number) => {
					return (
						<Card className="bg-base-200 w-[48%] animate-fade" key={index}>
							<CardBody>
								<div>{workout.name}</div>
								<div>
									{workout.exercises.map((exercise, exerciseIndex) => {
										return (
											<div key={exerciseIndex}>
												{exercise.name}
												<div>
													{exercise.sets.map((set, setIndex) => {
														return (
															<div key={setIndex} className="flex gap-2">
																<div>{set.rest}</div>
																<div>{set.weight}</div>
																<div>{set.reps}</div>
															</div>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
							</CardBody>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default UserWorkoutsList;
