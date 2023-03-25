//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface LiveCellsState {
    value: number;
}

const initialState: LiveCellsState = {
    value: 1,
};

export const liveCellsSlice = createSlice({
    name: "liveCells",
    initialState,
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: (state) => {
            state.value--;
        },
        set: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const selectLiveCells = (state: RootState) => state.liveCells.value;

const { increment, decrement, set } = liveCellsSlice.actions;

export const incrementLiveCells = increment;
export const decrementLiveCells = decrement;
export const setLiveCells = set;

export default liveCellsSlice.reducer;
