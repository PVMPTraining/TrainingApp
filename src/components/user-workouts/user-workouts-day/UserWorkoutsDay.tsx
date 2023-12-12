import { ExerciseData } from "@/src/types/types";
import useFetchLoggedUserWorkouts from "@/src/utils/hooks/useFetchLoggedUserWorkouts";
import { FC, ButtonHTMLAttributes, Key, useState, useEffect } from "react";
import { Card, CardBody } from "src/components/UI/Card/Card";

interface UserWorkoutsDayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	date: Date;
}

export const UserWorkoutsDay: FC<UserWorkoutsDayProps> = ({ className, date }) => {
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
		<>
			{selectedDateWorkouts && selectedDateWorkouts.length !== 0 && (
				<Card className={["bg-base-200", className].join(" ")}>
					<CardBody>
						<h1>Workouts for the day! {date.toISOString().split("T")[0]}</h1>
						<div className="bg-base-100 rounded-lg p-4">
							{selectedDateWorkouts.map(
								(
									workout: {
										name: string;
										exercises: any[];
									},
									index: Key | null | undefined
								) => {
									return (
										<div key={index}>
											<h2>{workout.name}</h2>
											{workout.exercises.map((exercise, index) => {
												return <div key={index}>{exercise.name}</div>;
											})}
										</div>
									);
								}
							)}
						</div>
					</CardBody>
				</Card>
			)}
		</>
	);
};
