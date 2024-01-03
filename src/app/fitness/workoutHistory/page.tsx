"use client";

import { Button } from "@/src/components/UI/Button/Button";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import NavLayout from "@/src/layouts/NavLayout";
import { Workout, timedWorkout, timedWorkoutToWorkout } from "@/src/types/fitnessTypes";
import useFetchLoggedUserWorkouts from "@/src/utils/hooks/useFetchLoggedUserWorkouts";
import { useRouter } from "next/navigation";
import { FC } from "react";

const WorkoutHistoryPage: FC = () => {
	const router = useRouter();
	const { isLoading, loggedUserWorkouts } = useFetchLoggedUserWorkouts();

	return (
		<NavLayout
			header={<div>Workout History</div>}
			content={
				<div className="flex-grow flex flex-col m-4">
					{isLoading ? (
						<p>Loading...</p>
					) : (
						loggedUserWorkouts.map((workout: timedWorkout, index: number) => (
							<Card className="bg-base-300" key={index}>
								<CardBody className="flex flex-row justify-between">
									<div className="flex flex-col">
										<div>{String(workout.date).split("T")[0]}</div>
										<div>{workout.name}</div>
									</div>
									<Button
										onClick={() => {
											router.push("/fitness/log-workout/live?workout=" + JSON.stringify(timedWorkoutToWorkout(workout)));
										}}
									>
										Repeat
									</Button>
								</CardBody>
							</Card>
						))
					)}
				</div>
			}
		/>
	);
};

export default WorkoutHistoryPage;
