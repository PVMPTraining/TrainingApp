"use client";
import { FC, useState } from "react";

import { Formik, Form, Field } from "formik";

import { CalorieCalculatorSchema } from "@/src/utils/yup/CalorieCalculatorSchema";

import { FaInfoCircle } from "react-icons/fa";

type FormDataTypes = {
	gender: string;
	age: number;
	unit: string;
	goal: string;
	activityLevel: string;
	weight: number;
	weightPound: number;
	height: number;
	heightFeet: number;
	heightInch: number;
};

type UserCalorieResultsTypes = {
	HarrisBenedict: null | string;
	MifflinStJeor: null | string;
};

interface CalorieCalculatorProps {}

const CalorieCalculator: FC<CalorieCalculatorProps> = ({}) => {
	const [userCalorieResults, setUserCalorieResults] = useState<UserCalorieResultsTypes>({
		HarrisBenedict: null,
		MifflinStJeor: null
	});

	const [openedCalorieCalculateMethodInfoModal, setOpenedCalorieCalculateMethodInfoModal] = useState({
		HarrisBenedictModal: false,
		MifflinStJeorModal: false
	});

	const HarrisBenedictEquationHandler = (values: FormDataTypes) => {
		let result: number | null = null;
		const multiplier =
			values.activityLevel === "sedentary"
				? 1.2
				: values.activityLevel === "lightly"
				? 1.375
				: values.activityLevel === "moderately"
				? 1.55
				: values.activityLevel === "veryActive"
				? 1.725
				: values.activityLevel === "extremely"
				? 1.9
				: 0;

		if (values.gender === "male") {
			let BMR = 0;

			if (values.unit === "metric") {
				BMR = 88.362 + 13.397 * values.weight + 4.799 * values.height - 5.677 * values.age;
				console.log(BMR);
			} else {
				const inches = values.heightFeet * 12 + values.heightInch;

				const weightInPounds = values.weightPound;

				BMR = 66.47 + 6.24 * values.weightPound + 12.7 * inches - 6.75 * values.age;
			}

			result = BMR * multiplier;
		}

		if (values.gender === "female") {
			let BMR = 0;

			if (values.unit === "metric") {
				BMR = 9.563 * values.weight + 1.85 * values.height - 4.676 * values.age + 655.1;
			} else {
				const inches = values.heightFeet * 12 + values.heightInch;

				const weightInPounds = values.weightPound;

				BMR = 655.1 + 4.35 * values.weightPound + 4.7 * inches - 4.7 * values.age;
			}

			result = BMR * multiplier;
		}

		const goalKeyword =
			values.goal === "maintain"
				? "maintain"
				: values.goal === "mildLoss"
				? "mild loss"
				: values.goal === "moderateLoss"
				? "moderate loss"
				: values.goal === "extremeLoss"
				? "extreme loss"
				: values.goal === "mildGain"
				? "mild gain"
				: values.goal === "moderateGain"
				? "moderate gain"
				: values.goal === "extremeGain"
				? "extreme gain"
				: "";

		const additionalCalorie =
			values.goal === "maintain"
				? 0
				: values.goal === "mildLoss"
				? -250
				: values.goal === "moderateLoss"
				? -500
				: values.goal === "extremeLoss"
				? -1000
				: values.goal === "mildGain"
				? +250
				: values.goal === "moderateGain"
				? +500
				: values.goal === "extremeGain"
				? +1000
				: 0;

		setUserCalorieResults((prev) => ({
			...prev,
			HarrisBenedict: `For ${goalKeyword} your weight:` + " " + (result! + additionalCalorie).toFixed()
		}));
	};

	// const MifflinStJeorEquationHandler = (values: FormDataTypes) => {
	// 	let result: number | null = null;
	// 	const multiplier =
	// 		values.activityLevel === "sedentary"
	// 			? 1.2
	// 			: values.activityLevel === "lightly"
	// 			? 1.375
	// 			: values.activityLevel === "moderately"
	// 			? 1.465
	// 			: values.activityLevel === "veryActive"
	// 			? 1.725
	// 			: values.activityLevel === "extremely"
	// 			? 1.9
	// 			: 0;

	// 	if (values.gender === "male") {
	// 		let BMR = 0;

	// 		if (values.unit === "metric") {
	// 			BMR = 10 * values.weight + 6.25 * values.height - 5 * values.age + 5;
	// 			console.log(BMR);
	// 		} else {
	// 			const inches = values.heightFeet * 12 + values.heightInch;

	// 			BMR = 10 * values.weightPound * 0.45359237 + 6.25 * inches * 2.54 - 5 * values.age + 5;
	// 		}

	// 		result = BMR * multiplier;
	// 	}

	// 	if (values.gender === "female") {
	// 		let BMR = 0;

	// 		if (values.unit === "metric") {
	// 			BMR = 10 * values.weight + 6.25 * values.height - 5 * values.age - 161;
	// 		} else {
	// 			const inches = values.heightFeet * 12 + values.heightInch;

	// 			BMR = 10 * values.weightPound * 0.45359237 + 6.25 * inches * 2.54 - 5 * values.age - 161;
	// 		}

	// 		result = BMR * multiplier;
	// 	}

	// 	// Refactor later

	// 	const goalKeyword =
	// 		values.goal === "maintain"
	// 			? "maintain"
	// 			: values.goal === "mildLoss"
	// 			? "mild loss"
	// 			: values.goal === "moderateLoss"
	// 			? "moderate loss"
	// 			: values.goal === "extremeLoss"
	// 			? "extreme loss"
	// 			: values.goal === "mildGain"
	// 			? "mild gain"
	// 			: values.goal === "moderateGain"
	// 			? "moderate gain"
	// 			: values.goal === "extremeGain"
	// 			? "extreme gain"
	// 			: "";

	// 	const additionalCalorie =
	// 		values.goal === "maintain"
	// 			? 0
	// 			: values.goal === "mildLoss"
	// 			? -250
	// 			: values.goal === "moderateLoss"
	// 			? -500
	// 			: values.goal === "extremeLoss"
	// 			? -1000
	// 			: values.goal === "mildGain"
	// 			? +250
	// 			: values.goal === "moderateGain"
	// 			? +500
	// 			: values.goal === "extremeGain"
	// 			? +1000
	// 			: 0;

	// 	setUserCalorieResults((prev) => ({
	// 		...prev,
	// 		MifflinStJeor: `For ${goalKeyword} your weight:` + " " + (result! + additionalCalorie).toFixed()
	// 	}));
	// };

	const methodInfoModalsToggleHandler = (modal: string) => {
		setOpenedCalorieCalculateMethodInfoModal((prev) => ({
			...prev,
			HarrisBenedictModal: modal === "HarrisBenedictModal",
			MifflinStJeorModal: modal === "MifflinStJeorModal"
		}));
	};

	const methodInfoModalsCloseModal = (modal: string) => {
		setOpenedCalorieCalculateMethodInfoModal((prev) => ({
			...prev,
			[modal]: false
		}));
	};

	//

	const macroValues = "";

	return (
		<div className="bg-slate-950 py-5 px-5 flex flex-col gap-5 items-center relative">
			<Formik
				initialValues={{
					gender: "",
					unit: "metric",
					goal: "maintain",
					showMacroValues: false,
					age: 0,
					activityLevel: "",
					weight: 0,
					weightPound: 0,
					height: 0,
					heightFeet: 0,
					heightInch: 0
				}}
				validationSchema={CalorieCalculatorSchema}
				onSubmit={(values, actions) => {
					HarrisBenedictEquationHandler(values);
					// MifflinStJeorEquationHandler(values);
				}}
			>
				{({ values, errors, handleChange }) => (
					<Form className="flex flex-col gap-5 items-center caret-transparent">
						<label className="flex flex-col items-center w-72 gap-3 max-w-xs">
							<p className="label text-white">Gender</p>
							<div className="flex items-center gap-5">
								<label className="flex items-center gap-3">
									<p className="text-white">Male</p>
									<Field
										name="gender"
										type="radio"
										value="male"
										checked={values.gender === "male"}
										onChange={handleChange}
										className="radio radio-md bg-white"
									/>
								</label>
								<label className="flex items-center gap-3">
									<p className="text-white">Female</p>
									<Field
										name="gender"
										type="radio"
										value="female"
										checked={values.gender === "female"}
										onChange={handleChange}
										className="radio radio-md bg-white"
									/>
								</label>
							</div>
							<p className="max-w-xs label-text-alt text-white">{errors.gender}</p>
						</label>
						<label className="flex flex-col gap-1 w-72 max-w-ws">
							<p className="label text-white">Age</p>
							<Field
								name="age"
								type="number"
								value={values.age}
								placeholder="Age"
								onChange={handleChange}
								className="input input-bordered w-full max-w-xs text-yellow-500 bg-slate-900 caret-current"
							/>
							<p className="max-w-xs label-text-alt text-white">{errors.age}</p>
						</label>
						<label className="flex flex-col gap-1 w-72 max-w-ws">
							<p className="label text-white">Weight</p>
							{values.unit === "us" ? (
								<>
									<div className="relative">
										<Field
											name="weightPound"
											type="number"
											value={values.weightPound}
											placeholder="Pounds"
											onChange={handleChange}
											className="input input-bordered w-full max-w-xs text-yellow-500 bg-slate-900 caret-current pr-16"
										/>
										<p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">pounds</p>
									</div>
									<p className="max-w-xs label-text-alt text-white">{errors.weightPound}</p>
								</>
							) : (
								<div className="relative">
									<Field
										name="weight"
										type="number"
										value={values.weight}
										placeholder="Weight"
										onChange={handleChange}
										className="input input-bordered w-full max-w-xs text-yellow-500 bg-slate-900 caret-current pr-7"
									/>
									<p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">kg</p>
								</div>
							)}
							<p className="max-w-xs label-text-alt text-white">{errors.weight}</p>
						</label>
						<label className="flex flex-col gap-1 w-72 max-w-xs">
							<p className="label text-white">Height</p>
							{values.unit === "us" ? (
								<div className="flex items-center">
									<div className="flex items-center gap-2">
										<div className="flex flex-col h-20">
											<div className="relative">
												<Field
													name="heightFeet"
													type="number"
													value={values.heightFeet}
													placeholder="Feet"
													onChange={handleChange}
													className="input input-bordered w-full max-w-xs text-yellow-500 bg-slate-900 caret-current pr-10"
												/>
												<p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">feet</p>
											</div>
											<p className="max-w-xs label-text-alt text-white">{errors.heightFeet}</p>
										</div>
										<div className="flex flex-col h-20">
											<div className="relative">
												<Field
													name="heightInch"
													type="number"
													value={values.heightInch}
													placeholder="Height"
													onChange={handleChange}
													className="input input-bordered w-full max-w-xs text-yellow-500 bg-slate-900 caret-current pr-14"
												/>
												<p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">inches</p>
											</div>
											<p className="max-w-xs label-text-alt text-white">{errors.heightInch}</p>
										</div>
									</div>
								</div>
							) : (
								<div className="relative">
									<Field
										name="height"
										type="number"
										value={values.height}
										placeholder="Height"
										onChange={handleChange}
										className="input input-bordered w-full max-w-xs text-yellow-500 bg-slate-900 caret-current pr-8"
									/>
									<p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">cm</p>
								</div>
							)}
							<p className="max-w-xs label-text-alt text-white">{errors.height}</p>
						</label>
						<label className="flex flex-col gap-1 w-72">
							<label className="label">
								<span className="text-white flex items-center gap-2">
									Select activity level{" "}
									<button>
										<FaInfoCircle className="text-lg" />
									</button>
								</span>
								{/* <span className="label-text-alt">Alt label</span> */}
							</label>
							<Field
								id="activityLevel"
								name="activityLevel"
								as="select"
								onChange={handleChange}
								className="select select-md text-yellow-500 bg-slate-900"
							>
								<option disabled value="">
									Select one
								</option>
								<option value="sedentary">Sedentary: Minimal physical activity</option>
								<option value="lightly">Lightly Active: Occasional physical activity</option>
								<option value="moderately">Moderately Active: Regular physical activity</option>
								<option value="veryActive">Very Active: High levels of physical activity</option>
								<option value="extremely">Extremely Active: Intense physical activity and/or physically demanding job</option>
							</Field>
							{/* <div>
								<option value="sedentary">
									Sedentary: Spending most of the day sitting or lying down, engaging in very little physical activity.
								</option>
								<option value="lightly">
									Lightly Active: Engaging in some physical activity, but not enough to meet the recommended guidelines, walking or biking for
									short periods each day, participating in light-intensity exercise for 1-3 days per week.
								</option>
								<option value="moderately">
									Moderately Active: Engaging in regular physical activity that meets the recommended guidelines, walking for at least 30
									minutes most days of the week, participating in moderate-intensity exercise for at least 150 minutes per week.
								</option>
								<option value="veryActive">
									Very Active: Engaging in a high level of physical activity, participating in vigorous-intensity exercise for at least 75
									minutes per week, engaging in strength-training exercises that work all major muscle groups at least twice per week.
								</option>
								<option value="extremely">
									Extremely Active: Engaging in an extremely high level of physical activity, participating in vigorous-intensity exercise for
									more than 150 minutes per week, engaging in strength-training exercises that work all major muscle groups more than twice
									per week, having a physically demanding job or engaging in two-a-day training sessions.
								</option>
							</div> */}
							<p className="max-w-xs label-text-alt text-white">{errors.activityLevel}</p>
							{/* <div className="flex flex-col gap-1 text-xs text-white">
								<p>Exercise: 15-30 minutes of elevated heart rate activity.</p>
								<p>Intense exercise: 45-120 minutes of elevated heart rate activity.</p>
								<p>Very intense exercise: 2+ hours of elevated heart rate activity.</p>
							</div> */}
						</label>
						<label className="flex flex-col items-center w-72 gap-3 max-w-xs">
							<p className="text-white label">Optional choices</p>
							<label className="flex flex-col gap-1 w-72">
								<label className="label flex-col gap-2">
									<span className="text-white self-start flex items-center gap-2">
										Body fat percentage{" "}
										<button>
											<FaInfoCircle className="text-lg" />
										</button>
									</span>
									<span className="text-white self-start text-xs">
										<button className="self-start">Click and learn your body fat percentage</button>
									</span>
									<Field
										name=""
										type="number"
										value={values.age}
										placeholder="Body fat"
										onChange={handleChange}
										className="input input-bordered w-full max-w-xs text-yellow-500 bg-slate-900 caret-current"
									/>
									{/* <span className="label-text-alt">Alt label</span> */}
								</label>
							</label>
							<label className="flex flex-col gap-1 w-72">
								<label className="label flex-col gap-2">
									<span className="text-white self-start">Select your goal</span>
									<span className="text-white self-start text-xs">
										It's selected <strong>maintain</strong> as default
									</span>
									{/* <span className="label-text-alt">Alt label</span> */}
								</label>
								<Field
									id="goal"
									name="goal"
									as="select"
									onChange={handleChange}
									className="select select-md text-yellow-500 bg-slate-900 w-72 max-w-xs"
								>
									<option value="maintain" selected>
										Maintain weight
									</option>
									<option value="mildLoss">Mild weight loss of 0.25kg (0.5 lb) per week</option>
									<option value="moderateLoss">Moderate weight loss of 0.5kg (1 lb) per week</option>
									<option value="extremeLoss">Extreme weight loss of 1kg (2 lb) per week</option>
									<option value="mildGain">Mild weight gain of 0.25kg (0.5 lb) per week</option>
									<option value="moderateGain">Moderate weight gain of 0.5kg (1 lb) per week</option>
									<option value="extremeGain">Extreme weight gain of 1kg (2 lb) per week</option>
								</Field>
								<p className="max-w-xs label-text-alt text-white">{errors.goal}</p>
							</label>
							<div className="flex items-center gap-5">
								<label className="flex items-center gap-3">
									<Field
										name="showMacroValues"
										type="checkbox"
										value="showMacroValues"
										checked={values.showMacroValues}
										onChange={handleChange}
										className="radio radio-md bg-white"
									/>
									<p className="text-white">I want to build muscle</p>
								</label>
							</div>
							<div className="flex items-center gap-5">
								<label className="flex items-center gap-3">
									<Field
										name="showMacroValues"
										type="checkbox"
										value="showMacroValues"
										checked={values.showMacroValues}
										onChange={handleChange}
										className="radio radio-md bg-white"
									/>
									<p className="text-white">Give me estimated macro values</p>
								</label>
							</div>
						</label>
						<button type="submit" className="bg-slate-900 px-4 py-3 text-white hover:text-black btn btn-active">
							Calculate
						</button>
					</Form>
				)}
			</Formik>
			{/* <div className="absolute flex flex-col top-[70%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-white w-96 h-48 p-4 rounded-md">
				<button className="self-end" onClick={() => methodInfoModalsCloseModal("HarrisBenedictModal")}>
					X
				</button>
				If you give us your body fat percentage we'll use another method to calculate your calorie goal which is more accurate than regular one.
			</div> */}
			{userCalorieResults.HarrisBenedict ? (
				<div className="text-white flex gap-10 items-center caret-transparent">
					<div className="flex flex-col items-center">
						<p className="flex items-center gap-2">
							Your daily calorie goal
							<button onClick={() => methodInfoModalsToggleHandler("HarrisBenedictModal")}>
								<FaInfoCircle className="text-lg" />
							</button>
						</p>
						<span>{userCalorieResults.HarrisBenedict}</span>
					</div>
					{/* <div className="flex flex-col items-center">
						<p className="flex items-center gap-2">
							Mifflin and St Jeor Method{" "}
							<button onClick={() => methodInfoModalsToggleHandler("MifflinStJeorModal")}>
								<FaInfoCircle className="text-lg" />
							</button>
						</p>
						<span>{userCalorieResults.MifflinStJeor}</span>
					</div> */}
				</div>
			) : null}
			{openedCalorieCalculateMethodInfoModal.HarrisBenedictModal ? (
				<div className="absolute flex flex-col top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-white w-96 h-96 p-4 rounded-md">
					<button className="self-end" onClick={() => methodInfoModalsCloseModal("HarrisBenedictModal")}>
						X
					</button>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ad animi nisi veritatis corrupti earum rem, qui facilis sequi illum assumenda
					aspernatur id, obcaecati suscipit ex libero, recusandae officiis sapiente!
				</div>
			) : openedCalorieCalculateMethodInfoModal.MifflinStJeorModal ? (
				<div className="absolute flex flex-col top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-white w-96 h-96 p-4 rounded-md">
					<button className="self-end" onClick={() => methodInfoModalsCloseModal("MifflinStJeorModal")}>
						X
					</button>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias mollitia deserunt consequuntur placeat, sapiente impedit vitae praesentium
					dolore consectetur. Delectus fugit omnis officiis at! Similique quis eligendi ex exercitationem atque!
				</div>
			) : null}
		</div>
	);
};

export default CalorieCalculator;
