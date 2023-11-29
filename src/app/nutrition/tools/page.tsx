"use client";
import { FC } from "react";

// Next
import Link from "next/link";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/UI/Input/Input";

import FoodSearcher from "@/src/components/foodSearcher/FoodSearcher";

const NutritionToolsPage: FC = () => {
	const router = useRouter();

	return (
		<>
			<div className="min-h-screen flex flex-col justify-end gap-4 p-8">
				<FoodSearcher />
			</div>
		</>
	);
};

export default NutritionToolsPage;
