import { configureStore } from "@reduxjs/toolkit";
import worldSizeReducer from "src/app/slices/mainFrame/worldSize";
import worldLimitsReducer from "src/app/slices/mainFrame/worldLimits";
import cellsSizeReducer from "./slices/mainFrame/cellsSize";
import cursorPositionReducer from "./slices/mainFrame/cursorPosition";
import gridVisibilityReducer from "./slices/mainFrame/gridVisibility";
import iterationsReducer from "./slices/mainFrame/iterations";
import flowStatusReducer from "./slices/mainFrame/flowStatus";
import cellsReducer from "./slices/mainFrame/cells";
import nbhdTypeReducer from "./slices/ca1d/nbhdType";
import nbhdWidthReducer from "./slices/ca1d/nbhdWidth";
import nbhdCenterReducer from "./slices/ca1d/nbhdCenter";
import cellsNbhdReducer from "./slices/ca1d/cellsNbhd";
import rulesReducer from "./slices/ca1d/rules";
import nbhd2dReducer from "./slices/ca2d/nbhd2d";
import nbhdCenter2dReducer from "./slices/ca2d/nbhdCenter2d";
import rules2dReducer from "./slices/ca2d/rules2d";
// import _Reducer from "./slices/_";

export const store = configureStore({
    reducer: {
        worldSize: worldSizeReducer,
        worldLimits: worldLimitsReducer,
        cells: cellsReducer,
        cellsSize: cellsSizeReducer,
        cursorPosition: cursorPositionReducer,
        gridVisibility: gridVisibilityReducer,
        iterations: iterationsReducer,
        flowStatus: flowStatusReducer,
        nbhdType: nbhdTypeReducer,
        nbhdWidth: nbhdWidthReducer,
        nbhdCenter: nbhdCenterReducer,
        cellsNbhd: cellsNbhdReducer,
        rules: rulesReducer,
        nbhd2d: nbhd2dReducer,
        nbhdCenter2d: nbhdCenter2dReducer,
        rules2d: rules2dReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
