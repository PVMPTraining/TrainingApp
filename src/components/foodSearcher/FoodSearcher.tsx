"use client";
import { FC, useMemo, useState } from "react";

import Link from "next/link";

import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import {
	fetchFood,
	setKeywordValue,
	setCurrentFood,
	fetchBrandedFood,
	setEmptyBrandFood,
	setCurrentChosenBrandFood
} from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { BrandFoodSearchResultTypes, FoodSearchResultTypes } from "@/src/types/types";
import { FaSpinner } from "react-icons/fa";
import ReactPaginate from "react-paginate";

// For olive oil they didn't provide a calorie value need to calculate with formula

interface FoodSearcherProps {}

const FoodSearcher: FC<FoodSearcherProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, foodData, fetchError, isSearched, lastKeywordValue, brandFoodData } = useSelector((state: RootState) => state.foodFetch);

	const [selectedSearchType, setSelectedSearchType] = useState<"Brand" | "Core">("Core");
	const [activePage, setActivePage] = useState(1);

	const [isBrandFoodDetailModalOpen, setIsBrandFoodDetailModalOpen] = useState(false);
	const [selectedBrandFood, setSelectedBrandFood] = useState<BrandFoodSearchResultTypes | null>(null);
	const [selectedNutritionScoreForFilter, setSelectedNutritionScoreForFilter] = useState("");

	const [isFoodDetailsModalOpen, setIsFoodDetailsModalOpen] = useState(false);
	const [selectedFood, setSelectedFood] = useState<FoodSearchResultTypes | null>(null);

	const pageCount =
		brandFoodData.count / 50 - Math.floor(brandFoodData.count / 50) >= 0.5
			? Math.round(brandFoodData.count / 50)
			: Math.floor(brandFoodData.count / 50) + 1;

	const keywordChangeHandler = (e: any) => {
		dispatch(setKeywordValue(e.target.value));
	};

	const foodFetchHandler = () => {
		if (lastKeywordValue.trim() === keywordValue.trim() || keywordValue.trim() === "") {
			return;
		}
		dispatch(fetchFood(keywordValue));
	};

	const brandedFetchHandler = async (pageNumber: number) => {
		await setActivePage(pageNumber - 1);
		await dispatch(setEmptyBrandFood());
		await dispatch(fetchBrandedFood({ keywordValue: keywordValue, page: pageNumber }));
	};

	const foodDetailModalShowHandler = (food: FoodSearchResultTypes) => {
		setSelectedFood(food);
		setIsFoodDetailsModalOpen(true);
	};

	const foodDetailModalCloseHandler = () => {
		setIsFoodDetailsModalOpen(false);
	};

	const filteredResults = useMemo(() => {
		if (brandFoodData.products?.length >= 1) {
			return brandFoodData.products.filter((product) => product.nutrition_grades === selectedNutritionScoreForFilter);
		} else {
			return [];
		}
	}, [selectedNutritionScoreForFilter, brandFoodData]);

	return (
		<div className="flex flex-col relative p-1">
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
				<Button className="bg-black text-white" onClick={() => brandedFetchHandler(1)}>
					Search
				</Button>
			</div>
			<div className="flex flex-col items-center justify-center my-4 gap-2">
				<p className="text-sm">Select a search category for your search query</p>
				<div className="flex gap-2">
					<Button
						className={`text-white ${selectedSearchType === "Core" ? "bg-blue-500 pointer-events-none" : "bg-black"}`}
						onClick={() => setSelectedSearchType("Core")}
					>
						Core foods
					</Button>
					<Button
						className={`text-white ${selectedSearchType === "Brand" ? "bg-blue-500 pointer-events-none" : "bg-black"}`}
						onClick={() => setSelectedSearchType("Brand")}
					>
						Branded foods
					</Button>
				</div>
			</div>
			{brandFoodData.products?.length >= 1 || foodData.foods?.length >= 1 ? (
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					pageRangeDisplayed={1}
					marginPagesDisplayed={2}
					previousLinkClassName="text-xl px-2.5 py-2 bg-blue-500 rounded-md text-white"
					nextLinkClassName="text-xl px-2.5 py-2 bg-blue-500 rounded-md text-white"
					pageClassName=" bg-black text-white text-sm px-2.5 py-2 rounded-md"
					className="flex text-sm items-center justify-center gap-2 self-center text-black"
					activeClassName="bg-blue-500"
					pageCount={pageCount}
					onPageChange={(data) => {
						brandedFetchHandler(data.selected + 1);
					}}
					forcePage={activePage}
					// onPageActive={(number) => brandedFetchHandler(number.selected + 1)}
					// onClick={(number) => console.log(number)}
					previousLabel="<"
					renderOnZeroPageCount={null}
				/>
			) : null}

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
			{!isLoading ? (
				brandFoodData.products?.length >= 1 ? (
					<div className="flex flex-col gap-5 mt-5 relative">
						<p className="font-bold">
							Showing {filteredResults?.length >= 1 ? filteredResults?.length : brandFoodData.page_count} results for this page, go to another
							page for see more results.
						</p>
						<div className="flex flex-col gap-2">
							<p className="font-bold">
								Filter <strong>this page</strong> results based by their nutrition score
							</p>
							<select
								value={selectedNutritionScoreForFilter}
								className="select select-ghost w-full max-w-xs"
								onChange={(e) => {
									setSelectedNutritionScoreForFilter(e.target.value);
								}}
							>
								<option value="">All</option>
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
								<option value="unknown">Unknown</option>
							</select>
						</div>
						{filteredResults?.length >= 1
							? filteredResults.map((food) => (
									<div
										key={food.id}
										className={`bg-black text-white p-2 rounded-md flex flex-col gap-5 justify-between relative ${
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
										onClick={() => setSelectedBrandFood(food)}
									>
										<div className="flex flex-col">
											<div className="self-center">
												{food.image_front_url ? (
													<img
														// src={food.image_front_small_url ? food.image_front_small_url : food.image_ingredients_ingredients_url}
														src={food.image_front_url}
														loading="lazy"
														style={{ objectFit: "contain", width: "auto", height: "auto" }}
													/>
												) : (
													<div className="w-full h-[186px] bg-white"></div>
												)}
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
											<p className="mt-2">
												Nutrition score:{" "}
												{food.nutrition_grades ? (
													<strong
														className={`${
															food.nutrition_grades === "a"
																? "text-green-500"
																: food.nutrition_grades === "b"
																? "text-green-300"
																: food.nutrition_grades === "c"
																? "text-yellow-400"
																: food.nutrition_grades === "d"
																? "text-orange-400"
																: "text-red-500"
														} text-xl`}
													>
														{food.nutrition_grades.toUpperCase()}
													</strong>
												) : (
													"?"
												)}
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
												// onClick={() => {
												// 	foodDetailModalShowHandler(food);
												// }}
												className="self-start mt-5 rounded-md font-bold"
											>
												See food details
											</button>
										</div>
										<Button className="bg-white text-black self-center rounded-md font-bold" onClick={(e) => e.stopPropagation()}>
											Add to diet
										</Button>
										{food.id === selectedBrandFood?.id ? (
											<div className="absolute flex flex-col z-50 gap-3 top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white w-80 h-auto rounded-md p-3">
												<button
													className="self-end text-xl"
													onClick={(e) => {
														e.stopPropagation();
														setSelectedBrandFood(null);
													}}
												>
													X
												</button>
												<div className="self-center">
													{food.image_front_url ? (
														<img
															// src={food.image_front_small_url ? food.image_front_small_url : food.image_ingredients_ingredients_url}
															src={food.image_front_url}
															loading="lazy"
															style={{ objectFit: "contain", width: "auto", height: "auto" }}
														/>
													) : (
														<div className="w-full h-[186px] bg-white"></div>
													)}
												</div>

												<p className="text-xl font-normal">
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
												</p>
												<p>Nutrition Information based on 100 gr</p>
												<p>Energy: {food.nutriments["energy-kcal_100g"]} kcal</p>
												<p>Carbohydrate: {food.nutriments.carbohydrates_100g}g</p>
												<p>Fat: {food.nutriments.fat_100g}g</p>
												<p></p>
												<Link
													href={`/nutrition/tools/${food.id}}`}
													className="bg-white text-black self-center btn"
													onClick={() => dispatch(setCurrentChosenBrandFood(selectedBrandFood))}
												>
													See more nutrition details
												</Link>
											</div>
										) : null}
									</div>
							  ))
							: brandFoodData.products.map((food) => (
									<div
										key={food.id}
										className={`bg-black text-white p-2 rounded-md flex flex-col gap-5 justify-between relative ${
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
										onClick={() => setSelectedBrandFood(food)}
									>
										<div className="flex flex-col">
											<div className="self-center">
												{food.image_front_url ? (
													<img
														// src={food.image_front_small_url ? food.image_front_small_url : food.image_ingredients_ingredients_url}
														src={food.image_front_url}
														loading="lazy"
														style={{ objectFit: "contain", width: "auto", height: "auto" }}
													/>
												) : (
													<div className="w-full h-[186px] bg-white"></div>
												)}
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
											<p className="mt-2">
												Nutrition score:{" "}
												{food.nutrition_grades ? (
													<strong
														className={`${
															food.nutrition_grades === "a"
																? "text-green-500"
																: food.nutrition_grades === "b"
																? "text-green-300"
																: food.nutrition_grades === "c"
																? "text-yellow-400"
																: food.nutrition_grades === "d"
																? "text-orange-400"
																: "text-red-500"
														} text-xl`}
													>
														{food.nutrition_grades.toUpperCase()}
													</strong>
												) : (
													"?"
												)}
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
												// onClick={() => {
												// 	foodDetailModalShowHandler(food);
												// }}
												className="self-start mt-5 rounded-md font-bold"
											>
												See food details
											</button>
										</div>
										<Button className="bg-white text-black self-center rounded-md font-bold" onClick={(e) => e.stopPropagation()}>
											Add to diet
										</Button>
										{food.id === selectedBrandFood?.id ? (
											<div className="absolute flex flex-col z-50 gap-3 top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white w-80 h-auto rounded-md p-3">
												<button
													className="self-end text-xl"
													onClick={(e) => {
														e.stopPropagation();
														setSelectedBrandFood(null);
													}}
												>
													X
												</button>
												<div className="self-center">
													{food.image_front_url ? (
														<img
															// src={food.image_front_small_url ? food.image_front_small_url : food.image_ingredients_ingredients_url}
															src={food.image_front_url}
															loading="lazy"
															style={{ objectFit: "contain", width: "auto", height: "auto" }}
														/>
													) : (
														<div className="w-full h-[186px] bg-white"></div>
													)}
												</div>

												<p className="text-xl font-normal">
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
												</p>
												<p>Nutrition Information based on 100 gr</p>
												<p>Energy: {food.nutriments["energy-kcal_100g"]} kcal</p>
												<p>Carbohydrate: {food.nutriments.carbohydrates_100g}g</p>
												<p>Fat: {food.nutriments.fat_100g}g</p>
												<p></p>
												<Link
													href={`/nutrition/tools/${food.id}}`}
													className="bg-white text-black self-center btn"
													onClick={() => dispatch(setCurrentChosenBrandFood(selectedBrandFood))}
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
