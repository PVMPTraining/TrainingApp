import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { Exercise, ExerciseData, Set } from "@/src/types/types"; // Assuming ExerciseSet is a type you want to use
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { ComboBox } from "@/src/components/UI/combobox/combobox";

interface CreateExerciseProps extends InputHTMLAttributes<HTMLInputElement> {
	exerciseCallback: (exercise: Exercise) => void;
}

export const CreateExercise: FC<CreateExerciseProps> = ({ exerciseCallback }) => {
	const [exercise, setExercise] = useState<Exercise>({
		name: "",
		sets: [],
		rest: 0
	});

	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	useEffect(() => {
		// Pass the exercise back to the parent component
		exerciseCallback(exercise);
	}, [exercise]); // This will trigger every time `exercise` changes

	const handleExerciseNameChange = (newName: string) => {
		setExercise({ ...exercise, name: newName });
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

	return (
		<div className="flex flex-col gap-4 p-4 rounded bg-base-300">
			<ComboBox options={exercises.map((exercise: ExerciseData) => exercise.name)} selectedCallback={handleExerciseNameChange} />
			{exercise.sets.map((set, index) => (
				<div key={index} className="flex gap-4 items-center max-w-screen justify-center">
					<div className="flex gap-1 items-center max-w-[37%]">
						<Input
							className="bg-base-200 input-sm text-end"
							placeholder="Reps"
							value={set.reps === 0 ? "" : set.reps}
							type="number"
							onChange={(e) => handleSetChange("reps", e.target.value, index)}
						/>
						<span className="text-xs">Reps</span>
					</div>
					<div className="flex gap-1 items-center max-w-[30%]">
						<Input
							className="bg-base-200 input-sm text-end"
							placeholder="kg"
							value={set.weight === 0 ? "" : set.weight}
							type="number"
							onChange={(e) => handleSetChange("weight", e.target.value, index)}
						/>
						<span className="text-xs">Weights (kg)</span>
					</div>
					<div className="flex gap-1 items-center max-w-[23%]">
						<Input
							className="bg-base-200 input-sm text-end"
							placeholder="s"
							value={set.rest === 0 ? "" : set.rest}
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
				<span className="text-xs">+Set</span>
			</Button>
			<div className="flex items-center gap-1">
				<Input
					className="input-sm text-end"
					type="number"
					placeholder="Rest After Exercies (s)"
					value={exercise.rest === 0 ? "" : exercise.rest}
					onChange={handleRestAfterExerciseChange}
				/>
				<span>Rest</span>
			</div>
		</div>
	);
};
