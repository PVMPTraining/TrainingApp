"use client";
import { FC, useRef, useState } from "react";

import { Field, Form, Formik } from "formik";

import { repCalculateFormSchema } from "@/src/utils/yup/RepCalculatorFormSchema";
import { FaInfoCircle } from "react-icons/fa";

type CalculatorResultTypes = {
	[key: number]: null | string;
};

type PrevValuesTypes = {
	weight: number;
	reps: number;
	unit: string;
};

const FitnessToolsPage: FC = () => {
	const prevValuesRef = useRef<PrevValuesTypes>({ weight: 0, reps: 0, unit: "" });

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

	const [isInformModalOpen, setIsInformModalOpen] = useState(false);

	const repCalculateFormulaHandler = (weight: number, reps: number, unit: string) => {
		// Check if the values are the same as the previous ones
		if (weight === prevValuesRef.current.weight && reps === prevValuesRef.current.reps && unit === prevValuesRef.current.unit) {
			return;
		}

		// Update the ref with the current values
		prevValuesRef.current = { weight, reps, unit };

		const oneRepMax = weight / (1.0278 - 0.0278 * reps);

		const calculateRepMax = (percentage: number) => oneRepMax * percentage;

		const calculateAndFormatResults = (unit: string, percentages: Record<number, number>) => {
			const results: Record<number, string> = {};

			for (const [repCount, percentage] of Object.entries(percentages)) {
				const repMax = calculateRepMax(percentage);
				results[Number(repCount)] = `${repMax.toFixed()} ${unit}`;
			}

			setCalculatorResult((prev) => ({ ...prev, ...results }));
		};

		const percentages = {
			1: 1,
			2: 0.97,
			3: 0.94,
			4: 0.92,
			5: 0.89,
			6: 0.86,
			7: 0.83,
			8: 0.81,
			9: 0.79,
			10: 0.77,
			11: 0.75,
			12: 0.73
		};

		if (unit === "metric") {
			calculateAndFormatResults("kg", percentages);
		}

		if (unit === "imperial") {
			calculateAndFormatResults("pounds", percentages);
		}
	};

	return (
		<>
			<div className="min-h-screen flex flex-col items-center justify-end relative">
				{isInformModalOpen ? (
					<div className="absolute flex flex-col gap-4 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white z-50 max-w-sm w-[350px] p-2 rounded-md">
						<button className="self-end text-xl bg-white rounded-full w-7 h-7 font-bold text-black" onClick={() => setIsInformModalOpen(false)}>
							X
						</button>
						<p>Remember, the calculator&apos;s results are just a starting point. It is always important to listen to your BODY.</p>
						<p>
							*The results of this calculator are only estimates and may not be accurate for everyone. Your actual 1RM may be higher or lower than
							the calculator predicts.
						</p>
						<p>
							The calculator does not take into account your individual factors, such as training experience, muscle fiber composition, and
							technique. These factors can significantly impact the accuracy of the calculator&apos;s predictions.
						</p>
						<p>
							The calculator&apos;s results are most accurate for compound exercises, such as squats, deadlifts, presses, and rows. For isolation
							exercises or exercises with unique movement patterns, the calculator&apos;s results may be less reliable.
						</p>
						<p>
							The calculator&apos;s results are most accurate for individuals with moderate levels of strength training experience. For beginners
							or individuals with very high levels of strength training experience, the calculator&apos;s results may be less accurate.
						</p>
					</div>
				) : null}
				{calculatorResult[1] ? (
					<table cellPadding={10} className="bg-black text-white mb-10">
						<thead className="border-b-2">
							<tr className="divide-x-2">
								<th>Reps</th>
								<th>Weight</th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(calculatorResult).map((rep) => (
								<tr key={rep} className="divide-x-2">
									<td className="border-b-2">{rep}</td>
									<td className="border-b-2">{calculatorResult[Number(rep)] !== null ? `${calculatorResult[Number(rep)]}` : "N/A"}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : null}
				<Formik
					initialValues={{
						unit: "metric",
						weightLiftedMetric: 0,
						weightLiftedImperial: 0,
						reps: 0
					}}
					validationSchema={repCalculateFormSchema}
					onSubmit={(values, actions) => {
						if (values.unit === "metric") repCalculateFormulaHandler(values.weightLiftedMetric, values.reps, "metric");
						if (values.unit === "imperial") repCalculateFormulaHandler(values.weightLiftedImperial, values.reps, "imperial");
					}}
				>
					{({ values, errors, handleChange, isValid }) => (
						<Form className="flex flex-col gap-5 items-center caret-transparent bg-black rounded-md p-2 text-white">
							<button className="self-start font-bold text-sm flex items-center gap-2" onClick={() => setIsInformModalOpen(true)}>
								Read warnings <FaInfoCircle />
							</button>
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
											value={values.weightLiftedMetric === 0 ? "" : values.weightLiftedMetric}
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
											value={values.weightLiftedImperial === 0 ? "" : values.weightLiftedImperial}
											onChange={handleChange}
											className="input text-black w-full pr-16"
										/>
										<p className="absolute select-none top-[50%] -translate-y-[50%] right-1 text-black">pounds</p>
									</div>
									<p className="">{errors.weightLiftedImperial}</p>
								</label>
							)}
							<label className="flex flex-col gap-1 max-w-xs w-72">
								<label className="font-bold">Performed reps (2-12)</label>
								<Field
									name="reps"
									type="number"
									placeholder="Performed reps"
									value={values.reps === 0 ? "" : values.reps}
									onChange={handleChange}
									className="input text-slate-950 w-full"
								/>
								<p>{errors.reps}</p>
							</label>
							<button
								type="submit"
								className={`${
									isValid ? "bg-[#27fe00] text-black font-bold hover:text-black btn-active" : "bg-red-600 text-white hover:bg-red-600"
								}  px-4 py-3 btn  border-none `}
							>
								Calculate
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default FitnessToolsPage;
