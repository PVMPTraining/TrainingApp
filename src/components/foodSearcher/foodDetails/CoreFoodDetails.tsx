import { FC } from "react";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import { CoreFoodSearchResultTypes } from "@/src/types/types";
import { Button } from "@/src/components/UI/Button/Button";
import { percentageCalculator } from "@/src/components/NutritionSegment/Calorie/CalorieGoalCard";

type NutrientValues = {
	[key: string]: number | "-" | undefined;
};

const findNutrientValue = (food: CoreFoodSearchResultTypes | null, nutrientName: string, unitName: string) => {
	const nutrient = food?.foodNutrients.find(({ nutrientName: name, unitName: unit }) => name === nutrientName && unit === unitName);
	return nutrient && nutrient.value <= 0 ? "-" : nutrient?.value;
};

const checkAndDisplayCoreNutrientValue = (nutrient: string, unit: string, nutrientValues: NutrientValues) => {
	const nutrientData = nutrientValues[nutrient];
	if (nutrientData) {
		if ((nutrientData as number) <= 0 || nutrientData === "-") {
			return "-";
		} else {
			return nutrientData.toFixed(1) + " " + unit;
		}
	} else {
		return "-";
	}
};

interface CoreFoodDetailsProps {}

const CoreFoodDetails: FC<CoreFoodDetailsProps> = ({}) => {
	const { selectedCoreFoodData } = useSelector((state: RootState) => state.foodFetch);

	const nutrientMapping = {
		Energy: "KCAL",
		Protein: "G",
		"Carbohydrate, by difference": "G",
		"Fiber, total dietary": "G",
		"Total Sugars": "G",
		"Total lipid (fat)": "G",
		"Fatty acids, total saturated": "G",
		"Fatty acids, total monounsaturated": "G",
		"Fatty acids, total polyunsaturated": "G",
		Cholesterol: "MG",
		Caffeine: "MG",
		"Zinc, Zn": "MG",
		"Iron, Fe": "MG",
		"Potassium, K": "MG",
		"Calcium, Ca": "MG",
		"Magnesium, Mg": "MG",
		"Sodium, Na": "MG",
		"Vitamin C, total ascorbic acid": "MG",
		"Vitamin A, IU": "IU",
		"Vitamin B-6": "MG",
		"Vitamin B-12": "UG",
		"Vitamin D (D2 + D3), International Units": "IU"
	};

	let nutrientValues: NutrientValues = {};

	for (let [nutrient, unit] of Object.entries(nutrientMapping)) {
		nutrientValues[nutrient] = findNutrientValue(selectedCoreFoodData, nutrient, unit);
	}

	const foodName = selectedCoreFoodData?.description;

	const caloriePercentage = percentageCalculator(2500, nutrientValues["Energy"] as number);
	const proteinPercentage = percentageCalculator(150, nutrientValues["Protein"] as number);
	const carbohydratePercentage = percentageCalculator(370, nutrientValues["Carbohydrate, by difference"] as number);
	const fatPercentage = percentageCalculator(72, nutrientValues["Total lipid (fat)"] as number);

	console.log(nutrientValues, selectedCoreFoodData, nutrientValues["Energy"]);

	return (
		<div className="mt-5 divide-y-2 space-y-2">
			<p className="text-2xl font-bold">{foodName}</p>
			<Button>Add meal</Button>
			<p className="border-none">Portion size 100g</p>
			<p>Calorie: {checkAndDisplayCoreNutrientValue("Energy", "kcal", nutrientValues)}</p>
			<p>Protein: {checkAndDisplayCoreNutrientValue("Protein", "g", nutrientValues)}</p>
			<div>
				<p>Carbohydrate: {checkAndDisplayCoreNutrientValue("Carbohydrate, by difference", "g", nutrientValues)}</p>
				<div className="ml-5">
					<p>Fiber: {checkAndDisplayCoreNutrientValue("Fiber, total dietary", "g", nutrientValues)}</p>
					<p>Sugars: {checkAndDisplayCoreNutrientValue("Total Sugars", "g", nutrientValues)}</p>
				</div>
			</div>
			<div>
				<p>Fat: {checkAndDisplayCoreNutrientValue("Total lipid (fat)", "g", nutrientValues)}</p>
				<div className="ml-5">
					<p>Saturated fat: {checkAndDisplayCoreNutrientValue("Fatty acids, total saturated", "g", nutrientValues)}</p>
					<p>Monounsaturated fat: {checkAndDisplayCoreNutrientValue("Fatty acids, total monounsaturated", "g", nutrientValues)}</p>
					<p>Polyunsaturated fat: {checkAndDisplayCoreNutrientValue("Fatty acids, total polyunsaturated", "g", nutrientValues)}</p>
					<p>Cholesterol: {checkAndDisplayCoreNutrientValue("Cholesterol", "g", nutrientValues)}</p>
				</div>
			</div>
			<p>Caffeine: {checkAndDisplayCoreNutrientValue("Caffeine", "mg", nutrientValues)}</p>
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
			<p>Vitamin A: {checkAndDisplayCoreNutrientValue("Vitamin A, IU", "IU", nutrientValues)}</p>
			<p>Vitamin B-6: {checkAndDisplayCoreNutrientValue("Vitamin B-6", "mg", nutrientValues)}</p>
			<p>Vitamin B-12: {checkAndDisplayCoreNutrientValue("Vitamin B-12", "µg", nutrientValues)}</p>
			<p>Vitamin C: {checkAndDisplayCoreNutrientValue("Vitamin C, total ascorbic acid", "mg", nutrientValues)}</p>
			<p>Vitamin D: {checkAndDisplayCoreNutrientValue("Vitamin D (D2 + D3), International Units", "IU", nutrientValues)}</p>
			<p className="border-none text-2xl font-bold">Minerals</p>
			<p>Calcium: {checkAndDisplayCoreNutrientValue("Calcium, Ca", "mg", nutrientValues)}</p>
			<p>Iron: {checkAndDisplayCoreNutrientValue("Iron, Fe", "mg", nutrientValues)}</p>
			<p>Potassium: {checkAndDisplayCoreNutrientValue("Potassium, K", "mg", nutrientValues)}</p>
			<p>Magnesium: {checkAndDisplayCoreNutrientValue("Magnesium, Mg", "mg", nutrientValues)}</p>
			<p>Sodium: {checkAndDisplayCoreNutrientValue("Sodium, Na", "mg", nutrientValues)}</p>
			<p>Zinc: {checkAndDisplayCoreNutrientValue("Zinc, Zn", "mg", nutrientValues)}</p>
		</div>
	);
};

export default CoreFoodDetails;
