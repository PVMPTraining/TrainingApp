import { FC } from "react";

import useFetchFood from "@/src/utils/hooks/useFetchFood";
import { Input } from "../UI/Input/Input";
import { Button } from "../UI/Button/Button";

interface FoodSearcherProps {}

const FoodSearcher: FC<FoodSearcherProps> = ({}) => {
	const { foodFetchHandler, setKeywordValue, foodData } = useFetchFood();

	console.log(foodData);

	return (
		<div className="flex flex-col">
			<div className="flex items-center gap-2">
				<Input className="bg-black text-white" placeholder="Food name" onChange={(e) => setKeywordValue(e.target.value)} />
				<Button className="bg-black text-white" onClick={foodFetchHandler}>
					Search
				</Button>
			</div>
			{foodData.foods?.length >= 1 && (
				<div className="flex flex-col gap-5 mt-5">
					{foodData.foods.map((food) => (
						<div key={food.description}>
							<p>{food.description}</p>
							<p>
								{
									food.foodNutrients
										.filter(
											(nutrient) =>
												nutrient.nutrientName.includes("Energy") ||
												(nutrient.nutrientName.includes("Energy") && nutrient.nutrientName.includes("General"))
										)
										.find((energy) => energy.unitName === "KCAL").value
								}{" "}
								kcal, 100g
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FoodSearcher;
