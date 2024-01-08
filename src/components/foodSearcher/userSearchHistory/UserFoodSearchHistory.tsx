"use client";
import { useFetchUserFoodSearchHistory } from "@/src/utils/hooks/useFetchUserFoodSearchHistory";
import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "../../UI/Button/Button";

import { MdDelete } from "react-icons/md";
import { GrFormRefresh } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { DeleteKeywordFromUserHistory, DeleteProductFromUserHistory, GetUserID } from "@/src/utils/helpers/supabase";
import {
	fetchBrandedFood,
	fetchCoreFood,
	setActivePaginatePage,
	setChosenFoodCategory,
	setKeywordValue
} from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { Select } from "../../UI/Select/Select";

type DateTimeOptions = {
	day: "2-digit" | "numeric";
	month: "2-digit" | "numeric";
	year?: "2-digit" | "numeric";
	hour: "2-digit" | "numeric";
	minute: "2-digit" | "numeric";
	second: "2-digit" | "numeric";
	hour12?: boolean;
};

interface UserFoodSearchHistoryProps {}

const timestampToDateHandler = (timestamp: number) => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // Months are zero-based, so add 1
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const options: DateTimeOptions = {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: undefined
	};
	const userLocale = navigator.language || "en-US";

	const formattedDate = date.toLocaleString(userLocale, options);

	return formattedDate;
};

