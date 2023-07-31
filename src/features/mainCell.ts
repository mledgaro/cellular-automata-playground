//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainCellState {
    value: number;
}

export const initialState: MainCellState = {
    value: 1,
};

export const mainCellSlice = createSlice({
    name: "mainCell",
    initialState,
    reducers: {
        setMainCell: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { setMainCell } = mainCellSlice.actions;

export default mainCellSlice.reducer;
