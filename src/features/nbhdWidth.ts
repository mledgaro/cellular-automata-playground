//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            state.value++;
        },
        decrementNbhdWidth: (state) => {
            state.value--;
        },
        setNbhdWidth: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { incrementNbhdWidth, decrementNbhdWidth, setNbhdWidth } =
    nbhdWidthSlice.actions;

export default nbhdWidthSlice.reducer;
