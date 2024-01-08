import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoreFoodCard from "@/src/components/FoodSearcher/CoreFood/CoreFoodCard";

interface CoreFoodWrapperProps {}

const CoreFoodWrapper: FC<CoreFoodWrapperProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, coreFoodData, isSearched } = useSelector((state: RootState) => state.foodFetch);

	return (
		<>
			{isSearched && coreFoodData !== null && coreFoodData.foods.length >= 1 ? (
				<div className="flex flex-col gap-2 gap-y-10 mt-5 relative justify-center">
					{coreFoodData.foods.map((food) => (
						<CoreFoodCard key={food.fdcId} food={food} />
					))}
				</div>
			) : isSearched && coreFoodData !== null && coreFoodData.foods.length < 1 ? (
				<div className="flex flex-col gap-2 gap-y-10 mt-5 relative justify-center">
					<p className="text-center">There is no result to show for this page try another page or another keyword</p>
				</div>
			) : null}
		</>
	);
};

export default CoreFoodWrapper;
