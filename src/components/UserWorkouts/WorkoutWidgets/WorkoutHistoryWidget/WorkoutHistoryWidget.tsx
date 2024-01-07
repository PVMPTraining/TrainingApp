import { Button } from "@/src/components/UI/Button/Button";
import { CardBody, CardCompact } from "@/src/components/UI/Card/Card";
import { timedWorkout, timedWorkoutToWorkout } from "@/src/types/fitnessTypes";
import useFetchLoggedUserWorkouts from "@/src/utils/hooks/useFetchLoggedUserWorkouts";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { workoutHistoryPagePath } from "@/src/pathmap/pathmap";
import { Skeleton } from "@/src/components/UI/Skeleton/Skeleton";
import { concatClassName } from "@/src/utils/helpers/functions";

interface WorkoutHistoryWidgetProps extends HTMLAttributes<HTMLElement> {
	className?: string;
}

export const WorkoutHistoryWidget: FC<WorkoutHistoryWidgetProps> = ({ className, ...props }: WorkoutHistoryWidgetProps) => {
	const router = useRouter();
	const { isLoading, loggedUserWorkouts } = useFetchLoggedUserWorkouts();

	// Sort the loggedUserWorkouts by date in descending order
	const sortedWorkouts = [...loggedUserWorkouts].sort((a, b) => b.date - a.date);

	// Take the latest 3 workouts
	const latestWorkouts = sortedWorkouts.slice(0, 3);

	return (
		<CardCompact className={concatClassName("flex flex-col gap-2 bg-base-200", className)} {...props}>
			<CardBody>
				<div className="flex justify-start">
					<Button
						className="btn-xs bg-accent"
						onClick={() => {
							router.push(workoutHistoryPagePath);
						}}
					>
						<span className="text-black">View Full History</span>
					</Button>
				</div>
				{isLoading ? (
					<Skeleton className="w-full h-16" />
				) : (
					latestWorkouts.map((workout: timedWorkout, index: number) => (
						<CardCompact className="bg-base-300" key={index}>
							<CardBody className="flex flex-row justify-between">
								<div className="flex flex-col">
									<div>{String(workout.date).split("T")[0]}</div>
									<div>{workout.name}</div>
								</div>
								<Button
									className="btn-sm bg-accent"
									onClick={() => {
										router.push("/fitness/log-workout/live?workout=" + JSON.stringify(timedWorkoutToWorkout(workout)));
									}}
								>
									<span className="text-black">Repeat</span>
								</Button>
							</CardBody>
						</CardCompact>
					))
				)}
			</CardBody>
		</CardCompact>
	);
};
