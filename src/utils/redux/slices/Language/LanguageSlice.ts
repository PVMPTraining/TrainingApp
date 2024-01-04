import { createSlice } from "@reduxjs/toolkit";

export const languageSilce = createSlice({
	name: "language",
	initialState: {
		value: "en"
	},
	reducers: {
		setLanguage: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { setLanguage } = languageSilce.actions;
