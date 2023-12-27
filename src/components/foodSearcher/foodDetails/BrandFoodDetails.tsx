import { RootState } from "@/src/utils/redux/store";
import { FC } from "react";
import { useSelector } from "react-redux";

interface BrandFoodDetailsProps {}

const BrandFoodDetails: FC<BrandFoodDetailsProps> = ({}) => {
	const { selectedBrandFoodData } = useSelector((state: RootState) => state.foodFetch);

	return <div>brandFoodDetails</div>;
};

export default BrandFoodDetails;
