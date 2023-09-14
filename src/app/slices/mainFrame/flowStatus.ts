import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { FlowStatus } from "src/app/types";

interface FlowStatusState {
    value: {
        previous: FlowStatus;
        current: FlowStatus;
    };
}

const initialState: FlowStatusState = {
    value: {
        previous: undefined,
        current: "stopped",
    },
};

export const flowStatusSlice = createSlice({
    name: "flowStatus",
    initialState,
    reducers: {
        flowStatusRun: (state) => {
            state.value.previous = state.value.current;
            state.value.current = "running";
        },
        flowStatusPause: (state) => {
            state.value.previous = state.value.current;
            state.value.current = "paused";
        },
        flowStatusStop: (state) => {
            state.value.previous = state.value.current;
            state.value.current = "stopped";
        },
    },
});

export const selectFlowStatus = (state: RootState) =>
    state.flowStatus.value.current;
export const selectPreviousFlowStatus = (state: RootState) =>
    state.flowStatus.value.previous;

export const { flowStatusRun, flowStatusPause, flowStatusStop } =
    flowStatusSlice.actions;

export default flowStatusSlice.reducer;
