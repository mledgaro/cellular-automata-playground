//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface GroupMinSizeState {
    value: number;
}

const initialState: GroupMinSizeState = {
    value: 1,
};

export const groupMinSizeSlice = createSlice({
    name: "groupMinSize",
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

export const selectGroupMinSize = (state: RootState) =>
    state.groupMinSize.value;

const { increment, decrement, set } = groupMinSizeSlice.actions;

export const incrementGroupMinSize = increment;
export const decrementGroupMinSize = decrement;
export const setGroupMinSize = set;

export default groupMinSizeSlice.reducer;
