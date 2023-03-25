//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export const nbhdWidthSlice = createSlice({
    name: "nbhdWidth",
    initialState: { value: 3 },
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: (state) => {
            state.value--;
        },
        set: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const selectNbhdWidth = (state: RootState) => state.nbhdWidth.value;

const { increment, decrement, set } = nbhdWidthSlice.actions;

export const incrementNbhdWidth = increment;
export const decrementNbhdWidth = decrement;
export const setNbhdWidth = set;

export default nbhdWidthSlice.reducer;
