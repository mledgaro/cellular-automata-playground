//

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export const values = [4, 6, 8, 12, 16];

export const numValues = values.length;

interface CellSizeState {
    value: number;
}

export const initialState: CellSizeState = {
    value: 2,
};

export const cellSizeSlice = createSlice({
    name: "cellSize",
    initialState,
    reducers: {
        incrementCellSize: (state) => {
            state.value += state.value < values.length - 1 ? 1 : 0;
        },
        decrementCellSize: (state) => {
            state.value -= state.value > 0 ? 1 : 0;
        },
        setCellSize: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const selectCellSizeIndex = (state: RootState) => state.cellSize.value;

export const { incrementCellSize, decrementCellSize, setCellSize } =
    cellSizeSlice.actions;

export default cellSizeSlice.reducer;
