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
		case "kJ":
			return nutrientData;
		case "mg":
			return (nutrientData as number) * 1000;
		default:
			return (nutrientData as number) * 1000000;
	}
};

const checkAndDisplayNutrientValue = (nutrient: string, nutrientValues: any, unit: string) => {
	let value = 0;
	if (nutrient.includes("kj_100g") || nutrient.includes("kj_serving") || nutrient.includes("kj_prepared_serving")) {
		value = nutrientValues[nutrient] / 4.184;
	} else {
		value = nutrientValues[nutrient];
	}
	return value > 0 ? `${value.toFixed(1)} ${unit}` : "-";
};

interface BrandFoodDetailsProps {}

interface NutrientValues {
	[key: string]: string | number;
}

const BrandFoodDetails: FC<BrandFoodDetailsProps> = ({}) => {
	const { selectedBrandFoodData } = useSelector((state: RootState) => state.foodFetch);

	const nutrientMapping = {
		"energy-kcal_100g": "kcal",
		"energy-kcal_serving": "kcal",
		"energy-kcal_prepared_serving": "kcal",
		"energy-kj_prepared_serving": "kcal",
		"energy-kj_100g": "kJ",
		"energy-kj_serving": "kJ",
		carbohydrates_100g: "g",
		carbohydrates_serving: "g",
		carbohydrates_prepared_serving: "g",
		sugars_100g: "g",
		sugars_serving: "g",
		sugars_prepared_serving: "g",
		fiber_100g: "g",
		fiber_serving: "g",
		fiber_prepared_serving: "g",
		fat_100g: "g",
		fat_serving: "g",
		fat_prepared_serving: "g",
		"trans-fat_100g": "g",
		"trans-fat_prepared_serving": "g",
		"trans-fat_serving": "g",
		"saturated-fat_100g": "g",
		"saturated-fat_prepared_serving": "g",
		"saturated-fat_serving": "g",
		cholesterol_100g: "g",
		cholesterol_serving: "mg",
		cholesterol_prepared_serving: "mg",
		proteins_100g: "g",
		proteins_serving: "g",
		proteins_prepared_serving: "g",
		"omega-3-fat_100g": "g",
		caffeine_100g: "g",
		iron_100g: "mg",
		iron_serving: "mg",
		iron_prepared_serving: "mg",
		magnesium_100g: "mg",
		magnesium_serving: "mg",
		magnesium_prepared_serving: "mg",
		potassium_100g: "mg",
		potassium_serving: "mg",
		potassium_prepared_serving: "mg",
		zinc_100g: "mg",
		zinc_serving: "mg",
		zinc_prepared_serving: "mg",
		salt_100g: "g",
		salt_serving: "g",
		salt_prepared_serving: "g",
		sodium_100g: "mg",
		sodium_serving: "mg",
		sodium_prepared_serving: "mg",
		calcium_100g: "mg",
		calcium_serving: "mg",
		calcium_prepared_serving: "mg",
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

	const caloriePercentage = percentageCalculator(
		2500,
		selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
			? selectedBrandFoodData.nutriments["energy-kcal_serving"]
				? selectedBrandFoodData.nutriments["energy-kcal_serving"]
				: selectedBrandFoodData.nutriments["energy-kj_serving"]
				? selectedBrandFoodData.nutriments["energy-kj_serving"] / 4.184
				: selectedBrandFoodData.nutriments["energy-kcal_prepared_serving"]
				? selectedBrandFoodData.nutriments["energy-kcal_prepared_serving"]
				: selectedBrandFoodData.nutriments["energy-kj_prepared_serving"]
				? selectedBrandFoodData.nutriments["energy-kj_prepared_serving"] / 4.184
				: selectedBrandFoodData.nutriments["energy-kj_100g"] / 4.184
			: (selectedBrandFoodData?.nutriments["energy-kcal_100g"] as number)
	);
	const proteinPercentage = percentageCalculator(
		150,
		selectedBrandFoodData?.serving_quantity || selectedBrandFoodData?.serving_size
			? selectedBrandFoodData.nutriments.proteins_serving
				? selectedBrandFoodData.nutriments.proteins_serving
				: selectedBrandFoodData.nutriments.proteins_100g
				? selectedBrandFoodData.nutriments.proteins_100g
				: selectedBrandFoodData.nutriments.proteins_prepared_serving
				? selectedBrandFoodData.nutriments.proteins_prepared_serving
				: 0
			: selectedBrandFoodData?.nutriments.proteins_100g
			? (selectedBrandFoodData.nutriments.proteins_100g as number)
			: 0
	);
	const carbohydratePercentage = percentageCalculator(
		370,
		selectedBrandFoodData?.serving_quantity || selectedBrandFoodData?.serving_size
			? selectedBrandFoodData.nutriments.carbohydrates_serving
				? selectedBrandFoodData.nutriments.carbohydrates_serving
				: selectedBrandFoodData.nutriments.carbohydrates_100g
				? selectedBrandFoodData.nutriments.carbohydrates_100g
				: selectedBrandFoodData.nutriments.carbohydrates_prepared_serving
				? selectedBrandFoodData.nutriments.carbohydrates_prepared_serving
				: 0
			: selectedBrandFoodData?.nutriments.carbohydrates_100g
			? (selectedBrandFoodData.nutriments.carbohydrates_100g as number)
			: 0
	);
	const fatPercentage = percentageCalculator(
		72,
		selectedBrandFoodData?.serving_quantity || selectedBrandFoodData?.serving_size
			? selectedBrandFoodData.nutriments.fat_serving
				? (selectedBrandFoodData.nutriments.fat_serving as number)
				: selectedBrandFoodData.nutriments.fat_100g
				? (selectedBrandFoodData.nutriments.fat_100g as number)
				: selectedBrandFoodData.nutriments.fat_prepared_serving
				? (selectedBrandFoodData.nutriments.fat_prepared_serving as number)
				: 0
			: selectedBrandFoodData?.nutriments.fat_100g
			? (selectedBrandFoodData.nutriments.fat_100g as number)
			: 0
	);

	console.log(nutrientValues, selectedBrandFoodData);

	return (
		<div className="mt-5 divide-y-2 space-y-2">
			<p className="text-2xl font-bold">{brandName + " - " + productName}</p>
			<Button>Add meal</Button>
			<p className="border-none">
				Serving size{" "}
				{selectedBrandFoodData?.serving_quantity &&
				(selectedBrandFoodData?.nutriments["energy-kcal_serving"] ||
					selectedBrandFoodData?.nutriments["energy-kj_serving"] ||
					selectedBrandFoodData?.nutriments["energy-kcal_prepared_serving"] ||
					selectedBrandFoodData?.nutriments["energy-kj_prepared_serving"])
					? selectedBrandFoodData?.serving_quantity + "g"
					: selectedBrandFoodData?.serving_size && !selectedBrandFoodData?.serving_quantity
					? selectedBrandFoodData?.serving_size
					: selectedBrandFoodData?.nutriments["energy-kcal_100g"] || selectedBrandFoodData?.nutriments["energy-kj_100g"]
					? "100g"
					: "Unknown"}{" "}
			</p>

			<p>
				Calorie:{" "}
				{checkAndDisplayNutrientValue(
					selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
						? selectedBrandFoodData.nutriments["energy-kcal_serving"]
							? "energy-kcal_serving"
							: selectedBrandFoodData.nutriments["energy-kj_serving"]
							? "energy-kj_serving"
							: selectedBrandFoodData.nutriments["energy-kcal_prepared_serving"]
							? "energy-kcal_prepared_serving"
							: selectedBrandFoodData.nutriments["energy-kj_prepared_serving"]
							? "energy-kj_prepared_serving"
							: "energy-kj_100g"
						: selectedBrandFoodData?.nutriments["energy-kcal_100g"]
						? "energy-kcal_100g"
						: "energy-kj_100g",
					nutrientValues,
					"kcal"
				)}
			</p>
			<p>
				Protein:{" "}
				{checkAndDisplayNutrientValue(
					selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
						? selectedBrandFoodData.nutriments.proteins_serving
							? "proteins_serving"
							: selectedBrandFoodData.nutriments.proteins_prepared_serving
							? "proteins_prepared_serving"
							: "proteins_100g"
						: selectedBrandFoodData?.nutriments.proteins_100g
						? "proteins_100g"
						: "",
					nutrientValues,
					"g"
				)}
			</p>
			<div>
				<p>
					Carbohydrate:{" "}
					{checkAndDisplayNutrientValue(
						selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
							? selectedBrandFoodData.nutriments.carbohydrates_serving
								? "carbohydrates_serving"
								: selectedBrandFoodData.nutriments.carbohydrates_prepared_serving
								? "carbohydrates_prepared_serving"
								: "carbohydrates_100g"
							: selectedBrandFoodData?.nutriments.carbohydrates_100g
							? "carbohydrates_100g"
							: "",
						nutrientValues,
						"g"
					)}
				</p>
				<div className="ml-5">
					<p>
						Fiber:{" "}
						{checkAndDisplayNutrientValue(
							selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
								? selectedBrandFoodData.nutriments.fiber_serving
									? "fiber_serving"
									: selectedBrandFoodData.nutriments.fiber_prepared_serving
									? "fiber_prepared_serving"
									: "fiber_100g"
								: selectedBrandFoodData?.nutriments.fiber_100g
								? "fiber_100g"
								: "",
							nutrientValues,
							"g"
						)}
					</p>
					<p>
						Sugars:{" "}
						{checkAndDisplayNutrientValue(
							selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
								? selectedBrandFoodData.nutriments.sugars_serving
									? "sugars_serving"
									: selectedBrandFoodData.nutriments.sugars_prepared_serving
									? "sugars_prepared_serving"
									: "sugars_100g"
								: selectedBrandFoodData?.nutriments.sugars_100g
								? "sugars_100g"
								: "",
							nutrientValues,
							"g"
						)}
					</p>
				</div>
			</div>
			<div>
				<p>
					Fat:{" "}
					{checkAndDisplayNutrientValue(
						selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
							? selectedBrandFoodData.nutriments.fat_serving
								? "fat_serving"
								: selectedBrandFoodData.nutriments.fat_prepared_serving
								? "fat_prepared_serving"
								: "fat_100g"
							: selectedBrandFoodData?.nutriments.fat_100g
							? "fat_100g"
							: "",
						nutrientValues,
						"g"
					)}
				</p>
				<div className="ml-5">
					<p>
						Saturated fat:{" "}
						{checkAndDisplayNutrientValue(
							selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
								? selectedBrandFoodData.nutriments["saturated-fat_serving"]
									? "saturated-fat_serving"
									: selectedBrandFoodData.nutriments["saturated-fat_prepared_serving"]
									? "saturated-fat_prepared_serving"
									: "saturated-fat_100g"
								: selectedBrandFoodData?.nutriments["saturated-fat_100g"]
								? "saturated-fat_100g"
								: "",
							nutrientValues,
							"g"
						)}
					</p>
					<p>Trans fat: {checkAndDisplayNutrientValue("trans-fat_100g", nutrientValues, "g")}</p>
					<p>Cholesterol: {checkAndDisplayNutrientValue("cholesterol_100g", nutrientValues, "g")}</p>
				</div>
			</div>
			<p>
				Salt:{" "}
				{checkAndDisplayNutrientValue(
					selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
						? selectedBrandFoodData.nutriments.salt_serving
							? "salt_serving"
							: selectedBrandFoodData.nutriments.salt_prepared_serving
							? "salt_prepared_serving"
							: "salt_100g"
						: selectedBrandFoodData?.nutriments.salt_100g
						? "salt_100g"
						: "",
					nutrientValues,
					"g"
				)}
			</p>
			<p>Caffeine: {checkAndDisplayNutrientValue("caffeine_100g", nutrientValues, "g")}</p>
			<div className="w-full flex flex-col">
				<p>Daily goal achievement percentage with this</p>
				<div className="flex flex-wrap gap-5 items-center justify-center w-full mt-2">
					<div className="flex flex-col text-center w-[40%]">
						<p>Calorie</p>
						<div className="w-full bg-red-500 h-2 rounded-md">
							<div className="bg-blue-500 h-full max-w-[100%] rounded-md" style={{ width: caloriePercentage + "%" }}></div>
						</div>
						<div className="flex items-center text-sm justify-between mt-1">
							<span>{caloriePercentage}%</span>
							<p>of 2500 kcal</p>
						</div>
					</div>
					<div className="flex flex-col text-center w-[40%]">
						<p>Protein</p>
						<div className="w-full bg-red-500 h-2 rounded-md">
							<div className="bg-blue-500 h-full max-w-[100%] rounded-md" style={{ width: proteinPercentage + "%" }}></div>
						</div>
						<div className="flex items-center text-sm justify-between mt-1">
							<span>{proteinPercentage}%</span>
							<p>of 150 gram</p>
						</div>
					</div>
					<div className="flex flex-col text-center w-[40%]">
						<p>Carbohydrate</p>
						<div className="w-full bg-red-500 h-2 rounded-md">
							<div className="bg-blue-500 h-full max-w-[100%] rounded-md" style={{ width: carbohydratePercentage + "%" }}></div>
						</div>
						<div className="flex items-center text-sm justify-between mt-1">
							<span>{carbohydratePercentage}%</span>
							<p>of 370 gram</p>
						</div>
					</div>
					<div className="flex flex-col text-center w-[40%]">
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
			<p>
				Sodium:{" "}
				{checkAndDisplayNutrientValue(
					selectedBrandFoodData?.serving_size || selectedBrandFoodData?.serving_quantity
						? selectedBrandFoodData.nutriments.sodium_serving
							? "sodium_serving"
							: selectedBrandFoodData.nutriments.sodium_prepared_serving
							? "sodium_prepared_serving"
							: "sodium_100g"
						: selectedBrandFoodData?.nutriments.sodium_100g
						? "sodium_100g"
						: "",
					nutrientValues,
					"g"
				)}
			</p>
			<p>Zinc: {checkAndDisplayNutrientValue("zinc_100g", nutrientValues, "mg")}</p>
		</div>
	);
};

export default BrandFoodDetails;
