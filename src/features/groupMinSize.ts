//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroupMinSizeState {
    value: number;
}

export const initialState: GroupMinSizeState = {
    value: 1,
};

export const groupMinSizeSlice = createSlice({
    name: "groupMinSize",
    initialState,
    reducers: {
        incrementGroupMinSize: (state) => {
            state.value++;
        },
        decrementGroupMinSize: (state) => {
            state.value--;
        },
        setGroupMinSize: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { incrementGroupMinSize, decrementGroupMinSize, setGroupMinSize } =
    groupMinSizeSlice.actions;

export default groupMinSizeSlice.reducer;
