import { FC, MouseEvent } from "react";
import { setChosenCoreFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AppDispatch } from "@/src/utils/redux/store";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { FoodSearchResultTypes } from "@/src/types/types";

interface CoreFoodDetailCardProps {
	food: FoodSearchResultTypes;
}

const CoreFoodDetailCard: FC<CoreFoodDetailCardProps> = ({ food }) => {
	const dispatch = useDispatch<AppDispatch>();

	const closeSelectedCoreFoodHandler = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.stopPropagation();
		dispatch(setChosenCoreFood(null));
	};

	return (
		<div className="fixed flex flex-col gap-3 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white w-80 h-auto rounded-md p-3 z-50">
			<button className="self-end text-xl" onClick={(e) => closeSelectedCoreFoodHandler(e)}>
				X
			</button>
			<p className="text-xl font-normal">{food.description}</p>
			<p>Nutrition Information based on 100 gr</p>
			<p>
				Calories:{" "}
				{food.foodNutrients
					?.filter(
						(nutrient) =>
							nutrient.nutrientName.includes("Energy") || (nutrient.nutrientName.includes("Energy") && nutrient.nutrientName.includes("General"))
					)
					.find((energy) => energy.unitName === "KCAL")?.value ?? 0}{" "}
				kcal
			</p>
			<p>
				Protein:{" "}
				{food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((protein) => protein.unitName === "G")?.value! >= 0
					? food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((protein) => protein.unitName === "G")?.value
					: 0}{" "}
				gram
			</p>
			<p>
				Carbohydrate:{" "}
				{food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")?.value! >= 0
					? food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")?.value
					: 0}{" "}
				gram
			</p>
			<p>
				Fat:{" "}
				{food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")?.value! >= 0
					? food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")?.value
					: 0}{" "}
				gram
			</p>
			<Link href={`/nutrition/tools/${food.fdcId}`} className="bg-white text-black self-center btn">
				See more nutrition details
			</Link>
		</div>
	);
};

export default CoreFoodDetailCard;
