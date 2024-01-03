import { FC } from "react";
import { Button } from "@/src/components/UI/Button/Button";

interface MacroGoalCardProps {}

const MacroGoalCard: FC<MacroGoalCardProps> = ({}) => {
	return (
		<div className="flex flex-col gap-3 bg-slate-900 py-3 px-1">
			<p className="font-bold text-xl">Macros</p>
			<div className="space-y-2 mt-2">
				<p className="text-lg font-medium">Goals</p>
				<p>
					Protein: <strong>150</strong> grams
				</p>
				<p>
					Carbohydrate: <strong>370</strong> grams
				</p>
				<p>
					Fat: <strong>72</strong> grams
				</p>
			</div>
			<div className="flex justify-around items-center mt-3">
				<div>
					<div
						className="w-28 h-28 bg-red-500 rounded-full flex items-center justify-center "
						style={{
							background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(red 0 30%, black 0)`
						}}
					>
						<p className="font-bold max-w-[90px] text-center text-sm">150 Remaining</p>
					</div>
					<p className="text-center mt-2 font-medium text-lg">Protein</p>
				</div>
				<div>
					<div
						className="w-28 h-28 bg-red-500 rounded-full flex items-center justify-center"
						style={{
							background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(red 0 50%, black 0)`
						}}
					>
						<p className="font-bold max-w-[90px] text-center text-sm">370 Remaining</p>
					</div>
					<p className="text-center mt-2 font-medium text-lg">Carbohydrate</p>
				</div>
				<div>
					<div
						className="w-28 h-28 bg-red-500 rounded-full flex items-center justify-center"
						style={{
							background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(red 0 20%, black 0)`
						}}
					>
						<p className="font-bold max-w-[90px] text-center text-sm">72 Remaining</p>
					</div>
					<p className="text-center mt-2 font-medium text-lg">Fat</p>
				</div>
			</div>
			<div className="flex justify-between">
				<Button className="self-start text-white">See more details</Button>
				<Button className="self-start text-white">Add data</Button>
			</div>
		</div>
	);
};

export default MacroGoalCard;
