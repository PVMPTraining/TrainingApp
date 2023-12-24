"use client";
import { FC } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { VisualMuscleSelector } from "@/src/components/visual-muscle-selector/VisualMuscleSelector";

const HomePage: FC = () => {
	return (
		<NavLayout
			header={<div>Home</div>}
			content={
				<div className="flex-grow flex flex-col m-4">
					<VisualMuscleSelector selectedMusclesCallback={function (selectedMuscles: string[]): void {}}></VisualMuscleSelector>
				</div>
			}
		/>
	);
};

export default HomePage;
