//

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

const values = [800, 600, 400, 200, 1];

interface RefreshTimeState {
    value: number;
    length: number;
}

const initialState: RefreshTimeState = {
    value: 2,
    length: values.length,
};

export const refreshTimeSlice = createSlice({
    name: "refreshTime",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += state.value < state.length - 1 ? 1 : 0;
        },
        decrement: (state) => {
            state.value -= state.value > 0 ? 1 : 0;
        },
    },
});

export const selectRefreshTime = (state: RootState) =>
    values[state.refreshTime.value];

export const selectRefreshTimeIndex = (state: RootState) =>
    state.refreshTime.value;

export const selectRefreshTimeLength = (state: RootState) =>
    state.refreshTime.length;

const { increment, decrement } = refreshTimeSlice.actions;

export const incrementRefreshTime = increment;
export const decrementRefreshTime = decrement;

export default refreshTimeSlice.reducer;
