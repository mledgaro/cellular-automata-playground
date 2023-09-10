//
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export const defaultVal = 1;

interface MainCellState {
    value: number;
}

const initialState: MainCellState = {
    value: defaultVal,
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

export const selectMainCell = (state: RootState) => state.mainCell.value;

export const { setMainCell } = mainCellSlice.actions;

export default mainCellSlice.reducer;
