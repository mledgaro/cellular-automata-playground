//
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SceneSizeState {
    value: {
        rows: number;
        cols: number;
    };
}

export const defaultVal = {
    rows: 128,
    cols: 128,
};

const initialState: SceneSizeState = {
    value: defaultVal,
};

export const sceneSizeSlice = createSlice({
    name: "sceneSize",
    initialState,
    reducers: {
        setSceneSize: (
            state,
            action: PayloadAction<{ rows: number; cols: number }>
        ) => {
            state.value = action.payload;
        },
        setSceneRows: (state, action: PayloadAction<number>) => {
            state.value = { ...state.value, rows: action.payload };
        },
        setSceneCols: (state, action: PayloadAction<number>) => {
            state.value = { ...state.value, cols: action.payload };
        },
    },
});

export const selectSceneRows = (state: RootState) => state.sceneSize.value.rows;
export const selectSceneCols = (state: RootState) => state.sceneSize.value.cols;
export const selectSceneSize = (state: RootState) => state.sceneSize.value;

export const { setSceneSize, setSceneRows, setSceneCols } =
    sceneSizeSlice.actions;

export default sceneSizeSlice.reducer;
