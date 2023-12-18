import { timedWorkout } from "@/src/types/fitnessTypes";
import { FC, InputHTMLAttributes } from "react";

interface LoggedWorkoutEditorProps extends InputHTMLAttributes<HTMLInputElement> {
	loggedUserWorkouts: timedWorkout;
}

export const LoggedWorkoutEditor: FC<LoggedWorkoutEditorProps> = ({ loggedUserWorkouts }) => {
	return (
		<div className="">
			{loggedUserWorkouts.exercises.map((exercise, index) => {
				return <div key={index}>{exercise.name}</div>;
			})}
		</div>
	);
};
