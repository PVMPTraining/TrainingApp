"use client";
import { FC, useState } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { VisualMuscleSelector } from "@/src/components/visual-muscle-selector/VisualMuscleSelector";
import { Toggle } from "@/src/components/UI/Toggle/Toggle";
import { Button } from "@/src/components/UI/Button/Button";

const HomePage: FC = () => {
	const test = ["pectoralis_sternal_head", "pectoralis_calvicular_head", "lower_pectoralis"];
	const [selectedMuscles, setSelectedMuscles] = useState<string[]>(test);

	return (
		<NavLayout
			header={<div>Home</div>}
			content={
				<div className="flex-grow flex flex-col m-4">
					<VisualMuscleSelector
						value={selectedMuscles}
						selectedMusclesCallback={function (selectedMuscles: string[]): void {
							console.log(selectedMuscles);
						}}
					></VisualMuscleSelector>
					<Button
						onClick={() => {
							if (selectedMuscles.includes("pectoralis_sternal_head")) {
								setSelectedMuscles((prevValue) => prevValue.filter((muscle) => muscle !== "pectoralis_sternal_head"));
							} else {
								setSelectedMuscles((prevValue) => [...prevValue, "pectoralis_sternal_head"]);
							}
						}}
					>
						pectoralis_sternal_head
					</Button>
					<Button
						onClick={() => {
							console.log(selectedMuscles);
						}}
					>
						Test
					</Button>
					<Button>pectoralis_calvicular_head</Button>
					<Button>lower_pectoralis</Button>
				</div>
			}
		/>
	);
};

export default HomePage;
