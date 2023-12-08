"use client";
import { FC } from "react";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";

const FoodDetailsPage: FC = () => {
	const { currentFood, keywordValue, currentBrandFoodData } = useSelector((state: RootState) => state.foodFetch);

	console.log(currentBrandFoodData);

	{
		/* const calories =
		currentFood.foodNutrients
			.filter((nutrient) => nutrient.nutrientName.includes("Energy") || nutrient.nutrientName.includes("General"))
			.find((energy) => energy.unitName === "KCAL")?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Energy") || nutrient.nutrientName.includes("General"))
					.find((energy) => energy.unitName === "KCAL")?.value
			: 0;
	const carb =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")?.value
			: 0;
	const fiber =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Fiber, total dietary")).find((fiber) => fiber.unitName === "G")
			?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Fiber, total dietary")).find((fiber) => fiber.unitName === "G")
					?.value
			: 0;
	const sugar =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Sugars, total including NLEA")).find((sugar) => sugar.unitName === "G")
			?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Sugars, total including NLEA"))
					.find((sugar) => sugar.unitName === "G")?.value
			: 0;
	const protein =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((carb) => carb.unitName === "G")?.value
			: 0;

	const fat =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")?.value
			: 0;
	const fat1 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total saturated")).find((carb) => carb.unitName === "G")
			?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total saturated"))
					.find((carb) => carb.unitName === "G")?.value
			: 0;
	const fat2 =
		currentFood.foodNutrients
			.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total monounsaturated"))
			.find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total monounsaturated"))
					.find((carb) => carb.unitName === "G")?.value
			: 0;
	const fat3 =
		currentFood.foodNutrients
			.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total polyunsaturated"))
			.find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total polyunsaturated"))
					.find((carb) => carb.unitName === "G")?.value
			: 0;
	const fat4 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total trans")).find((carb) => carb.unitName === "G")
			?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total trans")).find((carb) => carb.unitName === "G")
					?.value
			: 0;
	const fat5 =
		currentFood.foodNutrients
			.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total trans-polyenoic"))
			.find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Fatty acids, total trans-polyenoic"))
					.find((carb) => carb.unitName === "G")?.value
			: 0;
	const vitaminB1 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-1")).find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-1")).find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const vitaminB2 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-2")).find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-2")).find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const vitaminB3 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-3")).find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-3")).find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const vitaminB5 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-5")).find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-5")).find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const vitaminB6 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-6")).find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-6")).find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const vitaminB7 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-7")).find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-7")).find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const vitaminB9 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-9")).find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-9")).find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const vitaminB12 =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-12")).find((vitamin) => vitamin.unitName === "UG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin B-12")).find((vitamin) => vitamin.unitName === "UG")
					?.value!
			: 0;
	const vitaminA =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin A, IU")).find((vitamin) => vitamin.unitName === "IU")?.value! >=
		0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin A, IU")).find((vitamin) => vitamin.unitName === "IU")
					?.value!
			: 0;
	const vitaminD =
		currentFood.foodNutrients
			.filter((nutrient) => nutrient.nutrientName.includes("Vitamin D (D2 + D3), International Units"))
			.find((vitamin) => vitamin.unitName === "IU")?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Vitamin D (D2 + D3), International Units"))
					.find((vitamin) => vitamin.unitName === "IU")?.value!
			: 0;
	const vitaminE =
		currentFood.foodNutrients
			.filter((nutrient) => nutrient.nutrientName.includes("Vitamin E (alpha-tocopherol)"))
			.find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Vitamin E (alpha-tocopherol)"))
					.find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const vitaminC =
		currentFood.foodNutrients
			.filter((nutrient) => nutrient.nutrientName.includes("Vitamin C, total ascorbic acid"))
			.find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients
					.filter((nutrient) => nutrient.nutrientName.includes("Vitamin C, total ascorbic acid"))
					.find((vitamin) => vitamin.unitName === "MG")?.value!
			: 0;
	const iron =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Iron, Fe")).find((mineral) => mineral.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Iron, Fe")).find((mineral) => mineral.unitName === "MG")?.value!
			: 0;
	const magnesium =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Magnesium, Mg")).find((mineral) => mineral.unitName === "MG")?.value! >=
		0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Magnesium, Mg")).find((mineral) => mineral.unitName === "MG")
					?.value!
			: 0;
	const potassium =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Potassium, K")).find((mineral) => mineral.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Potassium, K")).find((mineral) => mineral.unitName === "MG")
					?.value!
			: 0;
	const cholesterol =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Cholesterol")).find((mineral) => mineral.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Cholesterol")).find((mineral) => mineral.unitName === "MG")?.value!
			: 0;
	const sodium =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Sodium, Na")).find((mineral) => mineral.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Sodium, Na")).find((mineral) => mineral.unitName === "MG")?.value!
			: 0;
	const zinc =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Zinc, Zn")).find((mineral) => mineral.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Zinc, Zn")).find((mineral) => mineral.unitName === "MG")?.value!
			: 0;
	const calcium =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Calcium, Ca")).find((mineral) => mineral.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Calcium, Ca")).find((mineral) => mineral.unitName === "MG")?.value!
			: 0;
	const water =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Water")).find((mineral) => mineral.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Water")).find((mineral) => mineral.unitName === "G")?.value!
			: 0;
	const caffeine =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Caffeine")).find((mineral) => mineral.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Caffeine")).find((mineral) => mineral.unitName === "MG")?.value!
			: 0;

	const calorieIntakePercentage = ((calories! / 2000) * 100).toFixed(2);

	const carbIntakePercentage = ((carb! / 300) * 100).toFixed(2);

	const proteinIntakePercentage = ((protein! / 160) * 100).toFixed(2);

	const fatIntakePercentage = ((fat! / 60) * 100).toFixed(2) */
	}

	const calorieIntakePercentage = ((currentBrandFoodData.nutriments["energy-kcal_100g"] / 2000) * 100).toFixed(2);

	const carbIntakePercentage = ((currentBrandFoodData.nutriments.carbohydrates_100g / 300) * 100).toFixed(2);

	const proteinIntakePercentage = ((currentBrandFoodData.nutriments.proteins_100g / 160) * 100).toFixed(2);

	const fatIntakePercentage = ((currentBrandFoodData.nutriments.fat_100g / 60) * 100).toFixed(2);

	return (
		<>
			<div className="min-h-screen flex flex-col gap-4 bg-black text-white">
				<Link href={"/nutrition/tools"}>Back {keywordValue} search results</Link>
				<p className="text-xl">
					{currentBrandFoodData.brands ? currentBrandFoodData.brands + " - " : ""}
					{/* {food.generic_name_en
											? food.generic_name_en
											: food.generic_name_de
											? food.generic_name_de
											: food.generic_name_fr
											? food.generic_name_fr
											: food.generic_name} */}
					{/* {food.abbreviated_product_name} */}
					{currentBrandFoodData.product_name_en
						? currentBrandFoodData.product_name_en
						: currentBrandFoodData.product_name
						  ? currentBrandFoodData.product_name
						  : currentBrandFoodData.abbreviated_product_name
						    ? currentBrandFoodData.abbreviated_product_name
						    : currentBrandFoodData.generic_name_en
						      ? currentBrandFoodData.generic_name_en
						      : currentBrandFoodData.generic_name_de
						        ? currentBrandFoodData.generic_name_de
						        : currentBrandFoodData.generic_name_fr
						          ? currentBrandFoodData.generic_name_fr
						          : currentBrandFoodData.generic_name}
				</p>
				<p className="flex gap-1 items-center">
					<span>Nutrition Score: </span>
					<strong
						className={`text-2xl ${
							currentBrandFoodData.nutrition_grades === "a"
								? "text-green-500"
								: currentBrandFoodData.nutrition_grades === "b"
								  ? "text-green-300"
								  : currentBrandFoodData.nutrition_grades === "c"
								    ? "text-yellow-400"
								    : currentBrandFoodData.nutrition_grades === "d"
								      ? "text-orange-400"
								      : "text-red-500"
						}`}
					>
						{currentBrandFoodData.nutrition_grades ? currentBrandFoodData.nutrition_grades.toUpperCase() : "?"}
					</strong>
				</p>
				<p>INGREDIENTS</p>
				<div className="flex flex-col">
					{/* {+" " + ingredient.percent_estimate + " %"} */}
					{currentBrandFoodData.ingredients?.length >= 1 &&
						currentBrandFoodData.ingredients.map((ingredient, index) => (
							<span key={ingredient.text}>{ingredient.id.split(":")[1] !== "ingredients" ? ingredient.id.split(":")[1] : ""}</span>
						))}
				</div>
				<div className="divide-y-2 p-1">
					<p className="text-white p-2 flex justify-between items-center">
						Meal
						<button>Select meal</button>
					</p>
					<p className="text-white p-2 flex items-center justify-between">
						Portion count
						<input type="number" className="self-end w-16" placeholder="1" />
					</p>
					<p className="text-white p-2 flex justify-between items-center">
						Portion amount
						<input type="number" className="self-end w-16" placeholder="100gr" />
					</p>
					<div className="text-white p-2 flex justify-between items-center">
						<p className="flex flex-col">
							Calories <span>{currentBrandFoodData.nutriments["energy-kcal_100g"]} kcal</span>
						</p>
						{/* Need to add better find */}
						<p className="flex flex-col">
							Carbohydrate <span>{currentBrandFoodData.nutriments.carbohydrates_100g} g</span>
						</p>
						<p className="flex flex-col">
							Protein <span>{currentBrandFoodData.nutriments.proteins_100g} g</span>
						</p>
						<p className="flex flex-col">
							Fat <span>{currentBrandFoodData.nutriments.fat} g</span>
						</p>
					</div>
					<div className="text-white p-2 flex flex-col">
						Daily target macronutrient intake percentages
						<div className="flex flex-wrap gap-10 items-center justify-center mt-2 w-full">
							<div className="flex flex-col w-[25%]">
								Calories
								<div className="flex flex-col items-center">
									<span>{calorieIntakePercentage}%</span>
									<div className="w-full bg-red-500 h-2">
										<div className="bg-blue-500 h-full max-w-[100%]" style={{ width: calorieIntakePercentage + "%" }}></div>
									</div>
								</div>
								<span className="text-sm">2000 kcal</span>
							</div>
							<div className="flex flex-col w-[25%]">
								Carbohydrate
								<div className="flex flex-col items-center">
									<span>{carbIntakePercentage}%</span>
									<div className="w-full bg-red-500 h-2">
										<div className="bg-blue-500 h-full max-w-[100%]" style={{ width: carbIntakePercentage + "%" }}></div>
									</div>
								</div>
								<span className="text-sm">300 gr</span>
							</div>
							<div className="flex flex-col w-[25%]">
								Protein
								<div className="flex flex-col items-center">
									<span>{proteinIntakePercentage}%</span>
									<div className="w-full bg-red-500 h-2">
										<div className="bg-blue-500 h-full max-w-[100%]" style={{ width: proteinIntakePercentage + "%" }}></div>
									</div>
								</div>
								<span className="text-sm">160 gr</span>
							</div>
							<div className="flex flex-col w-[25%]">
								Fat
								<div className="flex flex-col items-center">
									<span>{fatIntakePercentage}%</span>
									<div className="w-full bg-red-500 h-2">
										<div className="bg-blue-500 h-full max-w-[100%]" style={{ width: fatIntakePercentage + "%" }}></div>
									</div>
								</div>
								<span className="text-sm">60 gr</span>
							</div>
						</div>
					</div>
					<div className="divide-y-2 flex flex-col gap-3">
						<p className="flex items-center justify-between">
							Calories{" "}
							<span>
								{currentBrandFoodData.nutriments["energy-kcal_100g"] >= 0
									? currentBrandFoodData.nutriments["energy-kcal_100g"] + " kcal "
									: "?"}
							</span>
						</p>
						<p className="flex items-center justify-between">
							Protein{" "}
							<span>{currentBrandFoodData.nutriments.proteins_100g >= 0 ? currentBrandFoodData.nutriments.proteins_100g + " g" : "?"}</span>
						</p>
						<div className="flex flex-col gap-1">
							<p className="flex items-center justify-between">
								Carbohydrate{" "}
								<span>
									{currentBrandFoodData.nutriments.carbohydrates_100g >= 0 ? currentBrandFoodData.nutriments.carbohydrates_100g + " g" : "?"}
								</span>
							</p>
							<p className="flex items-center justify-between">
								Fiber <span>{currentBrandFoodData.nutriments.fiber_100g >= 0 ? currentBrandFoodData.nutriments.fiber_100g + " g" : "?"}</span>
							</p>
							<p className="flex items-center justify-between">
								Sugar <span>{currentBrandFoodData.nutriments.sugars_100g >= 0 ? currentBrandFoodData.nutriments.sugars_100g + " g" : "?"}</span>
							</p>
						</div>
						<div className="flex flex-col gap-1">
							<p className="flex items-center justify-between">
								Fat <span>{currentBrandFoodData.nutriments.fat_100g >= 0 ? currentBrandFoodData.nutriments.fat_100g + " g" : "?"}</span>
							</p>
							<p className="flex items-center justify-between">
								Fatty acids, total saturated{" "}
								<span>
									{currentBrandFoodData.nutriments["saturated-fat_100g"] >= 0
										? currentBrandFoodData.nutriments["saturated-fat_100g"] + " g"
										: "?"}{" "}
								</span>
							</p>
							{/* <p className="flex items-center justify-between">
								Fatty acids, total monounsaturated <span> g</span>
							</p>
							<p className="flex items-center justify-between">
								Fatty acids, total polyunsaturated <span> g</span>
							</p>
							<p className="flex items-center justify-between">
								Fatty acids, total trans <span> g</span>
							</p>
							<p className="flex items-center justify-between">
								Fatty acids, total trans-polyenoic <span> g</span>
							</p> */}
						</div>
						<p className="flex items-center justify-between">
							Salt <span>{currentBrandFoodData.nutriments.salt_100g >= 0 ? currentBrandFoodData.nutriments.salt_100g : 0} g</span>
						</p>
						<p className="flex items-center justify-between">
							Sodium <span>{currentBrandFoodData.nutriments.sodium_100g >= 0 ? currentBrandFoodData.nutriments.sodium_100g : 0} g</span>
						</p>
						{/* <p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p>
						<p className="flex items-center justify-between"></p> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default FoodDetailsPage;
