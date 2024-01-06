import Link from "next/link";
import { FC } from "react";
import { Button } from "@/src/components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import CoreFoodDetailCard from "@/src/components/FoodSearcher/CoreFood/CoreFoodDetailCard";
import { FoodSearchResultTypes } from "@/src/types/types";
import { setChosenCoreFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AddProductToUserHistory, GetUserID } from "@/src/utils/helpers/supabase";

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

	console.log(selectedCoreFoodData);

	return (
		<div
			key={food.description}
			className="bg-black text-white p-2 rounded-md flex gap-2 justify-between relative w-[165px]"
			onClick={() => {
				selectCoreFoodHandler(food);
			}}
		>
			<div className="flex flex-col justify-between gap-2 h-full">
				<p className="text-xl">{food.description}</p>
				<div className="space-y-2">
					<p className="text-base text-gray-300">Portion 100g</p>
					<p>
						Calorie:{" "}
						{food.foodNutrients
							?.filter(
								(nutrient) =>
									nutrient.nutrientName.includes("Energy") ||
									(nutrient.nutrientName.includes("Energy") && nutrient.nutrientName.includes("General"))
							)
							.find((energy) => energy.unitName === "KCAL")?.value ?? 0}{" "}
						kcal
					</p>
					<p>
						Protein:{" "}
						{food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((protein) => protein.unitName === "G")
							?.value! >= 0
							? food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((protein) => protein.unitName === "G")
									?.value
							: 0}{" "}
						gram
					</p>
					<p>
						Carbohydrate:{" "}
						{food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")
							?.value! >= 0
							? food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")
									?.value
							: 0}{" "}
						gram
					</p>
					<p>
						Fat:{" "}
						{food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")?.value! >=
						0
							? food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")
									?.value
							: 0}{" "}
						gram
					</p>
				</div>
				<div className="flex flex-col items-center gap-2">
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
				</div>
			</div>
			{/* {selectedCoreFoodData?.fdcId === food.fdcId && <CoreFoodDetailCard food={food} />} */}
		</div>
	);
};

export default CoreFoodCard;
