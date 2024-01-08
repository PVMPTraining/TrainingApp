import { FC, useState } from "react";
import { Button } from "@/src/components/UI/Button/Button";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BrandFoodSearchResultTypes } from "@/src/types/types";
import { setChosenBrandFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import Link from "next/link";
import { AddProductToUserHistory, GetUserID } from "@/src/utils/helpers/supabase";
import { useRouter } from "next/navigation";

// çerezya keyword causing problem.

// This function is might be good or not i don't know actually, i saw same brand names has repetition like rügenwalder, rügenwalder... like 6 times i decided to write this function
const brandNameRepetitionPreventer = (name: string) => {
	const nameSplit = name.split(",").map((brand) => brand.trim());
	const nameSet = new Set(nameSplit);
	const nameWithoutRepetition = Array.from(nameSet).join(", ");

	return nameWithoutRepetition;
};

const nutritionValueReceiver = (food: BrandFoodSearchResultTypes, nutrition: string) => {
	if (food.serving_size) {
		return food.nutriments.nutrition_serving
			? parseFloat(food.nutriments.carbohydrates_serving.toFixed(1))
			: food.nutriments.carbohydrates_100g
			? parseFloat(food.nutriments.carbohydrates_100g.toFixed(1))
			: food.nutriments.carbohydrates_prepared_serving
			? parseFloat(food.nutriments.carbohydrates_prepared_serving.toFixed(1))
			: 0; // You can set a default value if needed
	} else {
		return food.nutriments.carbohydrates_100g ? parseFloat(food.nutriments.carbohydrates_100g.toFixed(1)) : 0; // You can set a default value if needed
	}
};

// const brandTagsRepetitionRemover = (tags: string[]) => {
// 	let uniqueBrands: string[] = [];
// 	for (let brand of tags) {
// 		if (!uniqueBrands.includes(brand)) {
// 			uniqueBrands.push(brand);
// 		}
// 	}

// 	return uniqueBrands.join(" ");
// };

const brandServingSizeValueAdjuster = (value: string) => {
	const adjustedValue = value.replace(" ", "");

	return adjustedValue;
};

interface BrandFoodCardProps {
	food: BrandFoodSearchResultTypes;
}

const BrandFoodCard: FC<BrandFoodCardProps> = ({ food }) => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { selectedBrandFoodData } = useSelector((state: RootState) => state.foodFetch);

	const selectBrandFoodHandler = (food: BrandFoodSearchResultTypes) => {
		dispatch(setChosenBrandFood(food));
	};

	return (
		<div
			key={food._id}
			className={`bg-black text-white p-2 rounded-md flex flex-col gap-4 justify-between relative w-[165px] ${
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
			<div className="flex flex-col justify-between gap-2 h-full">
				<div className="self-center h-[150px]">
					{food.image_small_url ? (
						<img src={food.image_small_url} loading="lazy" style={{ objectFit: "contain", width: "100%", height: "100%" }} />
					) : (
						<img
							src={"/assets/no-image-icon.png"}
							className="w-full h-[186px] bg-white"
							loading="lazy"
							style={{ objectFit: "contain", width: "100%", height: "100%" }}
						/>
					)}
				</div>
				<p className="text-center max-w-[140px] break-words">
					{/* brandNameRepetitionPreventer(food.brands) */}
					<strong className="text-lg">{food.brands ? brandNameRepetitionPreventer(food.brands) : ""}</strong>
					<br />
					<span className="tracking-tighter text-left">
						{food.product_name
							? food.product_name
							: food.product_name_en
							? food.product_name_en
							: food.abbreviated_product_name
							? food.abbreviated_product_name
							: food.generic_name_en
							? food.generic_name_en
							: food.generic_name_de
							? food.generic_name_de
							: food.generic_name_fr
							? food.generic_name_fr
							: food.generic_name}
					</span>
				</p>
				<div className="space-y-2">
					<p>
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
								}`}
							>
								{food.nutrition_grades.toUpperCase()}
							</strong>
						) : (
							"?"
						)}
					</p>
					<p className="text-sm tracking-tighter text-green-400">
						Serving size{" "}
						{food.serving_quantity &&
						(food.nutriments["energy-kcal_serving"] ||
							food.nutriments["energy-kj_serving"] ||
							food.nutriments["energy-kcal_prepared_serving"] ||
							food.nutriments["energy-kj_prepared_serving"])
							? food.serving_quantity + "g"
							: food.serving_size && !food.serving_quantity
							? food.serving_size
							: food.nutriments["energy-kcal_100g"] || food.nutriments["energy-kj_100g"]
							? "100g"
							: "Unknown"}{" "}
					</p>
					<p>
						Calorie:{" "}
						{food.serving_quantity ||
						(food.serving_size &&
							(food.nutriments["energy-kcal_serving"] ||
								food.nutriments["energy-kj_serving"] ||
								food.nutriments["energy-kcal_prepared_serving"] ||
								food.nutriments["energy-kj_prepared_serving"]))
							? food.nutriments["energy-kcal_serving"]
								? Number(food.nutriments["energy-kcal_serving"]).toFixed(1) + " kcal"
								: food.nutriments["energy-kj_serving"]
								? (Number(food.nutriments["energy-kj_serving"]) / 4.184).toFixed(1) + " kcal"
								: food.nutriments["energy-kcal_prepared_serving"]
								? Number(food.nutriments["energy-kcal_prepared_serving"]).toFixed(1) + " kcal"
								: food.nutriments["energy-kj_prepared_serving"]
								? (Number(food.nutriments["energy-kj_prepared_serving"]) / 4.184).toFixed(1) + " kcal"
								: (Number(food.nutriments["energy-kj_100g"]) / 4.184).toFixed(1) + " kcal"
							: food.nutriments["energy-kcal_100g"]
							? Number(food.nutriments["energy-kcal_100g"]).toFixed(1) + " kcal"
							: food.nutriments["energy-kj_100g"]
							? (Number(food.nutriments["energy-kj_100g"]) / 4.184).toFixed(1) + " kcal"
							: "-"}
					</p>
					<p>
						Protein:{" "}
						{food.serving_quantity || food.serving_size
							? food.nutriments.proteins_serving
								? Number(food.nutriments.proteins_serving).toFixed(1) + "g"
								: food.nutriments.proteins_100g
								? Number(food.nutriments.proteins_100g).toFixed(1) + "g"
								: food.nutriments.proteins_prepared_serving
								? Number(food.nutriments.proteins_prepared_serving).toFixed(1) + "g"
								: "-"
							: food.nutriments.proteins_100g
							? Number(food.nutriments.proteins_100g).toFixed(1) + "g"
							: "-"}
					</p>
					<p>
						Carbohydrate:{" "}
						{food.serving_size
							? food.nutriments.carbohydrates_serving
								? Number(food.nutriments.carbohydrates_serving).toFixed(1) + "g"
								: food.nutriments.carbohydrates_100g
								? Number(food.nutriments.carbohydrates_100g).toFixed(1) + "g"
								: food.nutriments.carbohydrates_prepared_serving
								? Number(food.nutriments.carbohydrates_prepared_serving).toFixed(1) + "g"
								: "-"
							: food.nutriments.carbohydrates_100g
							? Number(food.nutriments.carbohydrates_100g).toFixed(1) + "g"
							: "-"}
					</p>
					<p>
						Fat:{" "}
						{food.serving_size
							? food.nutriments.fat_serving
								? Number(food.nutriments.fat_serving).toFixed(1) + "g"
								: food.nutriments.fat_100g
								? Number(food.nutriments.fat_100g).toFixed(1) + "g"
								: food.nutriments.fat_prepared_serving
								? Number(food.nutriments.fat_prepared_serving).toFixed(1) + "g"
								: "-"
							: food.nutriments.fat_100g
							? Number(food.nutriments.fat_100g).toFixed(1) + "g"
							: "-"}
					</p>
				</div>
				<div className="flex flex-col items-center gap-2">
					<button
						className="bg-white text-black self-center btn"
						onClick={async () => {
							dispatch(setChosenBrandFood(food));
							await AddProductToUserHistory((await GetUserID()) as string, {
								productName: food.product_name
									? food.product_name
									: food.product_name_en
									? food.product_name_en
									: food.abbreviated_product_name
									? food.abbreviated_product_name
									: food.generic_name_en
									? food.generic_name_en
									: food.generic_name_de
									? food.generic_name_de
									: food.generic_name_fr
									? food.generic_name_fr
									: food.generic_name,
								category: "brand",
								timestamp: Date.now()
							});
							router.push("/nutrition/tools/foodDetail");
						}}
					>
						See all details
					</button>
					{/* <button
					// onClick={() => {
					// 	foodDetailModalShowHandler(food);
					// }}
					className="self-start rounded-md font-bold"
				>
					Go to all details
				</button> */}
					<Button className="bg-white text-black rounded-md font-bold" onClick={(e) => e.stopPropagation()}>
						Add to diary
					</Button>
				</div>
			</div>
			{/* {selectedBrandFoodData?._id === food._id && <BrandFoodDetailCard food={food} />} */}
		</div>
	);
};

export default BrandFoodCard;
