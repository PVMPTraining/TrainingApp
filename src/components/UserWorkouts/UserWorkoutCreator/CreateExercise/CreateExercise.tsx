import { FC, InputHTMLAttributes } from "react";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { Field, FieldArray, FormikErrors, FormikTouched } from "formik"; // Import Field and FieldArray from Formik
import { Exercise, Workout } from "@/src/types/fitnessTypes";
import { ExerciseData } from "@/src/types/supabase/exerciseData";
import { ComboBox } from "@/src/components/UI/ComboBox/ComboBox";
import { useFetchExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";

interface CreateExerciseProps extends InputHTMLAttributes<HTMLInputElement> {
	deleteCallback: () => void;
	exercise: Exercise; // Add this prop
	index: number;
	touched?: FormikTouched<Workout>;
	errors?: FormikErrors<Workout>;
}

export const CreateExercise: FC<CreateExerciseProps> = ({ deleteCallback, exercise, index, touched, errors }) => {
	const { isLoading, exercises } = useFetchExercsiseDatabase();

	return (
		<div className="flex flex-col gap-4 p-4 rounded bg-base-300">
			<div className="flex gap-2">
				{(exercises[index] && (
					<ComboBox
						className="w-full"
						options={exercises.map((exercise: ExerciseData) => exercise.name)}
						selectedCallback={(s) => {
							exercise.name = s;
						}}
						value={exercise.name}
						touched={touched}
						errors={errors}
						index={index}
					/>
				)) || <Input disabled></Input>}
				<Button onClick={deleteCallback}>X</Button>
			</div>
			<div></div>
			<FieldArray name={`exercises[${index}].sets`}>
				{({ push, remove }) => (
					<>
						<div className="flex flex-col gap-4">
							{exercise.sets.map((set, setIndex) => (
								<div key={setIndex} className="flex gap-4 items-center max-w-screen justify-center">
									<div className="flex gap-1 items-center max-w-[37%]">
										<Input
											type="number"
											className="bg-base-200 input-sm text-end"
											placeholder="Reps"
											defaultValue={exercise.sets[setIndex].reps === 0 ? "" : exercise.sets[setIndex].reps}
											onChange={(e) => {
												exercise.sets[setIndex].reps = parseInt(e.target.value);
											}}
										/>
										<span className="text-xs">Reps</span>
									</div>
									<div className="flex gap-1 items-center max-w-[30%]">
										<Input
											type="number"
											className="bg-base-200 input-sm text-end"
											placeholder="kg"
											defaultValue={exercise.sets[setIndex].weight === 0 ? "" : exercise.sets[setIndex].weight}
											onChange={(e) => {
												exercise.sets[setIndex].weight = parseInt(e.target.value);
											}}
										/>
										<span className="text-xs">Weights (kg)</span>
									</div>
									<div className="flex gap-1 items-center max-w-[23%]">
										<Input
											type="number"
											className="bg-base-200 input-sm text-end"
											placeholder="s"
											defaultValue={exercise.sets[setIndex].rest === 0 ? "" : exercise.sets[setIndex].rest}
											onChange={(e) => {
												exercise.sets[setIndex].rest = parseInt(e.target.value);
											}}
										/>
										<span className="text-xs">Rest (s)</span>
									</div>
									<Button type="button" className="btn-square btn-sm" onClick={() => remove(setIndex)}>
										X
									</Button>
								</div>
							))}
						</div>
						<Button type="button" onClick={() => push({ reps: 0, weight: 0, rest: 0 })}>
							+Set
						</Button>
					</>
				)}
			</FieldArray>
			<div className="flex items-center gap-1">
				<Field type="number" name={`exercises[${index}].rest`} className="input-sm text-end" placeholder="Rest After Exercise (s)" as={Input} />
				<span>Rest</span>
			</div>
		</div>
	);
};
