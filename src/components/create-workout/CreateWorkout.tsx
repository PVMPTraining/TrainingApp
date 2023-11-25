import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { Button } from "../re-usable/Button/Button";
import { CreateExercise } from "../create-exercise/CreateExercise";
import { Exercise, Workout } from "@/src/types/types";
import { Log, LogLevel } from "@/src/utils/helpers/debugLog";
import { Input } from "../re-usable/Input/Input";

interface CreateWorkoutProps extends InputHTMLAttributes<HTMLInputElement> {
	workoutCallback: (exercise: Workout) => void;
}

export const CreateWorkout: FC<CreateWorkoutProps> = ({ workoutCallback }) => {
	const [workout, setWorkout] = useState<Workout>({
		name: "",
		exercises: []
	});
	const [exerciseIds, setExerciseIds] = useState<number[]>([]); // State to store exercise IDs

	useEffect(() => {
		Log(LogLevel.DEBUG, `Workout updated:`, workout);
		workoutCallback(workout);
	}, [workout]);

	const generateRandomNumber = () => {
		const min = 1000000000; // Minimum 10-digit number
		const max = 9999999999; // Maximum 10-digit number
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	};

	const addNewExerciseToWorkout = () => {
		const newExercise: Exercise = {
			name: "",
			sets: [],
			rest: 0
		};

		const newId = generateRandomNumber(); // Generate a unique ID
		setExerciseIds([...exerciseIds, newId]);

		setWorkout((prevWorkout) => ({
			...prevWorkout,
			exercises: [...prevWorkout.exercises, newExercise]
		}));
	};

	const updateExercise = (id: number, updatedExercise: Exercise) => {
		setWorkout((prevWorkout) => {
			const newExercises = [...prevWorkout.exercises];
			const index = exerciseIds.indexOf(id);

			if (index !== -1) {
				newExercises[index] = updatedExercise;
			}

			return {
				...prevWorkout,
				exercises: newExercises
			};
		});
	};

	const removeExercise = (id: number) => {
		setWorkout((prevWorkout) => {
			const index = exerciseIds.indexOf(id);
			if (index !== -1) {
				const newExercises = [...prevWorkout.exercises];
				newExercises.splice(index, 1);
				setExerciseIds((prevIds) => prevIds.filter((exerciseId) => exerciseId !== id)); // Remove the exercise ID
				Log(LogLevel.INFO, `Removing exercise with ID:`, { id });
				return {
					...prevWorkout,
					exercises: newExercises
				};
			} else {
				return prevWorkout;
			}
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<Input
				className="bg-base-200"
				placeholder="Workout name"
				value={workout.name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkout({ ...workout, name: e.target.value })}
			/>
			{workout.exercises.map((exercise, index) => {
				const exerciseId = exerciseIds[index];
				return (
					<div className="flex flex-col gap-4" key={exerciseId}>
						<Button
							onClick={() => {
								removeExercise(exerciseId);
							}}
						>
							Remove exercise
						</Button>
						<CreateExercise key={exerciseId} exerciseCallback={(updatedExercise) => updateExercise(exerciseId, updatedExercise)} />
					</div>
				);
			})}
			<Button onClick={addNewExerciseToWorkout}>Add new exercise</Button>
		</div>
	);
};
