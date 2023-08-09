//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NbhdType = "adjacent" | "grouped" | "scattered";

interface NbhdTypeState {
    value: NbhdType;
}

export const initialState: NbhdTypeState = {
    value: "adjacent",
};

export const nbhdTypeSlice = createSlice({
    name: "nbhdType",
    initialState,
    reducers: {
        setNbhdType: (state, action: PayloadAction<NbhdType>) => {
            state.value = action.payload;
        },
    },
});

export const { setNbhdType } = nbhdTypeSlice.actions;

export default nbhdTypeSlice.reducer;
