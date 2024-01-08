import Link from "next/link";
import { FC } from "react";
import { Button } from "@/src/components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import CoreFoodDetailCard from "@/src/components/FoodSearcher/CoreFood/CoreFoodDetailCard";
import { CoreFoodSearchResultTypes } from "@/src/types/types";
import { setChosenCoreFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AddProductToUserHistory, GetUserID } from "@/src/utils/helpers/supabase";
import CoreFoodCardNutriments from "./CoreFoodCardNutrients";

interface CoreFoodCardProps {
	food: CoreFoodSearchResultTypes;
}

const CoreFoodCard: FC<CoreFoodCardProps> = ({ food }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, fetchError, isSearched, brandFoodData, chosenFoodCategory, selectedCoreFoodData } = useSelector(
		(state: RootState) => state.foodFetch
	);

	const selectCoreFoodHandler = (food: CoreFoodSearchResultTypes) => {
		dispatch(setChosenCoreFood(food));
	};

	console.log(selectedCoreFoodData);

	return (
		<div
			className="text-white p-2 rounded-md flex gap-2 justify-between relative border-b-2 px-3"
			onClick={() => {
				selectCoreFoodHandler(food);
			}}
		>
			<div className="flex flex-col justify-between gap-2 w-full h-full">
				<CoreFoodCardNutriments food={food} />
				{/* <div className="flex flex-col items-center gap-2">
					<Link
						href={`/nutrition/tools/${food.fdcId}`}
						className="bg-white text-black self-center btn"
						onClick={async () => {
							dispatch(setChosenCoreFood(food));
							await AddProductToUserHistory((await GetUserID()) as string, {
								productName: food.description,
								category: "core",
								timestamp: Date.now()
							});
						}}
					>
						See all details
					</Link>
					<Button>Add to diary</Button>
				</div> */}
			</div>
		</div>
	);
};

export default CoreFoodCard;
