import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface IterationsState {
    value: { counter: number; limit: number };
}

const initialState: IterationsState = {
    value: {
        counter: 0,
        limit: 0,
    },
};

export const iterationsSlice = createSlice({
    name: "iterations",
    initialState,
    reducers: {
        incrementIterations: (state) => {
            state.value = { ...state.value, counter: state.value.counter + 1 };
        },
        restartIterations: (state) => {
            state.value = { ...state.value, counter: 0 };
        },
        setLimitIterations: (state, action: PayloadAction<number>) => {
            state.value = { ...state.value, limit: action.payload };
        },
    },
});

export const selectIterations = (state: RootState) =>
    state.iterations.value.counter;
export const selectLimitIterations = (state: RootState) =>
    state.iterations.value.limit;

export const { incrementIterations, restartIterations, setLimitIterations } =
    iterationsSlice.actions;

export default iterationsSlice.reducer;
