import { FC, useCallback, useRef } from "react";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import { fetchBrandedFood, fetchCoreFood, setActivePaginatePage, setKeywordValue } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import debounce from "debounce";

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, keywordValue, fetchError, isSearched, lastSearchedBrandKeywordValue, lastSearchedCoreKeywordValue, brandFoodData, chosenFoodCategory } =
		useSelector((state: RootState) => state.foodFetch);
	const searchRef = useRef<HTMLInputElement | null>(null);

	const keywordChangeHandler = (e: any) => {
		dispatch(setKeywordValue(e.target.value));
	};

	// const debouncedSearchHandler = useCallback(
	// 	debounce((value: string) => {
	// 		dispatch(setKeywordValue(value));
	// 	}, 350),
	// 	[]
	// );

	console.log(brandFoodData);

	const fetchHandler = () => {
		if (keywordValue.trim() === "") return;

		if (chosenFoodCategory === "core") {
			if (lastSearchedCoreKeywordValue.trim() === keywordValue.trim()) return;
			dispatch(fetchCoreFood({ keywordValue: keywordValue, page: 1 }));
			dispatch(setActivePaginatePage(0));
		}
		if (chosenFoodCategory === "brand") {
			if (lastSearchedBrandKeywordValue.trim() === keywordValue.trim()) return;
			dispatch(fetchBrandedFood({ keywordValue: keywordValue, page: 1 }));
			dispatch(setActivePaginatePage(0));
		}
	};

	const clearSearchInputValueHandler = () => {
		if (searchRef.current) {
			searchRef.current.value = "";
			dispatch(setKeywordValue(""));
		}
	};

	return (
		<div className="flex items-center gap-2 w-full">
			<div className="w-full relative">
				<Input
					className="bg-black text-white border-2 placeholder:text-white pr-7"
					innerRef={searchRef}
					value={keywordValue}
					placeholder="Food name"
					// onChange={(e) => debouncedSearchHandler(e.target.value)}
					onChange={(e) => keywordChangeHandler(e)}
					// onKeyDown={(e) => {
					// 	if (e.key === "Enter") {
					// 		foodFetchHandler();
					// 	}
					// }}
				/>
				{keywordValue.trim() !== "" && (
					<button className="absolute right-3 top-3 text-lg" onClick={clearSearchInputValueHandler}>
						X
					</button>
				)}
			</div>
			<Button className="bg-black text-white" onClick={fetchHandler}>
				Search
			</Button>
		</div>
	);
};

export default SearchInput;
