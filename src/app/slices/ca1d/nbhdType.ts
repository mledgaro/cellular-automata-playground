import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { NbhdType1D } from "src/app/types";

interface NbhdTypeState {
    value: NbhdType1D;
}

export const defaultValue = "adjacent";

const initialState: NbhdTypeState = {
    value: defaultValue,
};

export const nbhdTypeSlice = createSlice({
    name: "nbhdType",
    initialState,
    reducers: {
        setNbhdType: (state, action: PayloadAction<NbhdType1D>) => {
            state.value = action.payload;
        },
    },
});

export const selectNbhdType = (state: RootState) => state.nbhdType.value;

export const { setNbhdType } = nbhdTypeSlice.actions;

export default nbhdTypeSlice.reducer;
