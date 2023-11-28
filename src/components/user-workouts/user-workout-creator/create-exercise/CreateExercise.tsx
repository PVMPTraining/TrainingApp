import { FC, InputHTMLAttributes } from "react";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { Field, FieldArray } from "formik"; // Import Field and FieldArray from Formik
import { Exercise, Workout } from "@/src/types/types";

interface CreateExerciseProps extends InputHTMLAttributes<HTMLInputElement> {
	deleteCallback: () => void;
	exercise: Exercise; // Add this prop
	index: number;
}

export const CreateExercise: FC<CreateExerciseProps> = ({ deleteCallback, exercise, index }) => {
	return (
		<div className="flex flex-col gap-4 p-4 rounded bg-base-300">
			<div className="flex gap-2">
				<Field type="text" name={`exercises[${index}].name`} className="w-full bg-base-200" placeholder="Exercise name" as={Input} />
				<Button onClick={deleteCallback}>X</Button>
			</div>
			<FieldArray name={`exercises[${index}].sets`}>
				{({ push, remove }) => (
					<>
						<div className="flex flex-col gap-4">
							{exercise.sets.map((set, setIndex) => (
								<div key={setIndex} className="flex gap-4 items-center max-w-screen justify-center">
									<div className="flex gap-1 items-center max-w-[37%]">
										<Field
											type="number"
											name={`exercises[${index}].sets[${setIndex}].reps`}
											className="bg-base-200 input-sm text-end"
											placeholder="Reps"
											as={Input}
										/>
										<span className="text-xs">Reps</span>
									</div>
									<div className="flex gap-1 items-center max-w-[30%]">
										<Field
											type="number"
											name={`exercises[${index}].sets[${setIndex}].weight`}
											className="bg-base-200 input-sm text-end"
											placeholder="kg"
											as={Input}
										/>
										<span className="text-xs">Weights (kg)</span>
									</div>
									<div className="flex gap-1 items-center max-w-[23%]">
										<Field
											type="number"
											name={`exercises[${index}].sets[${setIndex}].rest`}
											className="bg-base-200 input-sm text-end"
											placeholder="s"
											as={Input}
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
