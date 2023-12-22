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

const ExercisesPage: FC = () => {
	const router = useRouter();
	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	// State to control whether the modal is open or not
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selected, setExercise] = useState<ExerciseData>({} as ExerciseData);

	// State to manage the search query
	const [searchQuery, setSearchQuery] = useState<string>("");

	// Function to open the modal
	const openModal = () => {
		setIsModalOpen(true);
	};

	// Filter exercises based on the search query
	// const filteredExercises = exercises.filter((exercise: ExerciseData) => exercise.name.toLowerCase().includes(searchQuery.toLowerCase()));

	// Create a fuzzy search instance with the exercise names
	const options = {
		keys: ["name"],
		threshold: 0.3 // Adjust the threshold for fuzzy matching
	};
	const fuse = new Fuse(exercises, options);

	// Function to perform the fuzzy search
	const performFuzzySearch = (query: string) => {
		if (!query) {
			return exercises; // If the query is empty, return all exercises
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
				<div className="flex flex-col flex-grow justify-center gap-4 m-2 mb-auto">
					<Input className="bg-base-200" placeholder="Search for exercises" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
					<div className="flex flex-wrap gap-2 justify-start">
						{filteredExercises.map((exercise: ExerciseData, index: number) => {
							return (
								<Button
									key={index}
									className="btn bg-base-200 w-[49%] h-24 m-0"
									onClick={() => {
										openModal();
										setExercise(exercise);
									}}
								>
									<div>{exercise.name}</div>
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
