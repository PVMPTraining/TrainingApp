import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BrandFoodFetchDataTypes, BrandFoodSearchResultTypes, FoodFetchDataTypes, FoodSearchResultTypes } from "@/src/types/types";

import axios from "axios";

type FoodStateTypes = {
	isLoading: boolean;
	keywordValue: string;
	lastKeywordValue: string;
	foodData: FoodFetchDataTypes;
	brandFoodData: BrandFoodFetchDataTypes;
	currentBrandFoodData: BrandFoodSearchResultTypes;
	fetchError: string | undefined;
	currentFood: FoodSearchResultTypes;
	isSearched: boolean;
};

export const fetchFood = createAsyncThunk<FoodFetchDataTypes, string, { state: { foodFetch: FoodStateTypes } }>(
	"food/fetchFood",
	async (keywordValue: string, thunkAPI) => {
		// const { lastKeywordValue, foodData } = thunkAPI.getState().foodFetch;
		// if (keywordValue === lastKeywordValue) {
		// 	return foodData;
		// }
		const response = await axios.get(
			`https://api.nal.usda.gov/fdc/v1/foods/search?query=${keywordValue}&dataType=SR Legacy&pageSize=50&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=${process.env.NEXT_PUBLIC_USDA_API_KEY}`
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
		lastKeywordValue: "",
		foodData: {},
		brandFoodData: {},
		currentBrandFoodData: {},
		fetchError: "",
		currentFood: {}
	} as FoodStateTypes,
	reducers: {
		setKeywordValue: (state, action) => {
			// return {
			// 	...state,
			// 	keywordValue: action.payload
			// };
			state.keywordValue = action.payload;
		},
		setCurrentFood: (state, action) => {
			state.currentFood = action.payload;
		},
		setCurrentChosenBrandFood: (state, action) => {
			state.currentBrandFoodData = action.payload;
		},
		setEmptyBrandFood: (state) => {
			state.brandFoodData = {
				count: 0,
				page: 0,
				page_count: 0,
				page_size: 0,
				products: [],
				skip: 0
			};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFood.pending, (state) => {
				state.isLoading = true;
				state.isSearched = false;
			})
			.addCase(fetchFood.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSearched = true;
				state.lastKeywordValue = state.keywordValue;
				state.foodData = action.payload;
				state.fetchError = "";
			})
			.addCase(fetchFood.rejected, (state, action) => {
				state.isLoading = false;
				state.isSearched = true;
				state.lastKeywordValue = state.keywordValue;
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
				state.lastKeywordValue = state.keywordValue;
				state.brandFoodData = action.payload;
				state.fetchError = "";
			})
			.addCase(fetchBrandedFood.rejected, (state, action) => {
				state.isLoading = false;
				state.isSearched = true;
				state.lastKeywordValue = state.keywordValue;
				if (action.error.message) {
					state.fetchError = action.error.message;
				} else {
					state.fetchError = "Something went wrong while searching!";
				}
			});
	}
});

export const { setKeywordValue, setCurrentFood, setEmptyBrandFood, setCurrentChosenBrandFood } = foodSlice.actions;

export default foodSlice.reducer;
