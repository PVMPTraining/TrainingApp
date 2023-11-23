"use client";
import { createSlice } from "@reduxjs/toolkit";

/**
 * Represents the state of the counter.
 */
interface CounterState {
	value: number;
}

/**
 * Initial state for the counter slice.
 */
const initialState: CounterState = {
	value: 0
};

/**
 * Redux slice for managing the counter state.
 */
const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			state.value++;
		},
		decrement: (state) => {
			state.value--;
		},
		reset: (state) => {
			state.value = 0;
		}
	}
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
