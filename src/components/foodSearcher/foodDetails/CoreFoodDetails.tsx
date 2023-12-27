import { FC } from "react";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import { FoodSearchResultTypes } from "@/src/types/types";

const findNutrientValue = (food: FoodSearchResultTypes | null, nutrientName: string, unitName: string) => {
	const nutrient = food?.foodNutrients.find(({ nutrientName: name, unitName: unit }) => name === nutrientName && unit === unitName);
	return nutrient ? nutrient.value : 0;
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

	console.log(nutrientValues, selectedCoreFoodData);

	return (
		<div className="mt-5 divide-y-2">
			<p className="text-xl">{foodName}</p>
			<p>Calorie: {nutrientValues["Energy"]} kcal</p>
			<p>Protein: {nutrientValues["Protein"]} gram</p>
			<div>
				<p>Carbohydrate: {nutrientValues["Carbohydrate, by difference"]} gram</p>
				<div className="ml-5">
					<p>Fiber: {nutrientValues["Fiber, total dietary"]} gram</p>
					<p>Sugars: {nutrientValues["Total sugars"]} gram</p>
				</div>
			</div>
			<div>
				<p>Fat: {nutrientValues["Total lipid (fat)"]} gram</p>
				<div className="ml-5">
					<p>Saturated fat: {nutrientValues["Fatty acids, total saturated"]} gram</p>
					<p>Monounsaturated fat: {nutrientValues["Fatty acids, total monounsaturated"]} gram</p>
					<p>Polyunsaturated fat: {nutrientValues["Fatty acids, total polyunsaturated"]} gram</p>
				</div>
			</div>
		</div>
	);
};

export default CoreFoodDetails;
