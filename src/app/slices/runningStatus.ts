//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RunningStatusType = "stopped" | "paused" | "running";

interface RunningStatusState {
    value: RunningStatusType;
}

export const initialState: RunningStatusState = {
    value: "stopped",
};

export const runningStatusSlice = createSlice({
    name: "runningStatus",
    initialState,
    reducers: {
        setRunningStatus: (state, action: PayloadAction<RunningStatusType>) => {
            state.value = action.payload;
        },
    },
});

export const { setRunningStatus } = runningStatusSlice.actions;

export default runningStatusSlice.reducer;
