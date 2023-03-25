//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface GroupMaxSizeState {
    value: number;
}

const initialState: GroupMaxSizeState = {
    value: 1,
};

export const groupMaxSizeSlice = createSlice({
    name: "groupMaxSize",
    initialState,
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

export const selectGroupMaxSize = (state: RootState) =>
    state.groupMaxSize.value;

const { increment, decrement, set } = groupMaxSizeSlice.actions;

export const incrementGroupMaxSize = increment;
export const decrementGroupMaxSize = decrement;
export const setGroupMaxSize = set;

export default groupMaxSizeSlice.reducer;
