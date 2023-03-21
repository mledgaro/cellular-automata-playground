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

export const { increment, decrement, set } = nbhdWidthSlice.actions;

export const selectNbhdWidth = (state: RootState) => state.nbhdWidth.value;

export default nbhdWidthSlice.reducer;
