import { FC } from "react";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import SearchInput from "@/src/components/FoodSearcher/SearchInput/SearchInput";
import CategoryButtons from "@/src/components/FoodSearcher/CategoryButtons/CategoryButtons";
import ResultsPaginate from "@/src/components/FoodSearcher/ResultsPaginate/ResultsPaginate";
import { useScrollPosition } from "@/src/utils/hooks/useScrollPosition";

interface SearchInputWrapperProps {}

const SearchInputWrapper: FC<SearchInputWrapperProps> = ({}) => {
	const { selectedBrandFoodData, isLoading, isSearched, brandFoodData, coreFoodData, filteredBrandFoodData } = useSelector(
		(state: RootState) => state.foodFetch
	);
	// const { scrollDirection, setIsModalOpen } = useScrollPosition();

	return (
		<div
		// className={`${
		// scrollDirection === "up" && !selectedBrandFoodData?._id ? "sticky top-14 z-50 bg-slate-700 rounded-b-xl animate-fade-down" : "flex flex-col"
		// } w-full gap-5 p-1`}
		// className={`${!selectedBrandFoodData?._id ? "sticky top-14 z-50 bg-slate-700 rounded-b-xl animate-fade-down" : "flex flex-col"} w-full gap-5 p-1`}
		>
			<div className="flex flex-col items-center pb-2">
				<SearchInput />
				<CategoryButtons />
			</div>
			{isSearched && filteredBrandFoodData && filteredBrandFoodData.length >= 1 ? (
				<ResultsPaginate />
			) : isSearched && coreFoodData && coreFoodData.foods.length >= 1 ? (
				<ResultsPaginate />
			) : null}
			{filteredBrandFoodData && filteredBrandFoodData.length >= 1 ? (
				<div className="flex flex-col gap-2">
					<p className="font-bold">
						Filter <strong>this page</strong> results based by their nutrition score
					</p>
					<select
						// value={selectedNutritionScoreForFilter}
						className="select select-ghost w-full max-w-xs"
						// onChange={(e) => {
						// 	setSelectedNutritionScoreForFilter(e.target.value);
						// }}
					>
						<option value="">All</option>
						<option value="a">A</option>
						<option value="b">B</option>
						<option value="c">C</option>
						<option value="d">D</option>
						<option value="e">E</option>
						<option value="unknown">Unknown</option>
					</select>
				</div>
			) : null}
		</div>
	);
};

export default SearchInputWrapper;
