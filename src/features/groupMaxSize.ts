//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroupMaxSizeState {
    value: number;
}

export const initialState: GroupMaxSizeState = {
    value: 1,
};

export const groupMaxSizeSlice = createSlice({
    name: "groupMaxSize",
    initialState,
    reducers: {
        incrementGroupMaxSize: (state) => {
            state.value++;
        },
        decrementGroupMaxSize: (state) => {
            state.value--;
        },
        setGroupMaxSize: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { incrementGroupMaxSize, decrementGroupMaxSize, setGroupMaxSize } =
    groupMaxSizeSlice.actions;

export default groupMaxSizeSlice.reducer;
