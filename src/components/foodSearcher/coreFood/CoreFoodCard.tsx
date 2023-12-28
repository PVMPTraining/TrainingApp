import Link from "next/link";
import { FC } from "react";
import { Button } from "../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import CoreFoodDetailCard from "./CoreFoodDetailCard";
import { FoodSearchResultTypes } from "@/src/types/types";
import { setChosenCoreFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";

interface CoreFoodCardProps {
	food: FoodSearchResultTypes;
}

const CoreFoodCard: FC<CoreFoodCardProps> = ({ food }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, fetchError, isSearched, brandFoodData, chosenFoodCategory, selectedCoreFoodData } = useSelector(
		(state: RootState) => state.foodFetch
	);

	const selectCoreFoodHandler = (food: FoodSearchResultTypes) => {
		dispatch(setChosenCoreFood(food));
	};

	return (
		<div
			key={food.description}
			className="bg-black text-white p-2 rounded-md flex gap-2 justify-between relative"
			onClick={() => {
				selectCoreFoodHandler(food);
			}}
		>
			<div className="flex flex-col">
				<p className="text-xl">{food.description}</p>
				<p className="text-base text-gray-300">
					{food.foodNutrients
						?.filter(
							(nutrient) =>
								nutrient.nutrientName.includes("Energy") ||
								(nutrient.nutrientName.includes("Energy") && nutrient.nutrientName.includes("General"))
						)
						.find((energy) => energy.unitName === "KCAL")?.value ?? 0}{" "}
					kcal, 100g
				</p>
				<button
					// onClick={() => {
					// 	foodDetailModalShowHandler(food);
					// }}
					className="self-start mt-5 rounded-md font-bold"
				>
					See food details
				</button>
			</div>
			{selectedCoreFoodData?.fdcId === food.fdcId && <CoreFoodDetailCard food={food} />}
		</div>
	);
};

export default CoreFoodCard;
