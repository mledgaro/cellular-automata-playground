//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LiveCellsState {
    value: number;
}

export const initialState: LiveCellsState = {
    value: 1,
};

export const liveCellsSlice = createSlice({
    name: "liveCells",
    initialState,
    reducers: {
        incrementLiveCells: (state) => {
            state.value++;
        },
        decrementLiveCells: (state) => {
            state.value--;
        },
        setLiveCells: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { incrementLiveCells, decrementLiveCells, setLiveCells } =
    liveCellsSlice.actions;

export default liveCellsSlice.reducer;
