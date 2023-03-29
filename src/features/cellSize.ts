//

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

const values = [4, 6, 8, 12, 16];

export const numValues = values.length;

interface CellSizeState {
    value: number;
}

const initialState: CellSizeState = {
    value: 2,
};

export const cellSizeSlice = createSlice({
    name: "cellSize",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += state.value < values.length - 1 ? 1 : 0;
        },
        decrement: (state) => {
            state.value -= state.value > 0 ? 1 : 0;
        },
    },
});

export const selectCellSize = (state: RootState) =>
    values[state.cellSize.value];

export const selectCellSizeIndex = (state: RootState) => state.cellSize.value;

const { increment, decrement } = cellSizeSlice.actions;

export const incrementCellSize = increment;
export const decrementCellSize = decrement;

export default cellSizeSlice.reducer;
