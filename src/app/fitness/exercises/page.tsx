"use client";

import { FC, useState } from "react";
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { Exercise } from "@/src/components/exercise/exercise";
import { ExerciseData } from "@/src/types/types";
import Fuse from "fuse.js";
import NavLayout from "@/src/layouts/NavLayout";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { FaFilter } from "react-icons/fa";
import { VisualMuscleSelector } from "@/src/components/visual-muscle-selector/VisualMuscleSelector";

const ExercisesPage: FC = () => {
	const router = useRouter();
	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	// State to control whether the modal is open or not
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFilterSelectionOpen, setIsFilterSelectionOpen] = useState(false);
	const [selected, setExercise] = useState<ExerciseData>({} as ExerciseData);
	const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

	// State to manage the search query
	const [searchQuery, setSearchQuery] = useState<string>("");

	const exercisesFilteredByMuscle = exercises.filter((exercise: ExerciseData) => {
		if (selectedMuscles.length === 0) return true;

		return selectedMuscles.some((muscle) => {
			return exercise.primary_muscles?.includes(muscle) || exercise.secondary_muscles?.includes(muscle);
		});
	});

	// Create a fuzzy search instance with the exercise names
	const fuse = new Fuse(exercisesFilteredByMuscle, {
		keys: ["name"],
		threshold: 0.3 // Adjust the threshold for fuzzy matching
	});

	// Function to perform the fuzzy search
	const performFuzzySearch = (query: string) => {
		if (!query) {
			return exercisesFilteredByMuscle; // If the query is empty, return all exercises
		}
		const result = fuse.search(query);
		return result.map((item) => item.item);
	};

	// Filter exercises based on the search query (using fuzzy search)
	const filteredExercises = performFuzzySearch(searchQuery);

	return (
		<NavLayout
			header={<div>Exercises</div>}
			content={
				<div className="flex flex-col flex-grow justify-center gap-4 m-2">
					<div className="relative">
						<Input
							className="bg-base-200"
							placeholder="Search for exercises"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<Button
							className="btn-sm absolute right-0 top-1"
							onClick={() => {
								setIsFilterSelectionOpen((prevValue) => !prevValue);
							}}
						>
							<FaFilter className="text-accent text-2xl" />
						</Button>
					</div>
					{isFilterSelectionOpen && (
						<div className="w-1/2">
							<VisualMuscleSelector selectedMusclesCallback={setSelectedMuscles}></VisualMuscleSelector>
						</div>
					)}
					<div className="flex flex-wrap gap-2 justify-center mb-auto">
						{filteredExercises.map((exercise: ExerciseData, index: number) => {
							return (
								<Button
									key={index}
									className="bg-base-300 w-[48%] h-fit p-0 m-0 rounded-3xl"
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
