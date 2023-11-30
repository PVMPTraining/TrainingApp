import { FoodFetchDataTypes, FoodSearchResultTypes } from "@/src/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type FoodStateTypes = {
	isLoading: boolean;
	keywordValue: string;
	foodData: FoodFetchDataTypes;
	fetchError: string | undefined;
	currentFood: FoodSearchResultTypes;
};

export const fetchFood = createAsyncThunk<any, string, {}>("food/fetchFood", async (keywordValue: string) => {
	const key = "XJcXXLCXJTV0b9zmSP2bDxFOD1tjiCoC2uXUgMye";
	const response = await axios.get(
		`https://api.nal.usda.gov/fdc/v1/foods/search?query=${keywordValue}&dataType=Foundation&pageSize=25&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=${key}`
	);
	return response.data;
});

// Then, create the slice
const foodSlice = createSlice({
	name: "food",
	initialState: {
		isLoading: false,
		keywordValue: "",
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
			})
			.addCase(fetchFood.fulfilled, (state, action) => {
				state.isLoading = false;
				state.foodData = action.payload;
			})
			.addCase(fetchFood.rejected, (state, action) => {
				state.isLoading = false;
				state.fetchError = action.error.message;
			});
	}
});

export const { setKeywordValue, setCurrentFood } = foodSlice.actions;

export default foodSlice.reducer;
