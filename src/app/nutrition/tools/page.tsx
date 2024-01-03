"use client";
import { FC } from "react";

import FoodSearcher from "@/src/components/FoodSearcher/FoodSearcher";
import NavLayout from "@/src/layouts/NavLayout";

const NutritionToolsPage: FC = () => {
	return (
		<NavLayout
			header={<div>Food Searcher</div>}
			content={
				<div className="flex flex-col items-center w-full gap-4">
					<FoodSearcher />
				</div>
			}
		></NavLayout>
	);
};

export default NutritionToolsPage;
