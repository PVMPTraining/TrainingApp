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
		<div className="flex gap-2 gap-y-10 mt-5 relative flex-wrap justify-center">
			{brandFoodData && brandFoodData.products?.length >= 1 && brandFoodData.products.map((food) => <BrandFoodCard key={food._id} food={food} />)}
		</div>
	);
};

export default BrandFoodWrapper;
