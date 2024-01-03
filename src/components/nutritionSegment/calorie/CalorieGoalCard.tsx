import { FC } from "react";
import { Button } from "@/src/components/UI/Button/Button";

export const percentageCalculator = (goal: number, value: number) => {
	const percentage = ((value / goal) * 100).toFixed(2);

	return Number(percentage) > 0 ? Number(percentage) : 0;
};

interface CalorieGoalCardProps {}

const CalorieGoalCard: FC<CalorieGoalCardProps> = ({}) => {
	const foodPercentage = percentageCalculator(2500, 737);
	const beveragePercentage = percentageCalculator(2500, 121);
	const supplementPercentage = percentageCalculator(2500, 632);

	const remainingCalorie = 2500 - (737 + 121 + 632);

	console.log(foodPercentage, beveragePercentage, supplementPercentage);

	return (
		<>
			<div className="flex flex-col gap-3 bg-black py-3 px-1">
				<p className="font-bold text-xl">Calories</p>
				<div>
					<div className="flex items-center gap-3">
						Food: <div className="bg-red-500 w-8 h-3"></div>
					</div>
					<div className="flex items-center gap-3">
						Beverage: <div className="bg-[#69e710] w-8 h-3"></div>
					</div>
					<div className="flex items-center gap-3">
						Supplement: <div className="bg-blue-800 w-8 h-3"></div>
					</div>
					<div className="flex items-center gap-3">
						Remaining: <div className="bg-gray-500 w-8 h-3"></div>
					</div>
				</div>
				<div className="flex items-center justify-center gap-3">
					<div className="flex flex-col gap-4">
						<div
							className="rounded-full w-40 h-40 flex items-center justify-center"
							style={{
								background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(red 0 ${foodPercentage}%, #69e710 ${foodPercentage}% ${
									foodPercentage + beveragePercentage
								}%, blue ${foodPercentage + beveragePercentage}% ${foodPercentage + beveragePercentage + supplementPercentage}%, gray 0)`
							}}
						>
							<p className="max-w-[100px] break-words text-center text-xl">{remainingCalorie} Remaining</p>
						</div>
						{/* <div>
							<p className="text-center mb-3 text-xl">{100 - (foodPercentage + beveragePercentage + supplementPercentage)}% Remaining</p>
							<div className="w-full bg-red-500 rounded-md">
								<div
									className="max-w-[100%] h-2 bg-blue-500 rounded-md"
									style={{ width: `${foodPercentage + beveragePercentage + supplementPercentage}%` }}
								></div>
							</div>
						</div> */}
					</div>
					<div className="self-start flex flex-col gap-3">
						<p className=" tracking-tighter">
							Goal: <strong>2500</strong> calories
						</p>
						<p>From foods: 737</p>
						<p>From beverages: 121</p>
						<p>From supplements: 632</p>
					</div>
				</div>
				<div className="flex justify-between">
					<Button className="self-start text-white">See more details</Button>
					<Button className="self-start text-white">Add data</Button>
				</div>
			</div>
		</>
	);
};

export default CalorieGoalCard;
