import { FC, InputHTMLAttributes, useEffect } from "react";
import useFetchUserWorkouts from "@/src/utils/hooks/useFetchUserWorkouts";
import { Workout } from "@/src/types/types";
import { Card, CardBody } from "../../UI/Card/Card";

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

	return (
		<div className="flex flex-wrap gap-2 m-4">
			{userWorkouts.map((workout: Workout, index: number) => {
				return (
					<Card className="bg-base-200 w-[48%]" key={index}>
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
	);
};

export default UserWorkoutsList;
