//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export type NbhdType = "adjacent" | "grouped" | "scattered";

interface NbhdTypeState {
    value: NbhdType;
}

const initialState: NbhdTypeState = {
    value: "adjacent",
};

export const nbhdTypeSlice = createSlice({
    name: "nbhdType",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<NbhdType>) => {
            state.value = action.payload;
        },
    },
});

export const selectNbhdType = (state: RootState) => state.nbhdType.value;

const { set } = nbhdTypeSlice.actions;

export const setNbhdType = set;

export default nbhdTypeSlice.reducer;
