import { FC, InputHTMLAttributes } from "react";
import { Button } from "@/src/components/UI/Button/Button";
import { CreateExercise } from "src/components/user-workouts/user-workout-creator/create-exercise/CreateExercise";
import { Exercise, Workout } from "@/src/types/types";
import { Log, LogLevel } from "@/src/utils/helpers/debugLog";
import { Input } from "@/src/components/UI/Input/Input";
import { useRouter } from "next/navigation";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AddUserWorkout, GetUserID } from "@/src/utils/helpers/supabase";

interface CreateWorkoutProps extends InputHTMLAttributes<HTMLInputElement> {
	supabaseCallback: (id: string, workout: Workout) => void;
	initialValues: Workout; // Add this prop
}

const workoutSchema = Yup.object().shape({
	name: Yup.string().required("Workout name is required"),
	exercises: Yup.array().of(
		Yup.object().shape({
			name: Yup.string().required("Exercise name is required"),
			sets: Yup.array()
				.of(
					Yup.object().shape({
						// Define validation rules for sets if needed
					})
				)
				.required("At least one set is required"),
			rest: Yup.number().min(0, "Rest time must be a positive number").required("Rest time is required")
		})
	)
});

const CreateWorkoutForm: FC<CreateWorkoutProps> = ({ supabaseCallback, initialValues }) => {
	const router = useRouter();

	const handleSubmit = async (values: Workout) => {
		Log(LogLevel.DEBUG, `Workout updated:`, values);
		supabaseCallback((await GetUserID()) as string, values);
		router.back();
	};

	return (
		<Formik initialValues={initialValues} validationSchema={workoutSchema} onSubmit={handleSubmit}>
			{({ values, errors, touched, setFieldValue }) => (
				<Form>
					<div className="flex flex-col gap-4">
						<div className="flex gap-4">
							<Button type="button" onClick={() => router.back()}>
								Back
							</Button>
							<div className="form-control w-full">
								<Field
									type="text"
									name="name"
									className={`bg-base-200 ${touched.name && errors.name ? "input-error" : ""}`}
									placeholder="Workout name"
									as={Input}
								/>
								<div className="label">
									<span className="label-text-alt">{touched.name && errors.name && <div className="text-red-600">{errors.name}</div>}</span>
								</div>
							</div>
						</div>

						<FieldArray name="exercises">
							{({ push, remove }) => (
								<>
									{values.exercises.map((exercise, index) => (
										<div className="flex flex-col gap-4" key={index}>
											<CreateExercise
												exercise={exercise}
												deleteCallback={() => remove(index)}
												index={index}
												touched={touched}
												errors={errors}
											/>
										</div>
									))}
									<Button type="button" onClick={() => push({ name: "", sets: [], rest: 0 })}>
										Add new exercise
									</Button>
								</>
							)}
						</FieldArray>
						<Button type="submit">Log Workout</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export const CreateWorkout = CreateWorkoutForm;
