"use client";

import useFetchLoggedUserWorkouts from "@/src/utils/hooks/useFetchLoggedUserWorkouts";
import { useRouter } from "next/navigation";
import { FC, ButtonHTMLAttributes, Key, useState, useEffect } from "react";
import { Card, CardBody } from "src/components/UI/Card/Card";
import { Button } from "../../UI/Button/Button";
import { timedWorkout } from "@/src/types/fitnessTypes";
import { formatLongDate } from "@/src/utils/helpers/dateHelpers";

interface UserWorkoutsDayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	date: Date;
}

export const UserWorkoutsDay: FC<UserWorkoutsDayProps> = ({ className, date }) => {
	const router = useRouter();
	const { isLoading, loggedUserWorkouts } = useFetchLoggedUserWorkouts();
	const [selectedDateWorkouts, setSelectedDateWorkouts] = useState<any>(null);

	useEffect(() => {
		// Get the current date in the format "YYYY-MM-DD"
		const currentDate = date.toISOString().split("T")[0];

		// Filter the loggedUserWorkouts based on the date
		const filteredWorkouts = loggedUserWorkouts.filter((workout: { date: string }) => {
			return workout.date.split("T")[0] === currentDate;
		});

		setSelectedDateWorkouts(filteredWorkouts);
	}, [loggedUserWorkouts, date]);

	return (
		<div>
			<div className="text-xl font-bold ml-2 mb-1">Workouts for {formatLongDate(date)}</div>
			{selectedDateWorkouts && selectedDateWorkouts.length !== 0 && (
				<Card className={["bg-base-200 card-compact", className].join(" ")}>
					<CardBody>
						<div className="bg-base-300 rounded-lg p-2">
							{selectedDateWorkouts.map((workout: timedWorkout, index: Key | null | undefined) => {
								return (
									<div className="flex justify-between" key={index}>
										<div>
											<h2>{workout.name}</h2>
											{workout.exercises.map((exercise, index) => {
												return <div key={index}>{exercise.name}</div>;
											})}
										</div>
										<Button
											className="btn-sm bg-accent"
											onClick={() => {
												router.push("/fitness/log-workout/editor?workout=" + JSON.stringify(workout));
											}}
										>
											<span className="text-black">Full View</span>
										</Button>
									</div>
								);
							})}
						</div>
					</CardBody>
				</Card>
			)}
			{selectedDateWorkouts && selectedDateWorkouts.length === 0 && (
				<Card className="bg-base-200">
					<CardBody>
						<div>No workouts logged today! It's time for a new one</div>
					</CardBody>
				</Card>
			)}
		</div>
	);
};