const UserFoodSearchHistory: FC<UserFoodSearchHistoryProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, fetchError, isSearched, lastSearchedBrandKeywordValue, lastSearchedCoreKeywordValue, brandFoodData, chosenFoodCategory } =
		useSelector((state: RootState) => state.foodFetch);

	const { keywordHistory, productHistory, historyFetchIsLoading } = useFetchUserFoodSearchHistory();

	const [historyCategory, setHistoryCategory] = useState("keyword");

	const [productHistorySortType, setProductHistorySortType] = useState("newest");
	const [keywordHistorySortType, setKeywordHistorySortType] = useState("newest");

	const fetchWithHistoryKeywordAndCategoryHandler = async (category: string, keyword: string) => {
		if (keyword.trim() === "") return;

		if (category === "core") {
			// if (lastSearchedCoreKeywordValue.trim() === keywordValue.trim()) return;
			dispatch(fetchCoreFood({ keywordValue: keyword, page: 1 }));
			dispatch(setActivePaginatePage(0));
			dispatch(setKeywordValue(keyword));
			dispatch(setChosenFoodCategory(category));
		}
		if (category === "brand") {
			// if (lastSearchedBrandKeywordValue.trim() === keywordValue.trim()) return;
			dispatch(fetchBrandedFood({ keywordValue: keyword, page: 1 }));
			dispatch(setActivePaginatePage(0));
			dispatch(setKeywordValue(keyword));
			dispatch(setChosenFoodCategory(category));
		}
		// await AddKeywordToUserHistory((await GetUserID()) as string, { keyword: keywordValue, category: chosenFoodCategory, timestamp: Date.now() });
	};

	const categoryChangeHandler = (category: string) => {
		if (historyCategory === category) return;
		setHistoryCategory(category);
	};

	const memoizedKeywordHistory = useMemo(() => {
		const sortedKeywordHistory =
			keywordHistorySortType === "alphabetical"
				? keywordHistory.sort((a, b) => a.keyword.toLowerCase().localeCompare(b.keyword.toLowerCase()))
				: keywordHistorySortType === "reverseAlphabetical"
					? keywordHistory.sort((a, b) => b.keyword.toLowerCase().localeCompare(a.keyword.toLowerCase()))
					: keywordHistorySortType === "newest"
						? keywordHistory.sort((a, b) => b.timestamp - a.timestamp)
						: keywordHistory.sort((a, b) => a.timestamp - b.timestamp);

		return sortedKeywordHistory;
	}, [keywordHistorySortType, keywordHistory]);

	const memoizedProductHistory = useMemo(() => {
		const sortedProductHistory =
			productHistorySortType === "alphabetical"
				? productHistory.sort((a, b) => a.productName.toLowerCase().localeCompare(b.productName.toLowerCase()))
				: productHistorySortType === "reverseAlphabetical"
					? productHistory.sort((a, b) => b.productName.toLowerCase().localeCompare(a.productName.toLowerCase()))
					: productHistorySortType === "newest"
						? productHistory.sort((a, b) => b.timestamp - a.timestamp)
						: productHistory.sort((a, b) => a.timestamp - b.timestamp);

		return sortedProductHistory;
	}, [productHistorySortType, productHistory]);

	return (
		<>
			{historyFetchIsLoading ? (
				<p>History is loading...</p>
			) : isSearched ? null : isLoading ? null : (
				<div className="flex flex-col w-full gap-y-2 p-1">
					<p className="text-xl font-semibold">Search history</p>
					<div className="flex items-center justify-around mb-2">
						<Button
							onClick={() => categoryChangeHandler("keyword")}
							className={`${historyCategory === "keyword" ? "border border-green-500 pointer-events-none" : ""}`}
						>
							Keyword history
						</Button>
						<Button
							onClick={() => categoryChangeHandler("product")}
							className={`${historyCategory === "product" ? "border border-green-500 pointer-events-none" : ""}`}
						>
							Product history
						</Button>
					</div>
					<select
						className="select select-ghost w-full max-w-xs"
						value={historyCategory === "keyword" ? keywordHistorySortType : productHistorySortType}
						onChange={(e) => {
							if (historyCategory === "keyword") {
								setKeywordHistorySortType(e.target.value);
							} else {
								setProductHistorySortType(e.target.value);
							}
						}}
					>
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
						<option value="alphabetical">A-Z</option>
						<option value="reverseAlphabetical">Z-A</option>
						{/* {historyCategory === "keyword" && (
							<optgroup label="Keyword Options">
								<option value="newest">New to Old</option>
								<option value="oldest">Old to New</option>
								<option>A-Z</option>
								<option>Z-A</option>
							</optgroup>
						)}
						{historyCategory === "product" && (
							<optgroup label="Product Options">
								<option value="newest">New to Old</option>
								<option value="oldest">Old to New</option>
								<option>A-Z</option>
								<option>Z-A</option>
							</optgroup>
						)} */}
					</select>
					{historyCategory === "keyword" ? (
						<div className="flex flex-col items-center gap-3">
							{memoizedKeywordHistory.map((item) => (
								<div className="w-[320px] flex items-center gap-3 justify-between">
									<div className="flex items-center gap-3">
										<button onClick={async () => DeleteKeywordFromUserHistory((await GetUserID()) as string, item)}>
											<MdDelete className="text-2xl" />
										</button>
										<div className="max-w-[250px] break-words tracking-tighter">
											<p>Keyword: {item.keyword}</p>
											{/* asdasdasdasdqwdqwdqwdqwdqwwqdqwqwdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd */}
											<p>Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
											<time className="text-sm tracking-tighter">Search time: {timestampToDateHandler(item.timestamp)} </time>
										</div>
									</div>
									<button onClick={() => fetchWithHistoryKeywordAndCategoryHandler(item.category, item.keyword)}>
										<GrFormRefresh className="text-2xl" />
									</button>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center gap-3">
							{memoizedProductHistory.map((item) => (
								<div className="w-[320px] flex items-center gap-3 justify-between">
									<div className="flex items-center gap-3">
										<button onClick={async () => DeleteProductFromUserHistory((await GetUserID()) as string, item)}>
											<MdDelete className="text-2xl" />
										</button>
										<div className="max-w-[250px] break-words tracking-tighter">
											<p>Product: {item.productName}</p>
											{/* asdasdasdasdqwdqwdqwdqwdqwwqdqwqwdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd */}
											<p>Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
											<time className="text-sm tracking-tighter">Search time: {timestampToDateHandler(item.timestamp)} </time>
										</div>
									</div>
									<button onClick={() => fetchWithHistoryKeywordAndCategoryHandler(item.category, item.productName)}>
										<GrFormRefresh className="text-2xl" />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default UserFoodSearchHistory;
