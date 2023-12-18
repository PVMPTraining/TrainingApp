import React, { FC, InputHTMLAttributes, useState } from "react";
import { Input } from "@/src/components/UI/Input/Input";
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { timedWorkout } from "@/src/types/fitnessTypes";
import { ExerciseData } from "@/src/types/types";
import { ComboBox } from "@/src/components/UI/ComboBox/combobox";

interface LoggedWorkoutEditorProps extends InputHTMLAttributes<HTMLInputElement> {
	loggedUserWorkouts: timedWorkout;
}

export const LoggedWorkoutEditor: FC<LoggedWorkoutEditorProps> = ({ loggedUserWorkouts }) => {
	const [workout, setWorkout] = useState<timedWorkout>(loggedUserWorkouts);
	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	const updateSet = (exerciseIndex: number, setIndex: number, key: string, value: number) => {
		const updatedWorkout = { ...workout };
		updatedWorkout.exercises[exerciseIndex].sets[setIndex] = {
			...updatedWorkout.exercises[exerciseIndex].sets[setIndex],
			[key]: value
		};
		setWorkout(updatedWorkout);
	};

	const updateExercise = (exerciseIndex: number, key: string, value: any) => {
		const updatedWorkout = { ...workout };
		updatedWorkout.exercises[exerciseIndex] = {
			...updatedWorkout.exercises[exerciseIndex],
			[key]: value
		};
		setWorkout(updatedWorkout);
	};

	const handleExerciseChange = (exerciseIndex: number, newExerciseName: string) => {
		updateExercise(exerciseIndex, "name", newExerciseName);
	};

	return (
		<div>
			{workout.exercises.map((exercise, i) => (
				<div className="flex flex-col gap-2 p-4 bg-base-300" key={i}>
					<ComboBox
						className="w-full"
						options={exercises.map((ex: ExerciseData) => ex.name)}
						value={exercise.name}
						selectedCallback={(newExerciseName) => handleExerciseChange(i, newExerciseName)}
					/>
					{exercise.sets.map((set, j) => (
						<div key={j} className="flex gap-4 items-center max-w-screen justify-center">
							<div className="flex flex-col">
								<Input
									type="number"
									className="bg-base-200 input-sm text-start"
									placeholder="Reps"
									value={set.reps}
									onChange={(e) => updateSet(i, j, "reps", parseInt(e.target.value) || 0)}
								/>
								<span className="text-xs ml-auto">Reps</span>
							</div>
							<div className="flex flex-col">
								<Input
									type="number"
									className="bg-base-200 input-sm text-start"
									placeholder="kg"
									value={set.weight}
									onChange={(e) => updateSet(i, j, "weight", parseFloat(e.target.value) || 0)}
								/>
								<span className="text-xs ml-auto">Weight (kg)</span>
							</div>
							<div className="flex flex-col">
								<Input
									type="number"
									className="bg-base-200 input-sm text-start"
									placeholder="s"
									value={set.rest}
									onChange={(e) => updateSet(i, j, "rest", parseInt(e.target.value) || 0)}
								/>
								<span className="text-xs ml-auto">Rest (s)</span>
							</div>
							<div className="flex flex-col">
								<Input
									type="number"
									className="bg-base-200 input-sm text-start"
									placeholder="s"
									value={set.time}
									onChange={(e) => updateSet(i, j, "time", parseInt(e.target.value) || 0)}
								/>
								<span className="text-xs ml-auto">Time (s)</span>
							</div>
						</div>
					))}
					<div className="flex gap-2">
						<Input
							type="number"
							className="bg-base-200 input-sm text-end"
							placeholder="s"
							value={exercise.rest}
							onChange={(e) => updateExercise(i, "rest", parseInt(e.target.value))}
						/>
						<span className="text-xs">Rest (s)</span>
						<Input
							type="number"
							className="bg-base-200 input-sm text-end"
							placeholder="s"
							value={exercise.time}
							onChange={(e) => updateExercise(i, "time", parseInt(e.target.value))}
						/>
						<span className="text-xs">Time (s)</span>
					</div>
				</div>
			))}
		</div>
	);
};
