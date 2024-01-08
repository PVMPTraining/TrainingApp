import { FC, useState } from "react";
import { CoreFoodSearchResultTypes } from "@/src/types/types";

import { FaAngleDoubleRight, FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../../UI/Button/Button";
import { AddProductToUserHistory, GetUserID } from "@/src/utils/helpers/supabase";
import { setChosenCoreFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/utils/redux/store";
import { useRouter } from "next/navigation";

const nutrientFilterAndFindHandler = (food: CoreFoodSearchResultTypes, nutrientName: string, unit: string) => {
	if (nutrientName === "Energy") {
		const value =
			food.foodNutrients
				.filter(
					(nutrient) =>
						nutrient.nutrientName.includes(nutrientName) ||
						(nutrient.nutrientName.includes(nutrientName) && nutrient.nutrientName.includes("General"))
				)
				.find((energy) => energy.unitName === unit)?.value + " kcal" ?? "-";

		return value;
	} else {
		const value =
			food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes(nutrientName)).find((protein) => protein.unitName === unit)?.value! <= 0
				? "-"
				: food.foodNutrients.filter((nutrient) => nutrient.nutrientName.includes(nutrientName)).find((protein) => protein.unitName === unit)?.value +
				  " gram";

		return value;
	}
};

type CoreFoodCardNutrimentsProps = {
	food: CoreFoodSearchResultTypes;
};

const CoreFoodCardNutriments: FC<CoreFoodCardNutrimentsProps> = ({ food }) => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const [otherNutritionInformationClicked, setOtherNutritionInformationClicked] = useState(false);

	return (
		<div className="w-full">
			<p className="text-xl tracking-tighter">{food.description}</p>
			<div className="flex items-center gap-2">
				<p className="text-sm font-bold text-blue-400">Portion 100g, </p>
				<p>{nutrientFilterAndFindHandler(food, "Energy", "KCAL")}</p>
			</div>
			<div className="flex flex-col w-full">
				<button onClick={() => setOtherNutritionInformationClicked((prev) => !prev)} className="flex items-center gap-2">
					See more nutrients <FaAngleDown className={`text-lg duration-200 ${otherNutritionInformationClicked ? "rotate-180" : ""}`} />
				</button>
				{otherNutritionInformationClicked ? (
					<div className="flex flex-col gap-3">
						<div>
							<p>
								<span className="text-blue-300">Protein:</span> {nutrientFilterAndFindHandler(food, "Protein", "G")}
							</p>
							<p>
								<span className="text-blue-300">Carbohydrate:</span> {nutrientFilterAndFindHandler(food, "Carbohydrate, by difference", "G")}
							</p>
							<p>
								<span className="text-blue-300">Fat:</span> {nutrientFilterAndFindHandler(food, "Total lipid (fat)", "G")}
							</p>
						</div>
					</div>
				) : null}
				<div className="flex justify-between w-full mt-5">
					<button
						className="text-black flex items-center gap-2"
						onClick={async () => {
							dispatch(setChosenCoreFood(food));
							await AddProductToUserHistory((await GetUserID()) as string, {
								productName: food.description,
								category: "core",
								timestamp: Date.now()
							});
							router.push("/nutrition/tools/foodDetail");
						}}
					>
						See all details <FaAngleDoubleRight />
					</button>
					<button className="tracking-tighter font-semibold">Add to diary</button>
				</div>
			</div>
		</div>
	);
};

export default CoreFoodCardNutriments;
