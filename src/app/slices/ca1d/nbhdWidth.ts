//
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export const minVal = 2;
export const maxVal = 8;
export const defaultVal = 3;

interface NbhdWidthState {
    value: number;
}

const initialState: NbhdWidthState = {
    value: defaultVal,
};

export const nbhdWidthSlice = createSlice({
    name: "nbhdWidth",
    initialState,
    reducers: {
        setNbhdWidth: (state, action: PayloadAction<number>) => {
            let newVal;
            newVal = Math.max(minVal, action.payload);
            newVal = Math.min(newVal, maxVal);
            state.value = newVal;
        },
    },
});

export const selectNbhdWidth = (state: RootState) => state.nbhdWidth.value;

export const { setNbhdWidth } = nbhdWidthSlice.actions;

export default nbhdWidthSlice.reducer;
