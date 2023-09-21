import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "src/app/slices/mainFrame/data";
import worldSizeReducer from "src/app/slices/mainFrame/worldSize";
import worldLimitsReducer from "src/app/slices/mainFrame/worldLimits";
import cellsSizeReducer from "src/app/slices/mainFrame/cellsSize";
import cursorPositionReducer from "src/app/slices/mainFrame/cursorPosition";
import gridVisibilityReducer from "src/app/slices/mainFrame/gridVisibility";
import iterationsReducer from "src/app/slices/mainFrame/iterations";
import flowStatusReducer from "src/app/slices/mainFrame/flowStatus";
import cellsReducer from "src/app/slices/mainFrame/cells";
import nbhdTypeReducer from "src/app/slices/ca1d/nbhdType";
import nbhdWidthReducer from "src/app/slices/ca1d/nbhdWidth";
import nbhdCenterReducer from "src/app/slices/ca1d/nbhdCenter";
import cellsNbhdReducer from "src/app/slices/ca1d/cellsNbhd";
import rulesReducer from "src/app/slices/ca1d/rules";
import nbhd2dReducer from "src/app/slices/ca2d/nbhd2d";
import nbhdCenter2dReducer from "src/app/slices/ca2d/nbhdCenter2d";
import rules2dReducer from "src/app/slices/ca2d/rules2d";
// import _Reducer from "./slices/_";

export const store = configureStore({
    reducer: {
        data: dataReducer,
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
