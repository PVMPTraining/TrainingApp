"use client";
import { FC } from "react";

// Next
import Link from "next/link";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { nutritionToolsPagePath } from "@/src/pathmap/pathmap";

const NutritionPage: FC = () => {
	const router = useRouter();

	return (
		<>
			<div className="min-h-screen flex flex-col justify-end gap-4 p-8">
				NUTRITION
				<Link href={nutritionToolsPagePath}>Search foods</Link>
			</div>
		</>
	);
};

export default NutritionPage;
