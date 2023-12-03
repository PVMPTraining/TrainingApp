"use client";
import { FC, useState } from "react";
import BodyFatCalculator from "@/src/components/body-fat/BodyFatCalculator";
import CalorieCalculator from "@/src/components/calorie-calculator/CalorieCalculator";
import Link from "next/link";
import { toolsFavoritesPagePath } from "@/src/pathmap/pathmap";

// CHANGE TO PAGE EVERY TOOL

const CalculatorsPage: FC = ({}) => {
	const [selectedCalculator, setSelectedCalculator] = useState<null | string>(null);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-col gap-10 pb-10">
				<Link href={toolsFavoritesPagePath} className="btn">
					Favorites
				</Link>
				<button className="btn" onClick={() => setSelectedCalculator("bodyFat")}>
					Body fat percentage calculator
				</button>
				<button className="btn" onClick={() => setSelectedCalculator("calorie")}>
					Calorie calculator
				</button>
			</div>
			{selectedCalculator === "calorie" ? <CalorieCalculator /> : <BodyFatCalculator />}
		</div>
	);
};

export default CalculatorsPage;
