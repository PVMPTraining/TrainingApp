import { FC, useEffect, useMemo } from "react";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { useDispatch, useSelector } from "react-redux";
import BrandFoodCard from "@/src/components/FoodSearcher/BrandFood/BrandFoodCard";
import { setFilteredBrandFoodData } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";

interface BrandFoodWrapperProps {}

const BrandFoodWrapper: FC<BrandFoodWrapperProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { brandFoodData, isSearched } = useSelector((state: RootState) => state.foodFetch);

	const filteredBrandFoodData = useMemo(() => {
		return brandFoodData?.products.filter(
			(product) =>
				+product.completeness >= 0.6 &&
				(product.serving_quantity || product.serving_size) &&
				(product.nutriments["energy-kcal_serving"] ||
					product.nutriments["energy-kj_serving"] ||
					product.nutriments["energy-kcal_prepared_serving"] ||
					product.nutriments["energy-kj_prepared_serving"] ||
					product.nutriments["energy-kcal_100g"] ||
					product.nutriments["energy-kj_100g"])
		);
	}, [brandFoodData]);

	useEffect(() => {
		const filteredBrandFoodData = brandFoodData?.products.filter(
			(product) =>
				+product.completeness >= 0.6 &&
				(product.serving_quantity || product.serving_size) &&
				(product.nutriments["energy-kcal_serving"] ||
					product.nutriments["energy-kj_serving"] ||
					product.nutriments["energy-kcal_prepared_serving"] ||
					product.nutriments["energy-kj_prepared_serving"] ||
					product.nutriments["energy-kcal_100g"] ||
					product.nutriments["energy-kj_100g"])
		);

		dispatch(setFilteredBrandFoodData(filteredBrandFoodData));
	}, [brandFoodData]);

	return (
		<>
			{isSearched && filteredBrandFoodData && filteredBrandFoodData.length >= 1 ? (
				<div className="flex gap-2 gap-y-10 mt-5 relative flex-wrap justify-center">
					{filteredBrandFoodData.map((food) => (
						<BrandFoodCard key={food._id} food={food} />
					))}
				</div>
			) : isSearched && filteredBrandFoodData && filteredBrandFoodData.length < 1 ? (
				<div className="flex gap-2 gap-y-10 mt-5 relative flex-wrap justify-center">
					<p className="text-center">There is no result to show for this page try another page or another keyword</p>
				</div>
			) : null}
		</>
	);
};

export default BrandFoodWrapper;
