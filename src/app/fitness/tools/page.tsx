"use client";
import { FC, useState } from "react";

// Next
import { Field, Form, Formik } from "formik";
import { repCalculateFormSchema } from "@/src/utils/yup/RepCalculatorFormSchema";

// Need to fix errors + refactor + design

type CalculatorResultTypes = {
	[key: number]: null | string;
};

const FitnessToolsPage: FC = () => {
	const [calculatorResult, setCalculatorResult] = useState<CalculatorResultTypes>({
		1: null,
		2: null,
		3: null,
		4: null,
		5: null,
		6: null,
		7: null,
		8: null,
		9: null,
		10: null,
		11: null,
		12: null
	});

	function brzycki1RM(weight: number, reps: number, unit: string) {
		// const repPercentages = {
		// 	1: 100,
		// 	2: 95,
		// 	4: 90,
		// 	6: 85,
		// 	8: 80,
		// 	10: 75,
		// 	12: 70,
		// 	16: 65,
		// 	20: 60,
		// 	24: 55,
		// 	30: 50
		// };

		const oneRepMax = (weight as number) / (1.0278 - 0.0278 * reps);
		// const oneRepMax = weight * (36 / (37 - reps));
		// const oneRepMax = weight * (1 + reps / 30);

		const twoRep = oneRepMax * 0.97;
		const threeRep = oneRepMax * 0.94;
		const fourRep = oneRepMax * 0.92;
		const fiveRep = oneRepMax * 0.89;
		const sixRep = oneRepMax * 0.86;
		const sevenRep = oneRepMax * 0.83;
		const eightRep = oneRepMax * 0.81;
		const nineRep = oneRepMax * 0.79;
		const tenRep = oneRepMax * 0.77;
		const elevenRep = oneRepMax * 0.75;
		const twelveRep = oneRepMax * 0.73;
		const sixteenRep = oneRepMax * 0.65;
		const twentyRep = oneRepMax * 0.6;
		const twentyFourRep = oneRepMax * 0.55;
		const thirtyRep = oneRepMax * 0.5;

		// const repResults = Object.keys(repPercentages).reduce((acc, currentReps) => {
		// 	const repCount = Number(currentReps);
		// 	const repPercentage = repPercentages[repCount];
		// 	const repMax = oneRepMax * repPercentage;
		// 	acc[repCount] = repMax.toFixed();
		// 	return acc;
		// }, {});

		if (unit === "metric") {
			setCalculatorResult((prev) => ({
				...prev,
				1: oneRepMax.toFixed() + " kg",
				2: twoRep.toFixed() + " kg",
				3: threeRep.toFixed() + " kg",
				4: fourRep.toFixed() + " kg",
				5: fiveRep.toFixed() + " kg",
				6: sixRep.toFixed() + " kg",
				7: sevenRep.toFixed() + " kg",
				8: eightRep.toFixed() + " kg",
				9: nineRep.toFixed() + " kg",
				10: tenRep.toFixed() + " kg",
				11: elevenRep.toFixed() + " kg",
				12: twelveRep.toFixed() + " kg"
				// 16: sixteenRep,
				// 20: twentyRep,
				// 24: twentyFourRep,
				// 30: thirtyRep
			}));
		}

		if (unit === "imperial") {
			setCalculatorResult((prev) => ({
				...prev,
				1: oneRepMax.toFixed() + " pounds",
				2: twoRep.toFixed() + " pounds",
				3: threeRep.toFixed() + " pounds",
				4: fourRep.toFixed() + " pounds",
				5: fiveRep.toFixed() + " pounds",
				6: sixRep.toFixed() + " pounds",
				7: sevenRep.toFixed() + " pounds",
				8: eightRep.toFixed() + " pounds",
				9: nineRep.toFixed() + " pounds",
				10: tenRep.toFixed() + " pounds",
				11: elevenRep.toFixed() + " pounds",
				12: twelveRep.toFixed() + " pounds"
				// 16: sixteenRep,
				// 20: twentyRep,
				// 24: twentyFourRep,
				// 30: thirtyRep
			}));
		}
	}

	return (
		<>
			<div className="min-h-screen flex flex-col items-center justify-end gap-4 p-8">
				Welcome to the Fitness section!
				{/* <p>
					The results of this calculator are only estimates and may not be accurate for everyone. Your actual 1RM may be higher or lower than the
					calculator predicts.
				</p>
				<p>
					The calculator does not take into account your individual factors, such as training experience, muscle fiber composition, and technique.
					These factors can significantly impact the accuracy of the calculator's predictions.
				</p>
				<p>
					The calculator's results are most accurate for compound exercises, such as squats, deadlifts, presses, and rows. For isolation exercises or
					exercises with unique movement patterns, the calculator's results may be less reliable.
				</p>
				<p>
					The calculator's results are most accurate for individuals with moderate levels of strength training experience. For beginners or
					individuals with very high levels of strength training experience, the calculator's results may be less accurate.
				</p>
				<p>Remember, the calculator's results are just a starting point. It is always important to listen to your BODY</p> */}
				<Formik
					initialValues={{
						unit: "metric",
						weightLiftedMetric: "",
						weightLiftedImperial: "",
						reps: ""
					}}
					validationSchema={repCalculateFormSchema}
					onSubmit={(values, actions) => {
						if (values.unit === "metric") brzycki1RM(values.weightLiftedMetric, values.reps, "metric");
						if (values.unit === "imperial") brzycki1RM(values.weightLiftedImperial, values.reps, "imperial");
					}}
				>
					{({ values, errors, handleChange }) => (
						<Form className="flex flex-col gap-5 items-center caret-transparent bg-black rounded-md p-2 text-white">
							<label className="flex flex-col items-center w-72 gap-3 max-w-xs">
								<p className="label font-bold">Unit</p>
								<div className="flex items-center gap-5">
									<label className="flex items-center gap-3">
										<p className="">Metric</p>
										<Field
											name="unit"
											type="radio"
											value="metric"
											checked={values.unit === "metric"}
											onChange={handleChange}
											className="radio radio-md bg-white"
										/>
									</label>
									<label className="flex items-center gap-3">
										<p className="">Imperial</p>
										<Field
											name="unit"
											type="radio"
											value="imperial"
											checked={values.unit === "imperial"}
											onChange={handleChange}
											className="radio radio-md bg-white"
										/>
									</label>
								</div>
								<p className="max-w-xs label-text-alt text-white">{errors.unit}</p>
							</label>
							{values.unit === "metric" ? (
								<label className="max-w-xs w-72 flex flex-col gap-1">
									<label className="font-bold">Lifted weight</label>
									<div className="relative">
										<Field
											name="weightLiftedMetric"
											type="number"
											placeholder="Lifted weight"
											value={values.weightLiftedMetric}
											onChange={handleChange}
											className="input text-black w-full pr-7"
										/>
										<p className="absolute select-none top-[50%] -translate-y-[50%] right-1 text-black">kg</p>
									</div>
									<p className="">{errors.weightLiftedMetric}</p>
								</label>
							) : (
								<label className="max-w-xs w-72 flex flex-col gap-1">
									<label className="font-bold">Lifted weight</label>
									<div className="relative">
										<Field
											name="weightLiftedImperial"
											type="number"
											placeholder="Lifted weight"
											value={values.weightLiftedImperial}
											onChange={handleChange}
											className="input  placeholder:text-black text-black w-full pr-16"
										/>
										<p className="absolute select-none top-[50%] -translate-y-[50%] right-1 text-black">pounds</p>
									</div>
									<p className="">{errors.weightLiftedImperial}</p>
								</label>
							)}
							<label className="flex flex-col gap-1 max-w-xs w-72">
								<label className="font-bold">Performed reps (2-10)</label>
								<Field
									name="reps"
									type="number"
									placeholder="Performed reps"
									value={values.reps}
									onChange={handleChange}
									className="input placeholder:text-black text-slate-950 w-full"
								/>
								<p>{errors.reps}</p>
							</label>
							<button type="submit" className="bg-[#27fe00] px-4 py-3 text-black font-bold hover:text-black btn border-none btn-active">
								Calculate
							</button>
						</Form>
					)}
				</Formik>
				<table cellPadding={10} className="caret-transparent">
					<thead>
						<tr>
							<th>Reps</th>
							{Object.entries(calculatorResult).map(([index, result]) => (
								<th key={index}>{index}</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr className="">
							<td className="font-bold">Weight</td>
							{Object.entries(calculatorResult).map(([index, result]) => (
								<td key={index}>{result}</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default FitnessToolsPage;
