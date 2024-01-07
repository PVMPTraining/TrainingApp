// React and Next
import { FC } from "react";
import { useRouter } from "next/navigation";

// Utilities
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";
import { concatClassName } from "@/src/utils/helpers/functions";

// UI Comonents
import { Section } from "@/src/components/UI/Section/Section";
import { Button } from "@/src/components/UI/Button/Button";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { Input } from "@/src/components/UI/Input/Input";

// Paths
import { liveWorkoutPagePath } from "@/src/pathmap/pathmap";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { Workout } from "@/src/types/fitnessTypes";

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Workout name is required")
});

export const LiveWorkoutStartNewModal: FC = (): JSX.Element => {
	const strings = useLocalizedStrings();
	const router = useRouter();

	const formik = useFormik<Workout>({
		initialValues: {
			name: "",
			exercises: [{ name: "", sets: [{ reps: 0, weight: 0, rest: 0 }], rest: 0 }]
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				console.log(values);
				router.push(`${liveWorkoutPagePath}?workout=${JSON.stringify(formik.values)}`);
			} catch (error) {
				console.error("Sign-in error:", error);
			}
		}
	});

	return (
		<Section header={strings.LiveWorkoutStartNewModal.header}>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
				<Labels
					input={
						<Input
							className={concatClassName("bg-base-300", formik.touched.name && formik.errors.name ? "input-error" : "")}
							onChange={formik.handleChange}
							name="name"
							placeholder={strings.LiveWorkoutStartNewModal.inputPlaceholder}
							value={formik.values.name}
						/>
					}
					bottomLeftLabel={formik.touched.name && formik.errors.name && <div className="text-red-600">{formik.errors.name}</div>}
				/>
				<Button type="submit">{strings.LiveWorkoutStartNewModal.buttons.start}</Button>
			</form>
		</Section>
	);
};
