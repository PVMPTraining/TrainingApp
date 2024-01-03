"use client";
import { FC } from "react";

// Next
import Link from "next/link";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { nutritionToolsPagePath } from "@/src/pathmap/pathmap";
import NavLayout from "@/src/layouts/NavLayout";
import CalorieGoalCard from "@/src/components/NutritionSegment/Calorie/CalorieGoalCard";
import MacroGoalCard from "@/src/components/NutritionSegment/Macros/MacroGoalCard";

const NutritionPage: FC = () => {
	const router = useRouter();

	return (
		<NavLayout
			header={<div>Nutrition</div>}
			content={
				<div className="flex flex-col flex-grow gap-4">
					<p className="font-bold text-sm p-2">Change layout</p>
					<div className="flex items-center justify-between p-2">
						<p>TODAY</p>
						<Button className="text-white">Change day</Button>
					</div>
					<CalorieGoalCard />
					<MacroGoalCard />
					<div className="flex items-center justify-around">
						<Link href={nutritionToolsPagePath} className="bg-red-500 w-40 h-40 rounded-md">
							Search foods
						</Link>
						<Link href={nutritionToolsPagePath} className="bg-red-500 w-40 h-40 rounded-md">
							X
						</Link>
					</div>
				</div>
			}
		/>
	);
};

export default NutritionPage;
