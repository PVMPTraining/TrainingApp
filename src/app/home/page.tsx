"use client";
import { FC } from "react";

// Next
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { fitnessHomePagePath, nutritionHomePagePath } from "@/src/pathmap/pathmap";

const HomePage: FC = () => {
	const router = useRouter();

	return (
		<>
			<div className="min-h-screen flex flex-col justify-end gap-4 p-8">
				<Button
					onClick={() => {
						router.push(fitnessHomePagePath);
					}}
				>
					FITNESS
				</Button>
				<Button
					onClick={() => {
						router.push(nutritionHomePagePath);
					}}
				>
					NUTRITION
				</Button>
			</div>
		</>
	);
};

export default HomePage;
