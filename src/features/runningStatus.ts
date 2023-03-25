//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export type RunningStatusType = "stopped" | "paused" | "running";

interface RunningStatusState {
    value: RunningStatusType;
}

const initialState: RunningStatusState = {
    value: "stopped",
};

export const runningStatusSlice = createSlice({
    name: "runningStatus",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<RunningStatusType>) => {
            state.value = action.payload;
        },
    },
});

export const selectRunningStatus = (state: RootState) =>
    state.runningStatus.value;

const { set } = runningStatusSlice.actions;

export const setRunningStatus = set;

export default runningStatusSlice.reducer;
