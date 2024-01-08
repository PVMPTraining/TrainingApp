import { FC } from "react";

interface StepOneProps {}

const StepOne: FC<StepOneProps> = ({}) => {
	return (
		<>
			<select>
				<select
					// value={selectedNutritionScoreForFilter}
					className="select select-ghost w-full max-w-xs"
					// onChange={(e) => {
					// 	setSelectedNutritionScoreForFilter(e.target.value);
					// }}
				>
					<option value="">All</option>
					<option value="a">A</option>
					<option value="b">B</option>
					<option value="c">C</option>
					<option value="d">D</option>
					<option value="e">E</option>
					<option value="unknown">Unknown</option>
				</select>
			</select>
		</>
	);
};

export default StepOne;
