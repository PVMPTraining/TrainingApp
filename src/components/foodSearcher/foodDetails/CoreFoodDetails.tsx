import { FC } from "react";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import { FoodSearchResultTypes } from "@/src/types/types";
import { Button } from "../../UI/Button/Button";
import { percentageCalculator } from "../../nutritionSegment/calorie/CalorieGoalCard";

const findNutrientValue = (food: FoodSearchResultTypes | null, nutrientName: string, unitName: string) => {
	const nutrient = food?.foodNutrients.find(({ nutrientName: name, unitName: unit }) => name === nutrientName && unit === unitName);
	return nutrient && nutrient.value >= 1 ? nutrient.value : 0;
};

interface CoreFoodDetailsProps {}

interface NutrientValues {
	[key: string]: number;
}

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
			<p className="border-none">Serving size 100 grams</p>
			<p>Calorie: {nutrientValues["Energy"]} kcal</p>
			<p>Protein: {nutrientValues["Protein"]} gram</p>
			<div>
				<p>Carbohydrate: {nutrientValues["Carbohydrate, by difference"]} gram</p>
				<div className="ml-5">
					<p>Fiber: {nutrientValues["Fiber, total dietary"]} gram</p>
					<p>Sugars: {nutrientValues["Total Sugars"]} gram</p>
				</div>
			</div>
			<div>
				<p>Fat: {nutrientValues["Total lipid (fat)"]} gram</p>
				<div className="ml-5">
					<p>Saturated fat: {nutrientValues["Fatty acids, total saturated"]} gram</p>
					<p>Monounsaturated fat: {nutrientValues["Fatty acids, total monounsaturated"]} gram</p>
					<p>Polyunsaturated fat: {nutrientValues["Fatty acids, total polyunsaturated"]} gram</p>
					<p>Cholesterol: {nutrientValues["Cholesterol"]} MG</p>
				</div>
			</div>
			<p>Caffeine: {nutrientValues["Caffeine"] >= 1 ? nutrientValues["Caffeine"] + "MG" : "-"}</p>
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
			<p>Vitamin A: {nutrientValues["Vitamin A, IU"]} IU</p>
			<p>Vitamin B-6: {nutrientValues["Vitamin B-6"]} MG</p>
			<p>Vitamin B-12: {nutrientValues["Vitamin B-12"]} UG</p>
			<p>Vitamin C: {nutrientValues["Vitamin C, total ascorbic acid"]} MG</p>
			<p>Vitamin D: {nutrientValues["Vitamin D (D2 + D3), International Units"]} IU</p>
			<p className="border-none text-2xl font-bold">Minerals</p>
			<p>Calcium: {nutrientValues["Calcium, Ca"]} MG</p>
			<p>Iron: {nutrientValues["Iron, Fe"]} MG</p>
			<p>Potassium: {nutrientValues["Potassium, K"]} MG</p>
			<p>Magnesium: {nutrientValues["Magnesium, Mg"]} MG</p>
			<p>Sodium: {nutrientValues["Sodium, Na"]} MG</p>
			<p>Zinc: {nutrientValues["Zinc, Zn"]} MG</p>
		</div>
	);
};

export default CoreFoodDetails;
