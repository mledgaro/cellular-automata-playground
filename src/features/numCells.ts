//

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface NumCellsState {
    value: number;
}

const initialState: NumCellsState = {
    value: 128,
};

export const numCellsSlice = createSlice({
    name: "numCells",
    initialState,
    reducers: {},
});

export const selectNumCells = (state: RootState) => state.numCells.value;

export default numCellsSlice.reducer;
