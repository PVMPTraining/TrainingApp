import { FC, useState } from "react";
import { Button } from "../../UI/Button/Button";
import BrandFoodDetailCard from "./BrandFoodDetailCard";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BrandFoodSearchResultTypes } from "@/src/types/types";
import { setChosenBrandFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";

interface BrandFoodCardProps {
	food: BrandFoodSearchResultTypes;
}

const BrandFoodCard: FC<BrandFoodCardProps> = ({ food }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { selectedBrandFoodData } = useSelector((state: RootState) => state.foodFetch);

	const selectBrandFoodHandler = (food: BrandFoodSearchResultTypes) => {
		dispatch(setChosenBrandFood(food));
	};

	console.log(selectedBrandFoodData);

	return (
		<div>
			<div
				key={food._id}
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
				onClick={() => selectBrandFoodHandler(food)}
			>
				<div className="flex flex-col">
					<div className="self-center">
						{food.image_small_url ? (
							<img
								// src={food.image_front_small_url ? food.image_front_small_url : food.image_ingredients_ingredients_url}
								src={food.image_small_url}
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
				{selectedBrandFoodData?._id === food._id && <BrandFoodDetailCard food={food} />}
			</div>
		</div>
	);
};

export default BrandFoodCard;
