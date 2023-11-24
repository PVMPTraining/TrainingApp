import { FC } from "react";
import { Button } from "../re-usable/Button/Button";
import { CreateExercise } from "../create-exercise/CreateExercise";

export const CreateWorkout: FC = () => {
	return (
		<>
			<div className="flex flex-col gap-4">
				<CreateExercise></CreateExercise>
				<Button>Add new excercise</Button>
			</div>
		</>
	);
};
