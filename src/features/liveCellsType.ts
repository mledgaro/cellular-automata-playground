//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export type LiveCellsType = "num" | "perc";

interface LiveCellsTypeState {
    value: LiveCellsType;
}

const initialState: LiveCellsTypeState = {
    value: "num",
};

export const liveCellsTypeSlice = createSlice({
    name: "liveCellsType",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<LiveCellsType>) => {
            state.value = action.payload;
        },
    },
});

export const selectLiveCellsType = (state: RootState) =>
    state.liveCellsType.value;

const { set } = liveCellsTypeSlice.actions;

export const setLiveCellsType = set;

export default liveCellsTypeSlice.reducer;
