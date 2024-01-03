import { ExerciseData } from "@/src/types/supabase/exerciseData";
import { FC, ButtonHTMLAttributes } from "react";

interface ExerciseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	exercise: ExerciseData;
}

export const Exercise: FC<ExerciseProps> = ({ className, exercise, ...props }) => {
	return (
		<div className={["", className].join()}>
			<div className="flex flex-row justify-between">
				<div className="flex flex-col">
					<div className="text-2xl font-bold">{exercise.name}</div>
					<div className="text-base">{exercise.description}</div>
				</div>
			</div>
		</div>
	);
};
