"use client";
import { FC, useState } from "react";

import Link from "next/link";

import { Input } from "../UI/Input/Input";
import { Button } from "../UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { fetchFood, setKeywordValue, setCurrentFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { FoodSearchResultTypes } from "@/src/types/types";

interface FoodSearcherProps {}

const FoodSearcher: FC<FoodSearcherProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, foodData, fetchError } = useSelector((state: RootState) => state.foodFetch);

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedFood, setSelectedFood] = useState<FoodSearchResultTypes | null>(null);

	const keywordChangeHandler = (e: any) => {
		dispatch(setKeywordValue(e.target.value));
	};

	const foodFetchHandler = () => {
		dispatch(fetchFood(keywordValue));
	};

	return (
		<div className="flex flex-col relative">
			<div className="flex items-center gap-2">
				<Input className="bg-black text-white" value={keywordValue} placeholder="Food name" onChange={(e) => keywordChangeHandler(e)} />
				<Button className="bg-black text-white" onClick={foodFetchHandler}>
					Search
				</Button>
			</div>
			{foodData.foods?.length >= 1 ? (
				<div className="flex flex-col gap-5 mt-5">
					{foodData.foods.map((food) => (
						<div key={food.description} className="bg-black text-white p-2 rounded-md">
							<p>{food.description}</p>
							<p className="text-sm text-gray-300">
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
								onClick={() => {
									setSelectedFood(food);
									setModalOpen(true);
								}}
							>
								See food details
							</button>
						</div>
					))}
				</div>
			) : null}
			{modalOpen && selectedFood ? (
				<div className="absolute flex flex-col gap-3 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white w-80 h-auto rounded-md p-3">
					<button className="self-end" onClick={() => setModalOpen(false)}>
						X
					</button>
					<p className="text-lg font-normal">
						Food name <br /> {selectedFood.description}
					</p>
					<p>Nutrition Information based on 100 gr</p>
					<p>
						Calories:{" "}
						{selectedFood.foodNutrients
							?.filter(
								(nutrient) =>
									nutrient.nutrientName.includes("Energy") ||
									(nutrient.nutrientName.includes("Energy") && nutrient.nutrientName.includes("General"))
							)
							.find((energy) => energy.unitName === "KCAL")?.value ?? 0}{" "}
						kcal
					</p>
					<p>Protein: {selectedFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein"))[0].value} gram</p>
					<p>
						Carbohydrate:{" "}
						{selectedFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate"))[0].value >= 1
							? selectedFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate"))[0].value
							: 0}{" "}
						gram
					</p>
					<p>
						Total lipid (fat):{" "}
						{selectedFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid (fat)"))[0].value >= 1
							? selectedFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid (fat)"))[0].value
							: 0}{" "}
						gram
					</p>
					<Link
						href={`/nutrition/tools/${selectedFood.description}`}
						className="bg-white text-black self-center btn"
						onClick={() => dispatch(setCurrentFood(selectedFood))}
					>
						See more nutrition details
					</Link>
				</div>
			) : null}
		</div>
	);
};

export default FoodSearcher;
