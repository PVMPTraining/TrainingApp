"use client";

import { FC, useEffect, useState } from "react";
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { Exercise } from "@/src/components/exercise/exercise";
import { EXERCISE_TYPE, ExerciseData, MANDATORY_EQUIPMENT } from "@/src/types/supabaseDataTypes";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import { VisualMuscleSelector } from "@/src/components/visual-muscle-selector/VisualMuscleSelector";
import { Toggle } from "@/src/components/UI/Toggle/Toggle";
import { FilterType, Filters } from "@/src/components/filter/Filters";
import NavLayout from "@/src/layouts/NavLayout";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { SearchBar } from "@/src/components/search-bar/SearchBar";
import { enumStringArray } from "@/src/utils/helpers/functions";

const muscleList = [
	"bicep_long_head",
	"bicep_short_head",
	"upper_abs",
	"lower_abs",
	"pectoralis_sternal_head",
	"pectoralis_calvicular_head",
	"lower_pectoralis",
	"deltoid_lateral",
	"deltoid_anterior",
	"upper_trapezius",
	"neck",
	"outer_quadricep",
	"inner_quadricep",
	"rectus_femoris",
	"inner_thigh",
	"tibialis",
	"soleus",
	"gastrocnemius",
	"wrist_extensors",
	"wrist_flexors",
	"hands",
	"obliques"
];

const filterOptions = [
	{ topLeftLabel: "Exercise Type", options: EXERCISE_TYPE, dataKey: "exercise_type", type: FilterType.Checkbox },
	{ topLeftLabel: "Required Equipment", options: MANDATORY_EQUIPMENT, dataKey: "mandatory_equipment", type: FilterType.Checkbox }
];

const ExercisesPage: FC = () => {
	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	// State to control whether the modal is open or not
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFilterSelectionOpen, setIsFilterSelectionOpen] = useState(false);
	const [selected, setExercise] = useState<ExerciseData>({} as ExerciseData);

	const [filteredExercises, setFilteredExercises] = useState<ExerciseData[]>(exercises);
	const [finalFilteredExercises, setFinalFilteredExercises] = useState<ExerciseData[]>(exercises);
	const [exercisesSearchResults, setExercisesSearchResults] = useState<ExerciseData[]>(exercises);

	const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
	const [musclesFilterOpen, setMusclesFilterOpen] = useState<boolean>(false);

	const [visualView, setVisualView] = useState<boolean>(true);

	useEffect(() => {
		setFinalFilteredExercises(
			filteredExercises.filter((exercise: ExerciseData) => {
				if (selectedMuscles.length === 0) return true;

				return selectedMuscles.some((muscle) => {
					return exercise.primary_muscles?.includes(muscle) || exercise.secondary_muscles?.includes(muscle);
				});
			})
		);
	}, [selectedMuscles, filteredExercises]);

	useEffect(() => {
		setFinalFilteredExercises(exercises);
		setFilteredExercises(exercises);
	}, [exercises]);

	return (
		<NavLayout
			header={<div>Exercises</div>}
			content={
				<div className="flex flex-col flex-grow justify-center gap-4 m-2">
					<div>
						<SearchBar
							setFilterSectionOpenCallback={setIsFilterSelectionOpen}
							filteredList={finalFilteredExercises}
							searchResultsCallback={setExercisesSearchResults}
						/>
						{isFilterSelectionOpen && (
							<div className="bg-base-200 rounded-b-lg">
								<div className="flex flex-col gap-4 p-4">
									<Filters filterOptions={filterOptions} listToFilter={exercises} filterCallback={setFilteredExercises} />
									<Labels
										topLeftLabel="Muscles"
										topRightLabel={
											<Button
												type="button"
												onClick={(e) => {
													console.log("clicked");
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
																{muscleList.map((muscle, i) => (
																	<div key={i} className="flex items-center gap-2 justify-start">
																		<input
																			onChange={() => {
																				if (selectedMuscles.includes(muscle)) {
																					setSelectedMuscles((prevValue) =>
																						prevValue.filter((muscleName) => muscleName !== muscle)
																					);
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
															<VisualMuscleSelector
																value={selectedMuscles}
																selectedMusclesCallback={setSelectedMuscles}
															></VisualMuscleSelector>
														)}
													</>
												)}
											</>
										}
									/>
								</div>
							</div>
						)}
					</div>
					<div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mx-2 mb-auto">
						{exercisesSearchResults.map((exercise: ExerciseData, index: number) => {
							return (
								<Button
									key={index}
									className="bg-base-300 h-fit p-0 m-0 rounded-3xl"
									onClick={() => {
										setIsModalOpen(true);
										setExercise(exercise);
									}}
								>
									<img className="w-full rounded-t-3xl" src="/barbell_bench_press.gif" />
									<div className="p-4 h-16 flex items-center">{exercise.name}</div>
								</Button>
							);
						})}
					</div>
					<Modal openModal={isModalOpen} closeModalCallback={setIsModalOpen}>
						<Exercise exercise={selected}></Exercise>
					</Modal>
				</div>
			}
		/>
	);
};

export default ExercisesPage;
