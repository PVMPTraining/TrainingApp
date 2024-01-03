import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { enumStringArray } from "@/src/utils/helpers/functions";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { Button } from "@/src/components/UI/Button/Button";
import { FaChevronDown } from "react-icons/fa";
import { Toggle } from "@/src/components/UI/Toggle/Toggle";
import { VisualMuscleSelector } from "@/src/components/visual-muscle-selector/VisualMuscleSelector";
import { MUSCLE } from "@/src/types/supabase/exerciseData";

interface FilterVisualMuscleSelectorProps extends HTMLAttributes<HTMLElement> {
	onChangeCallback: (selectedMuscles: string[]) => void;
}

export const FilterVisualMuscleSelector: FC<FilterVisualMuscleSelectorProps> = ({ onChangeCallback }) => {
	const [musclesFilterOpen, setMusclesFilterOpen] = useState<boolean>(false);
	const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
	const [visualView, setVisualView] = useState<boolean>(true);

	useEffect(() => {
		onChangeCallback(selectedMuscles);
	}, [selectedMuscles]);

	return (
		<div className="bg-base-200 rounded-b-lg">
			<div className="flex flex-col gap-4">
				<Labels
					topLeftLabel="Muscles"
					topRightLabel={
						<Button
							type="button"
							onClick={() => {
								setMusclesFilterOpen((prevValue) => !prevValue);
							}}
							className="btn-xs"
						>
							{!musclesFilterOpen && <FaChevronDown />}
							{musclesFilterOpen && <FaChevronDown className="transform rotate-180" />}
						</Button>
					}
					input={
						<>
							{musclesFilterOpen && (
								<>
									<div className="flex items-center gap-2 mx-auto">
										List
										<Toggle
											checked={visualView}
											onChange={() => {
												setVisualView((prevValue) => !prevValue);
											}}
										/>
										Visual
									</div>
									{!visualView && (
										<div className="grid grid-cols-1 xs:grid-cols-2 gap-1 m-2">
											{enumStringArray(MUSCLE).map((muscle, i) => (
												<div key={i} className="flex items-center gap-2 justify-start">
													<input
														onChange={() => {
															if (selectedMuscles.includes(muscle)) {
																setSelectedMuscles((prevValue) => prevValue.filter((muscleName) => muscleName !== muscle));
															} else {
																setSelectedMuscles((prevValue) => [...prevValue, muscle]);
															}
														}}
														checked={selectedMuscles.includes(muscle)}
														type="checkbox"
														className="checkbox"
													/>
													<div className="text-xs">
														{muscle
															.split("_")
															.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
															.join(" ")}
													</div>
												</div>
											))}
										</div>
									)}
									{visualView && (
										<VisualMuscleSelector value={selectedMuscles} selectedMusclesCallback={setSelectedMuscles}></VisualMuscleSelector>
									)}
								</>
							)}
						</>
					}
				/>
			</div>
		</div>
	);
};
