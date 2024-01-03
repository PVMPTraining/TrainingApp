"use client";

import { FC, useState } from "react";
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { Button } from "@/src/components/UI/Button/Button";
import { Exercise } from "@/src/components/exercise/exercise";
import { EXERCISE_TYPE, ExerciseData, MANDATORY_EQUIPMENT } from "@/src/types/supabase/exerciseData";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { FilterType } from "@/src/components/filter/Filters";
import NavLayout from "@/src/layouts/NavLayout";
import { SearchBarWithFilter } from "@/src/components/search-bar/SeacrhBarWithFilter";

const ExercisesPage: FC = () => {
	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	// State to control whether the modal is open or not
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selected, setExercise] = useState<ExerciseData>({} as ExerciseData);

	const [exercisesSearchResults, setExercisesSearchResults] = useState<ExerciseData[]>(exercises);

	const filterOptions = [
		{ topLeftLabel: "Exercise Type", options: EXERCISE_TYPE, dataKey: "exercise_type", type: FilterType.Checkbox },
		{ topLeftLabel: "Required Equipment", options: MANDATORY_EQUIPMENT, dataKey: "mandatory_equipment", type: FilterType.Checkbox },
		{ topLeftLabel: "Muscles", dataKey: "primary_muscles", type: FilterType.VisualMuscle }
	];

	return (
		<NavLayout
			header={<div>Exercises</div>}
			content={
				<div className="flex flex-col flex-grow justify-center gap-4 m-2">
					<div>
						<SearchBarWithFilter
							listToFilter={exercises}
							filterOptions={filterOptions}
							resultsCallback={setExercisesSearchResults}
							dataIsLoading={isLoading}
						/>
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
