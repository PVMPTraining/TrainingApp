import { FC, useEffect, useState } from "react";
import { Input } from "../re-usable/Input/Input";
import { Button } from "../re-usable/Button/Button";
import { Exercise, Set } from "@/src/types/types"; // Assuming ExerciseSet is a type you want to use
import { Log, LogLevel } from "@/src/utils/helpers/debugLog";

interface CreateExerciseProps {
	exerciseCallback: (exercise: Exercise) => void;
}

export const CreateExercise: FC<CreateExerciseProps> = ({ exerciseCallback }) => {
	const [exercise, setExercise] = useState<Exercise>({
		name: "",
		sets: [],
		rest: 0
	});

	const [newSet, setNewSet] = useState<Set>({
		reps: 0,
		weight: 0,
		rest: 0
	});

	const handleExerciseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExercise({ ...exercise, name: event.target.value });
	};

	const handleSetChange = (field: string, value: string) => {
		setNewSet({ ...newSet, [field]: value });
	};

	const addSet = () => {
		setExercise({
			...exercise,
			sets: [...exercise.sets, newSet]
		});
		setNewSet({
			reps: 0,
			weight: 0,
			rest: 0
		});
	};

	const handleRestAfterExerciseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExercise({ ...exercise, rest: parseInt(event.target.value) || 0 });
	};

	const saveExercise = () => {
		// You can perform further actions here, like saving the exercise to your database or state
		// console.log("Exercise Saved:", exercise);
		Log(LogLevel.DEBUG, `Exercise Saved: ${JSON.stringify(exercise)}`);
	};

	useEffect(() => {
		// Pass the exercise back to the parent component
		exerciseCallback(exercise);
	}, [exercise]); // This will trigger every time `exercise` changes

	return (
		<div className="flex flex-col gap-4 mx-4">
			<Input placeholder="Exercise name" value={exercise.name} onChange={handleExerciseNameChange} />
			{exercise.sets.map((set, index) => (
				<div key={index} className="flex gap-4 max-w-screen justify-center">
					<div className="flex gap-1 items-center max-w-[30%]">
						<Input className="bg-base-200" placeholder="Reps" value={set.reps} onChange={(e) => handleSetChange("reps", e.target.value)} />
						Reps
					</div>
					<div className="flex gap-1 items-center max-w-[30%]">
						<Input
							className="bg-base-200"
							placeholder="Weights (kg)"
							value={set.weight}
							onChange={(e) => handleSetChange("weight", e.target.value)}
						/>
						Weights (kg)
					</div>
					<div className="flex gap-1 items-center max-w-[30%]">
						<Input className="bg-base-200" placeholder="Rest (s)" value={set.rest} onChange={(e) => handleSetChange("rest", e.target.value)} />
						Rest (s)
					</div>
				</div>
			))}
			<Button className="w-full" onClick={addSet}>
				New set
			</Button>
			<Input type="number" placeholder="Rest After Exercise" value={exercise.rest.toString()} onChange={handleRestAfterExerciseChange} />
			<Button className="w-full" onClick={saveExercise}>
				Save Exercise
			</Button>
		</div>
	);
};
