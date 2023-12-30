import { BrandFoodSearchResultTypes } from "@/src/types/types";
import { RootState } from "@/src/utils/redux/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import { percentageCalculator } from "../../nutritionSegment/calorie/CalorieGoalCard";
import { Button } from "../../UI/Button/Button";

// const findNutrientValue = (food: BrandFoodSearchResultTypes | null, nutrientName: string, unitName: string) => {
// 	const keys = Object.keys(food?.nutriments);

// 	const nutrient = keys.find(({ nutrientName: name }) => name === nutrientName);
// 	return nutrient && nutrient.value >= 1 ? nutrient.value : 0;
// };

const getNutrientValue = (nutrient: string, unit: string, data: BrandFoodSearchResultTypes | null) => {
	const nutrientData = data?.nutriments[nutrient];
	if (!nutrientData) return "-";

	switch (unit) {
		case "g":
		case "kcal":
			return nutrientData;
		case "mg":
			return (nutrientData as number) * 1000;
		default:
			return (nutrientData as number) * 1000000;
	}
};

const checkAndDisplayNutrientValue = (nutrient: string, nutrientValues: any, unit: string) => {
	const value = nutrientValues[nutrient];
	return value > 0 ? `${value} ${unit}` : "-";
};

interface BrandFoodDetailsProps {}

interface NutrientValues {
	[key: string]: string | number;
}

