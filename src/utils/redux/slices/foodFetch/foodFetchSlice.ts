import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { FoodFetchDataTypes, FoodSearchResultTypes } from "@/src/types/types";

import axios from "axios";

type FoodStateTypes = {
	isLoading: boolean;
	keywordValue: string;
	lastKeywordValue: string;
	foodData: FoodFetchDataTypes;
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

// export const fetchFood = createAsyncThunk<FoodFetchDataTypes, string, { state: { foodFetch: FoodStateTypes } }>(
// 	"food/fetchFood",
// 	async (keywordValue: string, thunkAPI) => {
// 		// const { lastKeywordValue, foodData } = thunkAPI.getState().foodFetch;
// 		// if (keywordValue === lastKeywordValue) {
// 		// 	return foodData;
// 		// }
// 		const response = await axios.get(
// 			`https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=cereals`
// 		);
// 		return response.data;
// 	}
// );

const foodSlice = createSlice({
	name: "food",
	initialState: {
		isLoading: false,
		isSearched: false,
		keywordValue: "",
		lastKeywordValue: "",
		foodData: {},
		fetchError: "",
		currentFood: {}
	} as FoodStateTypes,
	reducers: {
		setKeywordValue: (state, action) => {
			state.keywordValue = action.payload;
		},
		setCurrentFood: (state, action) => {
			state.currentFood = action.payload;
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
			});
	}
});

export const { setKeywordValue, setCurrentFood } = foodSlice.actions;

export default foodSlice.reducer;
