import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface GridVisibilityState {
    value: boolean;
}

export const defaultValue = false;

const initialState: GridVisibilityState = {
    value: defaultValue,
};

export const gridVisibilitySlice = createSlice({
    name: "gridVisibility",
    initialState,
    reducers: {
        showGrid: (state) => {
            state.value = true;
        },
        hideGrid: (state) => {
            state.value = false;
        },
        toggleGridVisibility: (state) => {
            state.value = !state.value;
        },
    },
});

export const selectGridVisibility = (state: RootState) =>
    state.gridVisibility.value;

export const { showGrid, hideGrid, toggleGridVisibility } =
    gridVisibilitySlice.actions;

export default gridVisibilitySlice.reducer;
