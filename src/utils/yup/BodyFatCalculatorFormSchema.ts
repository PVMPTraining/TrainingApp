import * as yup from "yup";

export const bodyFatCalculateFormSchema = yup.object({
	gender: yup.string().required("Gender is required"),
	age: yup.number().min(1, "Please enter a number greater than 0").max(123, "Please enter a number less than or equal to 123").required("Age is required"),
	measurements: yup.lazy((obj) =>
		yup.object({
			weight: yup
				.number()
				.min(2, "Please enter a number greater than 1")
				.max(638, "Please enter a number less than or equal to 638")
				.required("Weight is required"),
			height: yup
				.number()
				.min(54, "Please enter a number greater than 53")
				.max(272, "Please enter a number less than or equal to 272")
				.required("Height is required"),
			waist: yup
				.number()
				.min(33, "Please enter a number greater than 32")
				.max(302, "Please enter a number less than or equal to 302")
				.required("Waist is required"),
			neck: yup
				.number()
				.min(13, "Please enter a number greater than 12")
				.max(86, "Please enter a number less than or equal to 86")
				.required("Neck is required"),
			hip:
				obj.gender === "female"
					? yup
							.number()
							.min(38, "Please enter a number greater than 37")
							.max(240, "Please enter a number less than or equal to 239")
							.required("Hip is required for females")
					: yup.number()
		})
	)
});
