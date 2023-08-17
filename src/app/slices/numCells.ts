//
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const defaultVal = 128;

interface NumCellsState {
    value: number;
}

const initialState: NumCellsState = {
    value: defaultVal,
};

export const numCellsSlice = createSlice({
    name: "numCells",
    initialState,
    reducers: {},
});

export const selectNumCells = (state: RootState) => state.numCells.value;

export default numCellsSlice.reducer;
