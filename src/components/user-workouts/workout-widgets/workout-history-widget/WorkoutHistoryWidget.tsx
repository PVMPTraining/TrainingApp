import { Button } from "@/src/components/UI/Button/Button";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import { timedWorkout, timedWorkoutToWorkout } from "@/src/types/fitnessTypes";
import useFetchLoggedUserWorkouts from "@/src/utils/hooks/useFetchLoggedUserWorkouts";
import { useRouter } from "next/navigation";
import { FC, ButtonHTMLAttributes } from "react";
import { workoutHistoryPagePath } from "@/src/pathmap/pathmap";

interface WorkoutHistoryWidgetProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const WorkoutHistoryWidget: FC<WorkoutHistoryWidgetProps> = () => {
	const router = useRouter();
	const { isLoading, loggedUserWorkouts } = useFetchLoggedUserWorkouts();

	// Sort the loggedUserWorkouts by date in descending order
	const sortedWorkouts = [...loggedUserWorkouts].sort((a, b) => b.date - a.date);

	// Take the latest 3 workouts
	const latestWorkouts = sortedWorkouts.slice(0, 3);

	return (
		<Card className="flex flex-col gap-2 bg-base-200">
			<CardBody>
				<div className="flex justify-between">
					<div>Workout History</div>
					<Button
						className="btn-xs"
						onClick={() => {
							router.push(workoutHistoryPagePath);
						}}
					>
						View Full History
					</Button>
				</div>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					latestWorkouts.map((workout: timedWorkout, index: number) => (
						<div className="bg-base-300 p-2 rounded" key={index}>
							<div className="flex flex-row justify-between">
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
							</div>
						</div>
					))
				)}
			</CardBody>
		</Card>
	);
};
