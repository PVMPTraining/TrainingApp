"use client";
import { FC, useState } from "react";

import Link from "next/link";

import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { fetchFood, setKeywordValue, setCurrentFood, fetchBrandedFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { FoodSearchResultTypes } from "@/src/types/types";
import { FaSpinner } from "react-icons/fa";

// For olive oil they didn't provide a calorie value need to calculate with formula

interface FoodSearcherProps {}

const FoodSearcher: FC<FoodSearcherProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, foodData, fetchError, isSearched, lastKeywordValue, brandFoodData } = useSelector((state: RootState) => state.foodFetch);

	const [isFoodDetailsModalOpen, setIsFoodDetailsModalOpen] = useState(false);
	const [selectedFood, setSelectedFood] = useState<FoodSearchResultTypes | null>(null);

	const keywordChangeHandler = (e: any) => {
		dispatch(setKeywordValue(e.target.value));
	};

	const foodFetchHandler = () => {
		if (lastKeywordValue.trim() === keywordValue.trim() || keywordValue.trim() === "") {
			return;
		}
		dispatch(fetchFood(keywordValue));
	};

	const brandedFetchHandler = () => {
		dispatch(fetchBrandedFood({ keywordValue: keywordValue, page: 1 }));
	};

	const foodDetailModalShowHandler = (food: FoodSearchResultTypes) => {
		setSelectedFood(food);
		setIsFoodDetailsModalOpen(true);
	};

	const foodDetailModalCloseHandler = () => {
		setIsFoodDetailsModalOpen(false);
	};

	console.log(brandFoodData, isLoading);

	return (
		<div className="flex flex-col relative">
			<div className="flex items-center gap-2">
				<Input
					className="bg-black text-white"
					value={keywordValue}
					placeholder="Food name"
					onChange={(e) => keywordChangeHandler(e)}
					// onKeyDown={(e) => {
					// 	if (e.key === "Enter") {
					// 		foodFetchHandler();
					// 	}
					// }}
				/>
				{/* <Button className="bg-black text-white" onClick={foodFetchHandler}>
					Search
				</Button> */}
				<Button className="bg-black text-white" onClick={brandedFetchHandler}>
					Search
				</Button>
			</div>
			{/* <div>Brand focused search Foundation focused</div> */}
			{/* {!isLoading ? (
				foodData.foods?.length >= 1 ? (
					<div className="flex flex-col gap-5 mt-5 relative">
						{foodData.foods.map((food) => (
							<div
								key={food.description}
								className="bg-black text-white p-2 rounded-md flex gap-2 justify-between relative"
								onClick={() => {
									foodDetailModalShowHandler(food);
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
											foodDetailModalShowHandler(food);
										}}
										className="self-start mt-5 rounded-md font-bold"
									>
										See food details
									</button>
								</div>
								<Button className="bg-white text-black self-center rounded-md font-bold">Add to diet</Button>
								{selectedFood?.description === food.description ? (
									<div className="absolute flex flex-col gap-3 top-[200px] z-50 left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 border-red-500 bg-black text-white w-80 h-auto rounded-md p-3">
										<button
											className="self-end text-xl"
											onClick={(event) => {
												event.stopPropagation();
												setSelectedFood(null);
											}}
										>
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
											{selectedFood.foodNutrients
												.filter((nutrient) => nutrient.nutrientName.includes("Protein"))
												.find((protein) => protein.unitName === "G")?.value! >= 0
												? selectedFood.foodNutrients
														.filter((nutrient) => nutrient.nutrientName.includes("Protein"))
														.find((protein) => protein.unitName === "G")?.value
												: 0}{" "}
											gram
										</p>
										<p>
											Carbohydrate:{" "}
											{selectedFood.foodNutrients
												.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate"))
												.find((carb) => carb.unitName === "G")?.value! >= 0
												? selectedFood.foodNutrients
														.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate"))
														.find((carb) => carb.unitName === "G")?.value
												: 0}{" "}
											gram
										</p>
										<p>
											Fat:{" "}
											{selectedFood.foodNutrients
												.filter((nutrient) => nutrient.nutrientName.includes("Total lipid"))
												.find((carb) => carb.unitName === "G")?.value! >= 0
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
						))}
					</div>
				) : isSearched && fetchError ? (
					<div className="text-center font-bold mt-2">{fetchError}</div>
				) : isSearched && !fetchError ? (
					<div className="text-center font-bold mt-2">No results found for your search query. Please try again with a different query.</div>
				) : null
			) : (
				<div className="self-center text-xl font-bold flex items-center gap-2 mt-2">
					<FaSpinner className="animate-spin text-4xl" /> Searching...
				</div>
			)} */}

			{isLoading && "HEY"}
			{!isLoading ? (
				brandFoodData.products?.length >= 1 ? (
					<div className="flex flex-col gap-5 mt-5 relative">
						{brandFoodData.products.map((food: any) => (
							<div
								key={food.generic_name}
								className={`bg-black text-white p-2 rounded-md flex gap-2 justify-between relative ${
									food.product_name_en
										? food.product_name_en
										: food.product_name
										  ? food.product_name
										  : food.abbreviated_product_name
										    ? food.abbreviated_product_name
										    : food.generic_name_en
										      ? food.generic_name_en
										      : food.generic_name_de
										        ? food.generic_name_de
										        : food.generic_name_fr
										          ? food.generic_name_fr
										          : food.generic_name
										            ? food.generic_name
										            : "hidden"
								}`}
							>
								<div className="flex flex-col">
									<div>
										<img
											// src={food.image_front_small_url ? food.image_front_small_url : food.image_ingredients_ingredients_url}
											src={food.image_front_small_url}
											loading="lazy"
										/>
									</div>
									<p className="text-xl">
										{food.brands ? food.brands + " - " : ""}
										{/* {food.generic_name_en
											? food.generic_name_en
											: food.generic_name_de
											? food.generic_name_de
											: food.generic_name_fr
											? food.generic_name_fr
											: food.generic_name} */}
										{/* {food.abbreviated_product_name} */}
										{food.product_name_en
											? food.product_name_en
											: food.product_name
											  ? food.product_name
											  : food.abbreviated_product_name
											    ? food.abbreviated_product_name
											    : food.generic_name_en
											      ? food.generic_name_en
											      : food.generic_name_de
											        ? food.generic_name_de
											        : food.generic_name_fr
											          ? food.generic_name_fr
											          : food.generic_name}
									</p>
									{/* <p className="text-base text-gray-300">
										{food.foodNutrients
											?.filter(
												(nutrient) =>
													nutrient.nutrientName.includes("Energy") ||
													(nutrient.nutrientName.includes("Energy") && nutrient.nutrientName.includes("General"))
											)
											.find((energy) => energy.unitName === "KCAL")?.value ?? 0}{" "}
										kcal, 100g
									</p> */}
									<button
										onClick={() => {
											foodDetailModalShowHandler(food);
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
				) : isSearched && fetchError ? (
					<div className="text-center font-bold mt-2">{fetchError}</div>
				) : isSearched && !fetchError ? (
					<div className="text-center font-bold mt-2">No results found for your search query. Please try again with a different query.</div>
				) : null
			) : (
				<div className="self-center text-xl font-bold flex items-center gap-2 mt-2">
					<FaSpinner className="animate-spin text-4xl" /> Searching...
				</div>
			)}

			{/* {isFoodDetailsModalOpen && selectedFood ? (
				<div className="absolute flex flex-col gap-3 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white w-80 h-auto rounded-md p-3">
					<button className="self-end text-xl" onClick={foodDetailModalCloseHandler}>
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
						Fat:{" "}
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
			) : null} */}
		</div>
	);
};

export default FoodSearcher;
