import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoreFoodCard from "./CoreFoodCard";

interface CoreFoodWrapperProps {}

const CoreFoodWrapper: FC<CoreFoodWrapperProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, coreFoodData, fetchError, isSearched, brandFoodData, chosenFoodCategory } = useSelector(
		(state: RootState) => state.foodFetch
	);

	return (
		<div className="flex flex-col gap-5 mt-5 relative">
			{coreFoodData && coreFoodData.foods?.length >= 1 && coreFoodData.foods.map((food) => <CoreFoodCard food={food} />)}
		</div>
	);
};

export default CoreFoodWrapper;
