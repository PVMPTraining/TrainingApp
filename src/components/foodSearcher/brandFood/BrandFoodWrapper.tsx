import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../UI/Button/Button";
import BrandFoodCard from "./BrandFoodCard";

interface BrandFoodWrapperProps {}

const BrandFoodWrapper: FC<BrandFoodWrapperProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { brandFoodData } = useSelector((state: RootState) => state.foodFetch);

	return (
		<div className="flex flex-col gap-5 mt-5 relative max-w-xs">
			{brandFoodData && brandFoodData.products?.length >= 1 && brandFoodData.products.map((food) => <BrandFoodCard key={food._id} food={food} />)}
		</div>
	);
};

export default BrandFoodWrapper;
