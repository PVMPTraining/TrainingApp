"use client";

import { FC, useState } from "react";
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { Exercise } from "@/src/components/exercise/exercise";
import { ExerciseData } from "@/src/types/types";

const UserWorkoutsPage: FC = () => {
	const router = useRouter();
	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	// State to control whether the modal is open or not
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selected, setExercise] = useState<ExerciseData>({} as ExerciseData);

	// Function to open the modal
	const openModal = () => {
		setIsModalOpen(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="flex flex-col justify-center gap-4 m-4">
			<div className="flex items-center gap-2 bg-base-300 rounded p-2">
				<Button
					onClick={() => {
						router.back();
					}}
				>
					BACK
				</Button>
				<h1 className="w-full uppercase text-center">Exercises</h1>
			</div>
			<Input className="bg-base-200" />
			<div className="flex flex-wrap gap-2 justify-center">
				{exercises.map((exercise: any, index: number) => {
					return (
						<Button
							key={index}
							className="btn bg-base-200 w-[48%] h-24"
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
			{isModalOpen && (
				<dialog id="my_modal_1" className="modal" open>
					<div className="modal-box">
						<Exercise exercise={selected}></Exercise>
					</div>
					<div className="modal-backdrop">
						<button onClick={closeModal}>close</button>
					</div>
				</dialog>
			)}
		</div>
	);
};

export default UserWorkoutsPage;