const BrandFoodDetails: FC<BrandFoodDetailsProps> = ({}) => {
	const { selectedBrandFoodData } = useSelector((state: RootState) => state.foodFetch);

	const nutrientMapping = {
		"energy-kcal_100g": "kcal",
		carbohydrates_100g: "g",
		sugars_100g: "g",
		fiber_100g: "g",
		fat_100g: "g",
		"trans-fat_100g": "g",
		"saturated-fat_100g": "g",
		cholesterol_100g: "g",
		proteins_100g: "g",
		"omega-3-fat_100g": "g",
		caffeine_100g: "g",
		iron_100g: "mg",
		magnesium_100g: "mg",
		potassium_100g: "mg",
		zinc_100g: "mg",
		salt_100g: "g",
		sodium_100g: "mg",
		calcium_100g: "mg",
		"vitamin-d_100g": "µg",
		"vitamin-b12_100g": "µg",
		"vitamin-b6_100g": "mg",
		"vitamin-c_100g": "mg",
		"vitamin-a_100g": "µg"
	};

	let nutrientValues: NutrientValues = {};

	for (let [nutrient, unit] of Object.entries(nutrientMapping)) {
		nutrientValues[nutrient] = getNutrientValue(nutrient, unit, selectedBrandFoodData);
	}

	const brandName = selectedBrandFoodData?.brands;

	const productName = selectedBrandFoodData
		? selectedBrandFoodData.product_name_en
			? selectedBrandFoodData.product_name_en
			: selectedBrandFoodData.product_name
				? selectedBrandFoodData.product_name
				: selectedBrandFoodData.abbreviated_product_name
					? selectedBrandFoodData.abbreviated_product_name
					: selectedBrandFoodData.generic_name_en
						? selectedBrandFoodData.generic_name_en
						: selectedBrandFoodData.generic_name_de
							? selectedBrandFoodData.generic_name_de
							: selectedBrandFoodData.generic_name_fr
								? selectedBrandFoodData.generic_name_fr
								: selectedBrandFoodData.generic_name
		: "";

	const caloriePercentage = percentageCalculator(2500, nutrientValues["energy-kcal_100g"] as number);
	const proteinPercentage = percentageCalculator(150, nutrientValues["proteins_100g"] as number);
	const carbohydratePercentage = percentageCalculator(370, nutrientValues["carbohydrates_100g"] as number);
	const fatPercentage = percentageCalculator(72, nutrientValues["fat_100g"] as number);

	console.log(nutrientValues, selectedBrandFoodData);

	return (
		<div className="mt-5 divide-y-2 space-y-2">
			<p className="text-2xl font-bold">{brandName + " - " + productName}</p>
			<Button>Add meal</Button>
			<p className="border-none">Serving size 100 grams</p>
			<p>Calorie: {checkAndDisplayNutrientValue("energy-kcal_100g", nutrientValues, "kcal")}</p>
			<p>Protein: {checkAndDisplayNutrientValue("proteins_100g", nutrientValues, "g")}</p>
			<div>
				<p>Carbohydrate: {checkAndDisplayNutrientValue("carbohydrates_100g", nutrientValues, "g")}</p>
				<div className="ml-5">
					<p>Fiber: {checkAndDisplayNutrientValue("fiber_100g", nutrientValues, "g")}</p>
					<p>Sugars: {checkAndDisplayNutrientValue("sugars_100g", nutrientValues, "g")}</p>
				</div>
			</div>
			<div>
				<p>Fat: {checkAndDisplayNutrientValue("fat_100g", nutrientValues, "g")}</p>
				<div className="ml-5">
					<p>Saturated fat: {checkAndDisplayNutrientValue("saturated-fat_100g", nutrientValues, "g")}</p>
					<p>Trans fat: {checkAndDisplayNutrientValue("trans-fat_100g", nutrientValues, "g")}</p>
					<p>Cholesterol: {checkAndDisplayNutrientValue("cholesterol_100g", nutrientValues, "g")}</p>
				</div>
			</div>
			<p>Salt: {checkAndDisplayNutrientValue("salt_100g", nutrientValues, "g")}</p>
			<p>Caffeine: {checkAndDisplayNutrientValue("caffeine_100g", nutrientValues, "g")}</p>
			<div className="w-full flex flex-col">
				<p>Daily goal achievement percentage with this</p>
				<div className="flex flex-wrap gap-5 items-center justify-center w-full mt-2">
					<div className="flex flex-col text-center w-[35%]">
						<p>Calorie</p>
						<div className="w-full bg-red-500 h-2 rounded-md">
							<div className="bg-blue-500 h-full max-w-[100%] rounded-md" style={{ width: caloriePercentage + "%" }}></div>
						</div>
						<div className="flex items-center text-sm justify-between mt-1">
							<span>{caloriePercentage}%</span>
							<p>of 2500 kcal</p>
						</div>
					</div>
					<div className="flex flex-col text-center w-[35%]">
						<p>Protein</p>
						<div className="w-full bg-red-500 h-2 rounded-md">
							<div className="bg-blue-500 h-full max-w-[100%] rounded-md" style={{ width: proteinPercentage + "%" }}></div>
						</div>
						<div className="flex items-center text-sm justify-between mt-1">
							<span>{proteinPercentage}%</span>
							<p>of 150 gram</p>
						</div>
					</div>
					<div className="flex flex-col text-center w-[35%]">
						<p>Carbohydrate</p>
						<div className="w-full bg-red-500 h-2 rounded-md">
							<div className="bg-blue-500 h-full max-w-[100%] rounded-md" style={{ width: carbohydratePercentage + "%" }}></div>
						</div>
						<div className="flex items-center text-sm justify-between mt-1">
							<span>{carbohydratePercentage}%</span>
							<p>of 370 gram</p>
						</div>
					</div>
					<div className="flex flex-col text-center w-[35%]">
						<p>Fat</p>
						<div className="w-full bg-red-500 h-2 rounded-md">
							<div className="bg-blue-500 h-full max-w-[100%] rounded-md" style={{ width: fatPercentage + "%" }}></div>
						</div>
						<div className="flex items-center text-sm justify-between mt-1">
							<span>{fatPercentage}%</span>
							<p>of 72 gram</p>
						</div>
					</div>
				</div>
			</div>
			<p className="border-none text-2xl font-bold">Vitamins</p>
			<p>Vitamin A: {checkAndDisplayNutrientValue("vitamin-a_100g", nutrientValues, "µg")}</p>
			<p>Vitamin B-6: {checkAndDisplayNutrientValue("vitamin-b6_100g", nutrientValues, "mg")}</p>
			<p>Vitamin B-12: {checkAndDisplayNutrientValue("vitamin-b12_100g", nutrientValues, "µg")}</p>
			<p>Vitamin C: {checkAndDisplayNutrientValue("vitamin-c_100g", nutrientValues, "mg")}</p>
			<p>Vitamin D: {checkAndDisplayNutrientValue("vitamin-d_100g", nutrientValues, "µg")}</p>
			<p className="border-none text-2xl font-bold">Minerals</p>
			<p>Calcium: {checkAndDisplayNutrientValue("calcium_100g", nutrientValues, "mg")}</p>
			<p>Iron: {checkAndDisplayNutrientValue("iron_100g", nutrientValues, "mg")}</p>
			<p>Potassium: {checkAndDisplayNutrientValue("potassium_100g", nutrientValues, "mg")}</p>
			<p>Magnesium: {checkAndDisplayNutrientValue("magnesium_100g", nutrientValues, "mg")}</p>
			<p>Sodium: {checkAndDisplayNutrientValue("sodium_100g", nutrientValues, "mg")}</p>
			<p>Zinc: {checkAndDisplayNutrientValue("zinc_100g", nutrientValues, "mg")}</p>
		</div>
	);
};

export default BrandFoodDetails;
