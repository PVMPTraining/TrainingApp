"use client";

import useFetchLoggedUserWorkouts from "@/src/utils/hooks/useFetchLoggedUserWorkouts";
import { FC, Key, useState, useEffect, HTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardCompact } from "@/src/components/UI/Card/Card";
import { ButtonSmall } from "@/src/components/UI/Button/Button";
import { timedWorkout } from "@/src/types/fitnessTypes";
import { Skeleton } from "@/src/components/UI/Skeleton/Skeleton";
import { concatClassName } from "@/src/utils/helpers/functions";

interface UserWorkoutsDayProps extends HTMLAttributes<HTMLElement> {
	date: Date;
}

export const UserWorkoutsDay: FC<UserWorkoutsDayProps> = ({ className, date, ...props }: UserWorkoutsDayProps) => {
	const router = useRouter();
	const { isLoading, loggedUserWorkouts } = useFetchLoggedUserWorkouts();
	const [selectedDateWorkouts, setSelectedDateWorkouts] = useState<any>(null);

	useEffect(() => {
		setSelectedDateWorkouts(
			loggedUserWorkouts.filter((workout: { date: string }) => {
				return workout.date.split("T")[0] === date.toISOString().split("T")[0];
			})
		);
	}, [loggedUserWorkouts, date]);

	return (
		<>
			{isLoading ? (
				<Skeleton className={concatClassName("w-full h-28", className)} {...props} />
			) : (
				<>
					{selectedDateWorkouts && (
						<CardCompact className={concatClassName("bg-base-200", className)} {...props}>
							<CardBody>
								{selectedDateWorkouts.length !== 0 ? (
									<>
										{selectedDateWorkouts.map((workout: timedWorkout, index: Key | null | undefined) => {
											return (
												<CardCompact key={index} className="bg-base-300">
													<CardBody>
														<div className="flex justify-between" key={index}>
															<div>
																<h2>{workout.name}</h2>
																{workout.exercises.map((exercise, index) => {
																	return <div key={index}>{exercise.name}</div>;
																})}
															</div>
															<ButtonSmall
																className="bg-accent"
																onClick={() => {
																	router.push("/fitness/log-workout/editor?workout=" + JSON.stringify(workout));
																}}
															>
																<span className="text-black">Full View</span>
															</ButtonSmall>
														</div>
													</CardBody>
												</CardCompact>
											);
										})}
									</>
								) : (
									<Card className="bg-base-200">
										<CardBody>
											<div>No workouts logged today! It&apos;s time for a new one</div>
										</CardBody>
									</Card>
								)}
							</CardBody>
						</CardCompact>
					)}
				</>
			)}
		</>
	);
};
