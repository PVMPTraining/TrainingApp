import { FC } from "react";
import { Button } from "@/src/components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { setChosenFoodCategory } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";

interface CategoryButtonsProps {}

const CategoryButtons: FC<CategoryButtonsProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { chosenFoodCategory } = useSelector((state: RootState) => state.foodFetch);

	const categoryChangeHandler = (category: string) => {
		dispatch(setChosenFoodCategory(category));
	};

	return (
		<div className="flex flex-col items-center justify-center my-4 gap-2">
			<p className="text-sm">Select a search category for your search query</p>
			<div className="flex gap-2">
				<Button
					className={`text-white ${chosenFoodCategory === "core" ? "border-[#69e710] bg-black pointer-events-none" : "bg-black"}`}
					onClick={() => categoryChangeHandler("core")}
				>
					Core foods
				</Button>
				<Button
					className={`text-white ${chosenFoodCategory === "brand" ? "border-[#69e710] bg-black pointer-events-none" : "bg-black"}`}
					onClick={() => categoryChangeHandler("brand")}
				>
					Branded foods
				</Button>
			</div>
		</div>
	);
};

export default CategoryButtons;
