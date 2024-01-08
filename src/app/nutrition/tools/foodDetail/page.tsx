"use client";
import { FC } from "react";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import CoreFoodDetails from "@/src/components/FoodSearcher/FoodDetails/CoreFoodDetails";
import BrandFoodDetails from "@/src/components/FoodSearcher/FoodDetails/BrandFoodDetails";

const FoodDetailsPage: FC = () => {
	const { keywordValue, coreFoodData } = useSelector((state: RootState) => state.foodFetch);

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

	// const calorieIntakePercentage = ((currentBrandFoodData.nutriments["energy-kcal_100g"] / 2000) * 100).toFixed(2);

	// const carbIntakePercentage = ((currentBrandFoodData.nutriments.carbohydrates_100g / 300) * 100).toFixed(2);

	// const proteinIntakePercentage = ((currentBrandFoodData.nutriments.proteins_100g / 160) * 100).toFixed(2);

	// const fatIntakePercentage = ((currentBrandFoodData.nutriments.fat_100g / 60) * 100).toFixed(2);

	return (
		<>
			<Link href={"/nutrition/tools"}>Back to {keywordValue} search results</Link>
			{coreFoodData ? <CoreFoodDetails /> : <BrandFoodDetails />}
		</>
	);
};

export default FoodDetailsPage;
