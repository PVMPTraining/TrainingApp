"use client";

import { FC, useEffect, useState } from "react";
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { Exercise } from "@/src/components/exercise/exercise";
import { ExerciseData } from "@/src/types/types";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import { VisualMuscleSelector } from "@/src/components/visual-muscle-selector/VisualMuscleSelector";
import { Toggle } from "@/src/components/UI/Toggle/Toggle";
import { Filters } from "@/src/components/filter/Filters";
import Fuse from "fuse.js";
import NavLayout from "@/src/layouts/NavLayout";
import { Labels } from "@/src/components/UI/Labels/Labels";

interface FilterObject {
	name: string;
	include: boolean;
}

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
const exerciseTypes = ["Compound", "Isolation", "Cardio", "Stretching", "Calisthenics", "Plyometrics"];
const requiredEquipments = ["Barbell", "Dumbbell", "Kettlebell", "Bodyweight", "Resistance Band", "Machine"];

const ExercisesPage: FC = () => {
	const router = useRouter();
	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	// State to control whether the modal is open or not
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFilterSelectionOpen, setIsFilterSelectionOpen] = useState(false);
	const [selected, setExercise] = useState<ExerciseData>({} as ExerciseData);

	const [filteredExercises, setFilteredExercises] = useState<ExerciseData[]>(exercises);
	const [exercisesSearchResults, setExercisesSearchResults] = useState<ExerciseData[]>(exercises);

	const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
	const [musclesFilterOpen, setMusclesFilterOpen] = useState<boolean>(false);

	const [visualView, setVisualView] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>("");

	useEffect(() => {
		const f = filteredExercises.filter((exercise: ExerciseData) => {
			if (selectedMuscles.length === 0) return true;

			return selectedMuscles.some((muscle) => {
				return exercise.primary_muscles?.includes(muscle) || exercise.secondary_muscles?.includes(muscle);
			});
		});

		// Create a fuzzy search instance with the exercise names
		const fuse = new Fuse(f, {
			keys: ["name"],
			threshold: 0.3 // Adjust the threshold for fuzzy matching
		});

		// Function to perform the fuzzy search
		const performFuzzySearch = (query: string) => {
			if (!query) {
				return f; // If the query is empty, return all exercises
			}
			const result = fuse.search(query);
			return result.map((item) => item.item);
		};

		// Filter exercises based on the search query (using fuzzy search)
		setExercisesSearchResults(performFuzzySearch(searchQuery));
	}, [filteredExercises, selectedMuscles]);

	useEffect(() => {
		setFilteredExercises(exercises);
	}, [exercises]);

	return (
		<NavLayout
			header={<div>Exercises</div>}
			content={
				<div className="flex flex-col flex-grow justify-center gap-4 m-2">
					<div>
						<div className="flex items-center bg-base-200 rounded-lg">
							<Input
								className={"bg-base-200 rounded-r-none " + (isFilterSelectionOpen ? "rounded-b-none" : "")}
								placeholder="Search for exercises"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<Button
								className={"m-0 rounded-l-none " + (isFilterSelectionOpen ? "rounded-b-none" : "")}
								onClick={() => {
									setIsFilterSelectionOpen((prevValue) => !prevValue);
								}}
							>
								<FaFilter className="text-accent text-2xl" />
							</Button>
						</div>
						{isFilterSelectionOpen && (
							<div className="bg-base-200 rounded-b-lg">
								<div className="flex flex-col gap-4 p-4">
									<Filters
										filterOptions={[
											{ topLeftLabel: "Exercise Type", options: exerciseTypes, dataKey: "exercise_type" },
											{ topLeftLabel: "Required Equipment", options: requiredEquipments, dataKey: "mandatory_equipment" }
										]}
										listToFilter={exercises}
										filterCallback={setFilteredExercises}
									/>
									<Labels
										topLeftLabel="Muscles"
										topRightLabel={
											<Button
												onClick={(e) => {
													e.preventDefault(); // Prevent default form submission behavior
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
															<div className="">
																<VisualMuscleSelector
																	value={selectedMuscles}
																	selectedMusclesCallback={setSelectedMuscles}
																></VisualMuscleSelector>
															</div>
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
