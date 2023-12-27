import { FC, MouseEvent } from "react";
import { setChosenBrandFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AppDispatch } from "@/src/utils/redux/store";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { BrandFoodSearchResultTypes } from "@/src/types/types";

interface BrandFoodDetailCardProps {
	food: BrandFoodSearchResultTypes;
}

const BrandFoodDetailCard: FC<BrandFoodDetailCardProps> = ({ food }) => {
	const dispatch = useDispatch<AppDispatch>();

	const closeSelectedBrandFoodHandler = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.stopPropagation();
		dispatch(setChosenBrandFood(null));
	};

	return (
		<div>
			<div className="fixed flex flex-col z-50 gap-3 top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white w-80 h-auto rounded-md p-3">
				<button
					className="self-end text-xl"
					onClick={(e) => {
						closeSelectedBrandFoodHandler(e);
					}}
				>
					X
				</button>
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
					href={`/nutrition/tools/${food._id}}`}
					className="bg-white text-black self-center btn"
					// onClick={() => dispatch(setCurrentChosenBrandFood(selectedBrandFood))}
				>
					See more nutrition details
				</Link>
			</div>
		</div>
	);
};

export default BrandFoodDetailCard;
