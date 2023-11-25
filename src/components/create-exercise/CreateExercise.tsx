import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { Input } from "../re-usable/Input/Input";
import { Button } from "../re-usable/Button/Button";
import { Exercise, Set } from "@/src/types/types"; // Assuming ExerciseSet is a type you want to use
import { Log, LogLevel } from "@/src/utils/helpers/debugLog";

interface CreateExerciseProps extends InputHTMLAttributes<HTMLInputElement> {
	exerciseCallback: (exercise: Exercise) => void;
}

export const CreateExercise: FC<CreateExerciseProps> = ({ exerciseCallback }) => {
	const [exercise, setExercise] = useState<Exercise>({
		name: "",
		sets: [],
		rest: 0
	});

	useEffect(() => {
		// Pass the exercise back to the parent component
		exerciseCallback(exercise);
	}, [exercise]); // This will trigger every time `exercise` changes

	const handleExerciseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExercise({ ...exercise, name: event.target.value });
	};

	const handleSetChange = (field: string, value: string, index: number) => {
		const updatedSets = [...exercise.sets];
		const updatedSet = { ...updatedSets[index], [field]: value };
		updatedSets[index] = updatedSet;
		setExercise({ ...exercise, sets: updatedSets });
	};

	const addSet = () => {
		const newSet: Set = {
			reps: 0,
			weight: 0,
			rest: 0
		};
		setExercise({
			...exercise,
			sets: [...exercise.sets, newSet]
		});
	};

	const removeSet = (index: number) => {
		const updatedSets = [...exercise.sets];
		updatedSets.splice(index, 1); // Remove the set at the specified index
		setExercise({ ...exercise, sets: updatedSets });
	};

	const handleRestAfterExerciseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExercise({ ...exercise, rest: parseInt(event.target.value) || 0 });
	};

	const saveExercise = () => {
		// You can perform further actions here, like saving the exercise to your database or state
		// console.log("Exercise Saved:", exercise);
		Log(LogLevel.DEBUG, `Exercise Saved:`, exercise);
	};

	return (
		<div className="flex flex-col gap-4 p-4 rounded bg-base-300">
			<Input className="bg-base-200" placeholder="Exercise name" value={exercise.name} onChange={handleExerciseNameChange} />
			{exercise.sets.map((set, index) => (
				<div key={index} className="flex gap-4 items-center max-w-screen justify-center">
					<div className="flex gap-1 items-center max-w-[30%]">
						<Input
							className="bg-base-200 input-sm"
							placeholder="Reps"
							value={set.reps}
							type="number"
							onChange={(e) => handleSetChange("reps", e.target.value, index)}
						/>
						<span className="text-xs">Reps</span>
					</div>
					<div className="flex gap-1 items-center max-w-[30%]">
						<Input
							className="bg-base-200 input-sm"
							placeholder="Weights (kg)"
							value={set.weight}
							type="number"
							onChange={(e) => handleSetChange("weight", e.target.value, index)}
						/>
						<span className="text-xs">Weights (kg)</span>
					</div>
					<div className="flex gap-1 items-center max-w-[30%]">
						<Input
							className="bg-base-200 input-sm"
							placeholder="Rest (s)"
							value={set.rest}
							type="number"
							onChange={(e) => handleSetChange("rest", e.target.value, index)}
						/>
						<span className="text-xs">Rest (s)</span>
					</div>
					<Button className="btn-circle btn-sm" onClick={() => removeSet(index)}>
						X
					</Button>
				</div>
			))}
			<Button className="btn-circle btn-sm self-center" onClick={addSet}>
				+
			</Button>
			<Input type="number" placeholder="Rest After Exercise" value={exercise.rest.toString()} onChange={handleRestAfterExerciseChange} />
		</div>
	);
};
