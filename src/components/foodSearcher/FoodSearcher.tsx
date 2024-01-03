"use client";
import { FC, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { setKeywordValue, fetchBrandedFood } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { BrandFoodSearchResultTypes, FoodSearchResultTypes } from "@/src/types/types";
import { FaSpinner } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import CategoryButtons from "./categoryButtons/CategoryButtons";
import CoreFoodWrapper from "./coreFood/CoreFoodWrapper";
import SearchInput from "./searchInput/SearchInput";
import BrandFoodWrapper from "./brandFood/BrandFoodWrapper";
import { useScrollPosition } from "@/src/utils/hooks/useScrollPosition";
import SearchInputWrapper from "./searchInput/SearchInputWrapper";
import ResultsPaginate from "./resultsPaginate/ResultsPaginate";
import { GetUserHistory, GetUserID } from "@/src/utils/helpers/supabase";
import UserFoodSearchHistory from "./userSearchHistory/UserFoodSearchHistory";

// For olive oil they didn't provide a calorie value need to calculate with formula

interface FoodSearcherProps {}

const FoodSearcher: FC<FoodSearcherProps> = ({}) => {
	// const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, fetchError, isSearched, brandFoodData, chosenFoodCategory } = useSelector((state: RootState) => state.foodFetch);

	// const [activePage, setActivePage] = useState(1);

	// const [isBrandFoodDetailModalOpen, setIsBrandFoodDetailModalOpen] = useState(false);
	// const [selectedNutritionScoreForFilter, setSelectedNutritionScoreForFilter] = useState("");

	// const pageCount =
	// 	brandFoodData.count / 50 - Math.floor(brandFoodData.count / 50) >= 0.5
	// 		? Math.round(brandFoodData.count / 50)
	// 		: Math.floor(brandFoodData.count / 50) + 1;

	// const keywordChangeHandler = (e: any) => {
	// 	dispatch(setKeywordValue(e.target.value));
	// };

	// const foodFetchHandler = () => {
	// 	if (lastKeywordValue.trim() === keywordValue.trim() || keywordValue.trim() === "") {
	// 		return;
	// 	}
	// 	dispatch(fetchFood(keywordValue));
	// };

	// const brandedFetchHandler = async (pageNumber: number) => {
	// 	await setActivePage(pageNumber - 1);
	// 	await dispatch(setEmptyBrandFood());
	// 	await dispatch(fetchBrandedFood({ keywordValue: keywordValue, page: pageNumber }));
	// };

	// const filteredResults = useMemo(() => {
	// 	if (brandFoodData.products?.length >= 1) {
	// 		return brandFoodData.products.filter((product) => product.nutrition_grades === selectedNutritionScoreForFilter);
	// 	} else {
	// 		return [];
	// 	}
	// }, [selectedNutritionScoreForFilter, brandFoodData]);

	// Scroll test

	// Causing a lot of re-renders need to fix

	// const { scrollDirection, setIsModalOpen } = useScrollPosition();

	// console.log(scrollDirection, chosenFoodCategory, foodData);

	return (
		<div className="flex flex-col relative items-center w-full">
			<SearchInputWrapper />
			{isLoading ? (
				<div className="self-center text-xl font-bold flex items-center gap-2 mt-2">
					<FaSpinner className="animate-spin text-4xl" /> Searching...
				</div>
			) : (
				<>
					<CoreFoodWrapper />
					<BrandFoodWrapper />
				</>
			)}
			<UserFoodSearchHistory />
		</div>
	);
};

export default FoodSearcher;
