"use client";
import { FC, useState } from "react";

import Link from "next/link";

import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { fetchFood, setKeywordValue, setCurrentFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { FoodSearchResultTypes } from "@/src/types/types";

// For olive oil they didn't provide a calorie value need to calculate with formula

interface FoodSearcherProps {}

const FoodSearcher: FC<FoodSearcherProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, foodData, fetchError } = useSelector((state: RootState) => state.foodFetch);

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedFood, setSelectedFood] = useState<FoodSearchResultTypes | null>(null);

	const [addModal, setAddModal] = useState(false);

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
						<div
							key={food.description}
							className="bg-black text-white p-2 rounded-md flex gap-2 justify-between"
							onClick={() => {
								setSelectedFood(food);
								setModalOpen(true);
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
									onClick={() => {
										setSelectedFood(food);
										setModalOpen(true);
									}}
									className="self-start mt-5 rounded-md font-bold"
								>
									See food details
								</button>
							</div>
							<Button className="bg-white text-black self-center rounded-md font-bold">Add to diet</Button>
						</div>
					))}
				</div>
			) : null}
			{modalOpen && selectedFood ? (
				<div className="absolute flex flex-col gap-3 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white w-80 h-auto rounded-md p-3">
					<button className="self-end text-xl" onClick={() => setModalOpen(false)}>
						X
					</button>
					<p className="text-xl font-normal">{selectedFood.description}</p>
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
					<p>
						Protein:{" "}
						{selectedFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((protein) => protein.unitName === "G")
							?.value! >= 0
							? selectedFood.foodNutrients
									.filter((nutrient) => nutrient.nutrientName.includes("Protein"))
									.find((protein) => protein.unitName === "G")?.value
							: 0}{" "}
						gram
					</p>
					<p>
						Carbohydrate:{" "}
						{selectedFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")
							?.value! >= 0
							? selectedFood.foodNutrients
									.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate"))
									.find((carb) => carb.unitName === "G")?.value
							: 0}{" "}
						gram
					</p>
					<p>
						Total lipid (fat):{" "}
						{selectedFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")
							?.value! >= 0
							? selectedFood.foodNutrients
									.filter((nutrient) => nutrient.nutrientName.includes("Total lipid"))
									.find((carb) => carb.unitName === "G")?.value
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
