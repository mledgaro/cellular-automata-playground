//
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WorldSizeState {
    value: {
        rows: number;
        cols: number;
    };
}

export const defaultValue = {
    rows: 128,
    cols: 128,
};

const initialState: WorldSizeState = {
    value: defaultValue,
};

export const worldSizeSlice = createSlice({
    name: "worldSize",
    initialState,
    reducers: {
        setWorldSize: (
            state,
            action: PayloadAction<{ rows: number; cols: number }>
        ) => {
            state.value = action.payload;
        },
    },
});

export const selectWorldSize = (state: RootState) => state.worldSize.value;
export const selectWorldRows = (state: RootState) => state.worldSize.value.rows;
export const selectWorldCols = (state: RootState) => state.worldSize.value.cols;

export const { setWorldSize } = worldSizeSlice.actions;

export default worldSizeSlice.reducer;
