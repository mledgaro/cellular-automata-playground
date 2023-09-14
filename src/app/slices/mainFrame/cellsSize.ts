import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface CellsSizeState {
    value: number;
}

export const defaultValue = 4;
export const minValue = 1;
export const maxValue = 20;

const initialState: CellsSizeState = {
    value: defaultValue,
};

export const cellsSizeSlice = createSlice({
    name: "cellsSize",
    initialState,
    reducers: {
        setCellsSize: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const selectCellsSize = (state: RootState) => state.cellsSize.value;

export const { setCellsSize } = cellsSizeSlice.actions;

export default cellsSizeSlice.reducer;
