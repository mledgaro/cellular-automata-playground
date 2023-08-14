//

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const values = [800, 600, 400, 200, 1];

export const numValues = values.length;

interface RefreshTimeState {
    value: number;
}

export const initialState: RefreshTimeState = {
    value: 2,
};

export const refreshTimeSlice = createSlice({
    name: "refreshTime",
    initialState,
    reducers: {
        incrementRefreshTime: (state) => {
            state.value += state.value < values.length - 1 ? 1 : 0;
        },
        decrementRefreshTime: (state) => {
            state.value -= state.value > 0 ? 1 : 0;
        },
        setRefreshTime: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { incrementRefreshTime, decrementRefreshTime, setRefreshTime } =
    refreshTimeSlice.actions;

export default refreshTimeSlice.reducer;
