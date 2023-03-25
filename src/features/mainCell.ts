//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface MainCellState {
    value: number;
}

const initialState: MainCellState = {
    value: 1,
};

export const mainCellSlice = createSlice({
    name: "mainCell",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const selectMainCell = (state: RootState) => state.mainCell.value;

const { set } = mainCellSlice.actions;

export const setMainCell = set;

export default mainCellSlice.reducer;
