import { FC, useEffect, useState } from "react";
import { Button } from "../re-usable/Button/Button";
import { CreateExercise } from "../create-exercise/CreateExercise";
import { Exercise, Workout } from "@/src/types/types";
import { Log, LogLevel } from "@/src/utils/helpers/debugLog";

export const CreateWorkout: FC = () => {
	const [workout, setWorkout] = useState<Workout>({
		name: "",
		exercises: []
	});

	useEffect(() => {
		Log(LogLevel.DEBUG, `Workout updated: ${JSON.stringify(workout)}`);
	}, [workout]);

	const addNewExerciseToWorkout = () => {
		const newExercise: Exercise = {
			name: "",
			sets: [],
			rest: 0
		};

		setWorkout((prevWorkout) => ({
			...prevWorkout,
			exercises: [...prevWorkout.exercises, newExercise]
		}));
	};

	const updateExercise = (index: number, updatedExercise: Exercise) => {
		setWorkout((prevWorkout) => {
			const newExercises = [...prevWorkout.exercises];
			newExercises[index] = updatedExercise;
			return {
				...prevWorkout,
				exercises: newExercises
			};
		});
	};

	const removeExercise = (index: number) => {
		setWorkout((prevWorkout) => {
			const newExercises = [...prevWorkout.exercises];
			newExercises.splice(index, 1);
			return {
				...prevWorkout,
				exercises: newExercises
			};
		});
	};

	return (
		<>
			<div className="flex flex-col gap-4">
				{workout.exercises.map((exercise, index) => (
					<div key={index}>
						<Button
							onClick={() => {
								removeExercise(index);
							}}
						>
							Remove exercise
						</Button>
						<CreateExercise key={index} exerciseCallback={(updatedExercise) => updateExercise(index, updatedExercise)} />
					</div>
				))}
				<Button onClick={addNewExerciseToWorkout}>Add new exercise</Button>
			</div>
		</>
	);
};
