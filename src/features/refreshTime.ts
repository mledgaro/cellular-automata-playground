//

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

const values = [800, 600, 400, 200, 1];

export const numValues = values.length;

interface RefreshTimeState {
    value: number;
}

const initialState: RefreshTimeState = {
    value: 2,
};

export const refreshTimeSlice = createSlice({
    name: "refreshTime",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += state.value < values.length - 1 ? 1 : 0;
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

const { increment, decrement } = refreshTimeSlice.actions;

export const incrementRefreshTime = increment;
export const decrementRefreshTime = decrement;

export default refreshTimeSlice.reducer;
