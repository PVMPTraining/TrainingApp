"use client";
import { useFetchUserFoodSearchHistory } from "@/src/utils/hooks/useFetchUserFoodSearchHistory";
import { FC, useEffect } from "react";
import { Button } from "../../UI/Button/Button";

import { MdDelete } from "react-icons/md";
import { GrFormRefresh } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { DeleteKeywordFromUserHistory, GetUserID } from "@/src/utils/helpers/supabase";
import {
	fetchBrandedFood,
	fetchCoreFood,
	setActivePaginatePage,
	setChosenFoodCategory,
	setKeywordValue
} from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";

interface UserFoodSearchHistoryProps {}

const UserFoodSearchHistory: FC<UserFoodSearchHistoryProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, fetchError, isSearched, lastSearchedBrandKeywordValue, lastSearchedCoreKeywordValue, brandFoodData, chosenFoodCategory } =
		useSelector((state: RootState) => state.foodFetch);
	const { history } = useFetchUserFoodSearchHistory();

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

	return (
		<>
			{isSearched ? null : isLoading ? null : (
				<div className="flex flex-col w-full">
					<div className="flex items-center justify-around">
						<Button>Keyword history</Button>
						<Button>Product history</Button>
					</div>
					<div className="flex flex-col items-center gap-3">
						{history.map((item) => (
							<div className="w-[320px] flex items-center gap-3 justify-between">
								<div className="flex items-center gap-3">
									<button onClick={async () => DeleteKeywordFromUserHistory((await GetUserID()) as string, item)}>
										<MdDelete className="text-2xl" />
									</button>
									<div className="max-w-[250px] break-words tracking-tighter">
										<p>Keyword: {item.keyword}</p>
										{/* asdasdasdasdqwdqwdqwdqwdqwwqdqwqwdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd */}
										<p>Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
									</div>
								</div>
								<button onClick={() => fetchWithHistoryKeywordAndCategoryHandler(item.category, item.keyword)}>
									<GrFormRefresh className="text-2xl" />
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default UserFoodSearchHistory;
