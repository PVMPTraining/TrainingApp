"use client";
import { useFetchUserFoodSearchHistory } from "@/src/utils/hooks/useFetchUserFoodSearchHistory";
import { FC, useEffect, useState } from "react";
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
	const { keywordHistory, productHistory } = useFetchUserFoodSearchHistory();

	const [historyCategory, setHistoryCategory] = useState("keyword");

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

	return (
		<>
			{isSearched ? null : isLoading ? null : (
				<div className="flex flex-col w-full">
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
					{historyCategory === "keyword" ? (
						<div className="flex flex-col items-center gap-3">
							{keywordHistory.map((item) => (
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
							{productHistory.map((item) => (
								<div className="w-[320px] flex items-center gap-3 justify-between">
									<div className="flex items-center gap-3">
										<button onClick={async () => DeleteProductFromUserHistory((await GetUserID()) as string, item)}>
											<MdDelete className="text-2xl" />
										</button>
										<div className="max-w-[250px] break-words tracking-tighter">
											<p>Keyword: {item.productName}</p>
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
