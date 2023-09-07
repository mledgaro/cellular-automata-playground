import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BoundaryType } from "../types";

interface SceneBoundariesState {
    value: {
        horizontal: BoundaryType;
        vertical: BoundaryType;
    };
}

export const defaultVal = {
    horizontal: "continuous" as BoundaryType,
    vertical: "continuous" as BoundaryType,
};

const initialState: SceneBoundariesState = {
    value: defaultVal,
};

export const sceneBoundariesSlice = createSlice({
    name: "sceneBoundaries",
    initialState,
    reducers: {
        setSceneBoundaries: (
            state,
            action: PayloadAction<{
                horizontal: BoundaryType;
                vertical: BoundaryType;
            }>
        ) => {
            state.value = action.payload;
        },
        setHorizontalBoundaries: (
            state,
            action: PayloadAction<BoundaryType>
        ) => {
            state.value = { ...state.value, horizontal: action.payload };
        },
        setVerticalBoundaries: (state, action: PayloadAction<BoundaryType>) => {
            state.value = { ...state.value, vertical: action.payload };
        },
    },
});

export const selectSceneBoundaries = (state: RootState) =>
    state.sceneBoundaries.value;
export const selectHorizontalBoundaries = (state: RootState) =>
    state.sceneBoundaries.value.horizontal;
export const selectVerticalBoundaries = (state: RootState) =>
    state.sceneBoundaries.value.vertical;

export const {
    setSceneBoundaries,
    setHorizontalBoundaries,
    setVerticalBoundaries,
} = sceneBoundariesSlice.actions;

export default sceneBoundariesSlice.reducer;
