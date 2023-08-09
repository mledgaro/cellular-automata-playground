//

import { createSlice } from "@reduxjs/toolkit";

interface NumCellsState {
    value: number;
}

export const initialState: NumCellsState = {
    value: 128,
};

export const numCellsSlice = createSlice({
    name: "numCells",
    initialState,
    reducers: {},
});

export default numCellsSlice.reducer;
