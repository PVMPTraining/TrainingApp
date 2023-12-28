"use client";
import { FC } from "react";

// Next
import Link from "next/link";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { nutritionToolsPagePath } from "@/src/pathmap/pathmap";
import NavLayout from "@/src/layouts/NavLayout";
import CalorieGoalCard from "@/src/components/nutritionSegment/calorie/CalorieGoalCard";
import CalorieCalculator from "@/src/components/calorie-calculator/CalorieCalculator";

const NutritionPage: FC = () => {
	const router = useRouter();

	return (
		<NavLayout
			header={<div>Nutrition</div>}
			content={
				<div className="flex flex-col flex-grow gap-4">
					<CalorieGoalCard />
					<div className="flex items-center justify-around">
						<Link href={nutritionToolsPagePath} className="bg-red-500 w-40 h-40 rounded-md">
							Search foods
						</Link>
						<Link href={nutritionToolsPagePath} className="bg-red-500 w-40 h-40 rounded-md">
							Search foods
						</Link>
					</div>
				</div>
			}
		/>
	);
};

export default NutritionPage;
