"use client";
import { FC } from "react";

// Next
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { fitnessHomePagePath, nutritionHomePagePath } from "@/src/pathmap/pathmap";
import NavLayout from "@/src/layouts/NavLayout";

const HomePage: FC = () => {
	const router = useRouter();

	return (
		<NavLayout>
			<div className="flex-grow flex flex-col gap-2 justify-end p-8">
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
		</NavLayout>
	);
};

export default HomePage;
