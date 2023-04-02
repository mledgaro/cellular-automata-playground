//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LiveCellsType = "num" | "perc";

interface LiveCellsTypeState {
    value: LiveCellsType;
}

export const initialState: LiveCellsTypeState = {
    value: "num",
};

export const liveCellsTypeSlice = createSlice({
    name: "liveCellsType",
    initialState,
    reducers: {
        setLiveCellsType: (state, action: PayloadAction<LiveCellsType>) => {
            state.value = action.payload;
        },
    },
});

export const { setLiveCellsType } = liveCellsTypeSlice.actions;

export default liveCellsTypeSlice.reducer;
