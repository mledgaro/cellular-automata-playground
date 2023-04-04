//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const min = 2;
export const max = 8;

interface NbhdWidthState {
    value: number;
}

export const initialState: NbhdWidthState = {
    value: 3,
};

export const nbhdWidthSlice = createSlice({
    name: "nbhdWidth",
    initialState,
    reducers: {
        incrementNbhdWidth: (state) => {
            state.value += state.value < max ? 1 : 0;
        },
        decrementNbhdWidth: (state) => {
            state.value -= state.value > min ? 1 : 0;
        },
        setNbhdWidth: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { incrementNbhdWidth, decrementNbhdWidth, setNbhdWidth } =
    nbhdWidthSlice.actions;

export default nbhdWidthSlice.reducer;
