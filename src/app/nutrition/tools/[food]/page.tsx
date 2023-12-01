"use client";
import { FC } from "react";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";

const FoodDetailsPage: FC = () => {
	const { currentFood, keywordValue } = useSelector((state: RootState) => state.foodFetch);

	console.log(currentFood);

	const calories = currentFood.foodNutrients
		.filter((nutrient) => nutrient.nutrientName.includes("Energy") || nutrient.nutrientName.includes("General"))
		.find((energy) => energy.unitName === "KCAL")?.value;

	const carb =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Carbohydrate")).find((carb) => carb.unitName === "G")?.value
			: 0;

	const protein =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Protein")).find((carb) => carb.unitName === "G")?.value
			: 0;

	const fat =
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Total lipid")).find((carb) => carb.unitName === "G")?.value
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
		currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin A")).find((vitamin) => vitamin.unitName === "MG")?.value! >= 0
			? currentFood.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes("Vitamin A")).find((vitamin) => vitamin.unitName === "MG")?.value!
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

	const calorieIntakePercentage = ((calories! / 2000) * 100).toFixed(2);

	const carbIntakePercentage = ((carb! / 300) * 100).toFixed(2);

	const proteinIntakePercentage = ((protein! / 160) * 100).toFixed(2);

	const fatIntakePercentage = ((fat! / 60) * 100).toFixed(2);

	return (
		<>
			<div className="min-h-screen flex flex-col gap-4 bg-black text-white">
				<Link href={"/nutrition/tools"}>Back {keywordValue} search results</Link>
				<p>{currentFood?.description}</p>
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
							Calories <span>{calories} kcal</span>
						</p>
						{/* Need to add better find */}
						<p className="flex flex-col">
							Carbohydrate <span>{carb} g</span>
						</p>
						<p className="flex flex-col">
							Protein <span>{protein} g</span>
						</p>
						<p className="flex flex-col">
							Fat <span>{fat} g</span>
						</p>
					</div>
					<div className="text-white p-2 flex flex-col">
						Daily target macronutrient intake percentages
						<div className="flex gap-5 mt-2 w-full">
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
							Calories <span>{calories} kcal</span>
						</p>
						<p className="flex items-center justify-between">
							Protein <span>{protein} g</span>
						</p>
						<div className="flex flex-col gap-1">
							<p className="flex items-center justify-between">
								Carbohydrate <span>{carb} g</span>
							</p>
							<p className="flex items-center justify-between">
								Fiber <span>??</span>
							</p>
							<p className="flex items-center justify-between">
								Sugar <span>??</span>
							</p>
						</div>
						<div className="flex flex-col gap-1">
							<p className="flex items-center justify-between">
								Fat <span>{fat} g</span>
							</p>
							<p className="flex items-center justify-between">
								Fat 1 <span>??</span>
							</p>
							<p className="flex items-center justify-between">
								Fat 2 <span>??</span>
							</p>
							<p className="flex items-center justify-between">
								Fat 3 <span>??</span>
							</p>
							<p className="flex items-center justify-between">
								Fat 4 <span>??</span>
							</p>
						</div>
						{/* B vitamins need to research */}
						<div className="flex flex-col gap-1">
							<p className="flex items-center justify-between">
								B1 <span>{vitaminB1} mg</span>
							</p>
							<p className="flex items-center justify-between">
								B2 <span>{vitaminB2} mg</span>
							</p>
							<p className="flex items-center justify-between">
								B3 <span>{vitaminB3} mg</span>
							</p>
							<p className="flex items-center justify-between">
								B5 <span>{vitaminB5} mg</span>
							</p>
							<p className="flex items-center justify-between">
								B6 <span>{vitaminB6} mg</span>
							</p>
							<p className="flex items-center justify-between">
								B7 <span>{vitaminB7} mg</span>
							</p>
							<p className="flex items-center justify-between">
								B9 <span>{vitaminB9} mg</span>
							</p>
							<p className="flex items-center justify-between">
								B12 <span>{vitaminB12} ug</span>
							</p>
						</div>
						<p className="flex items-center justify-between">
							Vitamin A <span>{vitaminA} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Vitamin C <span>{vitaminC} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Vitamin D <span>{vitaminD} IU</span>
						</p>
						<p className="flex items-center justify-between">
							Vitamin E <span>{vitaminE} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Vitamin K <span>Need to research about K vitamin</span>
						</p>
						<p className="flex items-center justify-between">
							Water <span>{water} g</span>
						</p>
						<p className="flex items-center justify-between">
							Cholesterol <span>{cholesterol} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Calcium <span>{calcium} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Zinc <span>{zinc} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Iron <span>{iron} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Potassium <span>{potassium} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Magnesium <span>{magnesium} mg</span>
						</p>
						<p className="flex items-center justify-between">
							Sodium <span>{sodium} mg</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default FoodDetailsPage;
