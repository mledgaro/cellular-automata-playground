//
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type NbhdType = "adjacent" | "grouped" | "scattered";

export const defaultVal = "adjacent";

interface NbhdTypeState {
    value: NbhdType;
}

const initialState: NbhdTypeState = {
    value: defaultVal,
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

export const selectNbhdType = (state: RootState) => state.nbhdType.value;

export const { setNbhdType } = nbhdTypeSlice.actions;

export default nbhdTypeSlice.reducer;
