"use client";
import { FC, useState } from "react";

// Next
import Link from "next/link";
import { Button } from "@/src/components/re-usable/Button/Button";

// Calculator structure

type CalculatorResultTypes = {
	[key: number]: null | number;
};

const FitnessToolsPage: FC = () => {
	const [calculatorResult, setCalculatorResult] = useState<CalculatorResultTypes>({
		1: null,
		2: null,
		4: null,
		6: null,
		8: null,
		10: null,
		12: null,
		16: null,
		20: null,
		24: null,
		30: null
	});

	function brzycki1RM(weight: number, reps: number) {
		const repPercentages = {
			1: 100,
			2: 95,
			4: 90,
			6: 85,
			8: 80,
			10: 75,
			12: 70,
			16: 65,
			20: 60,
			24: 55,
			30: 50
		};

		const oneRepMax = weight * (36 / (37 - reps));

		const twoRep = oneRepMax * 0.95;
		const fourRep = oneRepMax * 0.9;
		const sixRep = oneRepMax * 0.85;
		const eightRep = oneRepMax * 0.8;
		const tenRep = oneRepMax * 0.75;
		const twelveRep = oneRepMax * 0.7;
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

		setCalculatorResult((prev) => ({
			...prev,
			1: Math.trunc(oneRepMax),
			2: Math.trunc(twoRep),
			4: Math.trunc(fourRep),
			6: Math.trunc(sixRep),
			8: Math.trunc(eightRep),
			10: Math.trunc(tenRep),
			12: Math.trunc(twelveRep),
			16: Math.trunc(sixteenRep),
			20: Math.trunc(twentyRep),
			24: Math.trunc(twentyFourRep),
			30: Math.trunc(thirtyRep)
		}));
	}

	return (
		<>
			<div className="min-h-screen flex flex-col justify-end gap-4 p-8">
				Welcome to the Fitness section!
				<button onClick={() => brzycki1RM(90, 9)}>TEST</button>
			</div>
		</>
	);
};

export default FitnessToolsPage;
