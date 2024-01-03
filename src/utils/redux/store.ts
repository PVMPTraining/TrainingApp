"use client";
import { configureStore } from "@reduxjs/toolkit";

import foodFetchReducer from "./slices/foodFetch/foodFetchSlice";
import { languageSilce } from "./slices/Language/LanguageSlice";

/**
 * The Redux store for the application.
 */
const store = configureStore({
	reducer: {
		foodFetch: foodFetchReducer,
		language: languageSilce.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
