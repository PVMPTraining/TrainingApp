import * as yup from "yup";

export const repCalculateFormSchema = yup.object({
	unit: yup.string(),
	weightLiftedMetric: yup.number().when("unit", {
		is: "metric",
		then: yup
			.number()
			.min(1, "Please enter a number equal or higher than 1")
			.max(900, "Please enter a number equal or lesser than 900")
			.required("Please fill lifted weight area"),
		otherwise: yup.number()
	}),
	weightLiftedImperial: yup.number().when("unit", {
		is: "imperial",
		then: yup
			.number()
			.min(1, "Please enter a number equal or higher than 1")
			.max(2700, "Please enter a number equal or lesser than 2700")
			.required("Please fill lifted weight area"),
		otherwise: yup.number()
	}),
	reps: yup
		.number()
		.min(2, "Please enter a number equal or higher than 2")
		.max(12, "Please enter a number equal or lesser than 12")
		.required("Please fill reps area")
});
