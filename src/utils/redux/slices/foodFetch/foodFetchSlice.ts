import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BrandFoodFetchDataTypes, BrandFoodSearchResultTypes, CoreFoodFetchDataTypes, CoreFoodSearchResultTypes } from "@/src/types/types";

import axios from "axios";

type FoodStateTypes = {
	isLoading: boolean;
	keywordValue: string;
	lastSearchedCoreKeywordValue: string;
	lastSearchedBrandKeywordValue: string;
	chosenFoodCategory: string;
	activePaginatePage: number;
	coreFoodData: CoreFoodFetchDataTypes | null;
	brandFoodData: BrandFoodFetchDataTypes | null;
	filteredBrandFoodData: BrandFoodSearchResultTypes[] | null;
	selectedBrandFoodData: BrandFoodSearchResultTypes | null;
	selectedCoreFoodData: CoreFoodSearchResultTypes | null;
	fetchError: string | undefined;
	isSearched: boolean;
};

// Need to add core foods to page number

export const fetchCoreFood = createAsyncThunk<CoreFoodFetchDataTypes, { keywordValue: string; page: number }, { state: { foodFetch: FoodStateTypes } }>(
	"food/fetchCoreFood",
	async ({ keywordValue, page }, thunkAPI) => {
		// const { lastKeywordValue, foodData } = thunkAPI.getState().foodFetch;
		// if (keywordValue === lastKeywordValue) {
		// 	return foodData;
		// }
		const response = await axios.get(
			`https://api.nal.usda.gov/fdc/v1/foods/search?query=${keywordValue}&dataType=SR Legacy&pageSize=50&pageNumber=${page}&sortBy=dataType.keyword&sortOrder=asc&api_key=${process.env.NEXT_PUBLIC_USDA_API_KEY}`
		);
		return response.data;
	}
);

export const fetchBrandedFood = createAsyncThunk<BrandFoodFetchDataTypes, { keywordValue: string; page: number }, { state: { foodFetch: FoodStateTypes } }>(
	"food/fetchBrandedFood",
	async ({ keywordValue, page }) => {
		const response = await axios.get(
			`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${keywordValue}&search_simple=true&action=process&page=${page}&page_size=50&json=true`
		);
		return response.data;
	}
);

const foodSlice = createSlice({
	name: "food",
	initialState: {
		isLoading: false,
		isSearched: false,
		keywordValue: "",
		lastSearchedCoreKeywordValue: "",
		lastSearchedBrandKeywordValue: "",
		chosenFoodCategory: "core",
		activePaginatePage: 0,
		coreFoodData: null,
		brandFoodData: null,
		filteredBrandFoodData: null,
		selectedCoreFoodData: null,
		selectedBrandFoodData: null,
		fetchError: ""
	} as FoodStateTypes,
	reducers: {
		setActivePaginatePage: (state, action) => {
			state.activePaginatePage = action.payload;
		},
		setChosenFoodCategory: (state, action) => {
			if (state.chosenFoodCategory === action.payload) return;
			state.chosenFoodCategory = action.payload;
		},
		setKeywordValue: (state, action) => {
			// return {
			// 	...state,
			// 	keywordValue: action.payload
			// };
			state.keywordValue = action.payload;
			state.lastSearchedBrandKeywordValue = "";
			state.lastSearchedCoreKeywordValue = "";
			if (state.brandFoodData) {
				state.brandFoodData = null;
				state.isSearched = false;
			}
			if (state.coreFoodData) {
				state.coreFoodData = null;
				state.isSearched = false;
			}
		},
		setFilteredBrandFoodData: (state, action) => {
			state.filteredBrandFoodData = action.payload;
		},
		setLastKeywordReset: (state, action) => {
			(state.lastSearchedBrandKeywordValue = ""), (state.lastSearchedCoreKeywordValue = "");
		},
		setChosenCoreFood: (state, action) => {
			state.selectedCoreFoodData = action.payload;
		},
		setChosenBrandFood: (state, action) => {
			state.selectedBrandFoodData = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCoreFood.pending, (state) => {
				state.isLoading = true;
				state.isSearched = false;
			})
			.addCase(fetchCoreFood.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSearched = true;
				state.lastSearchedCoreKeywordValue = state.keywordValue;
				state.lastSearchedBrandKeywordValue = "";
				state.coreFoodData = action.payload;
				state.brandFoodData = null;
				state.selectedCoreFoodData = null;
				state.fetchError = "";
			})
			.addCase(fetchCoreFood.rejected, (state, action) => {
				state.isLoading = false;
				state.isSearched = true;
				state.lastSearchedCoreKeywordValue = state.keywordValue;
				if (action.error.message) {
					state.fetchError = action.error.message;
				} else {
					state.fetchError = "Something went wrong while searching!";
				}
			})
			.addCase(fetchBrandedFood.pending, (state) => {
				state.isLoading = true;
				state.isSearched = false;
			})
			.addCase(fetchBrandedFood.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSearched = true;
				state.lastSearchedBrandKeywordValue = state.keywordValue;
				state.lastSearchedCoreKeywordValue = "";
				state.brandFoodData = action.payload;
				state.coreFoodData = null;
				state.selectedBrandFoodData = null;
				state.fetchError = "";
			})
			.addCase(fetchBrandedFood.rejected, (state, action) => {
				state.isLoading = false;
				state.isSearched = true;
				state.lastSearchedBrandKeywordValue = state.keywordValue;
				if (action.error.message) {
					state.fetchError = action.error.message;
				} else {
					state.fetchError = "Something went wrong while searching!";
				}
			});
	}
});

export const { setKeywordValue, setChosenCoreFood, setChosenBrandFood, setChosenFoodCategory, setActivePaginatePage, setFilteredBrandFoodData } =
	foodSlice.actions;

export default foodSlice.reducer;
