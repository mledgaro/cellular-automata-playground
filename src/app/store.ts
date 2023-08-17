/* eslint-disable react-hooks/rules-of-hooks */
//

import { configureStore } from "@reduxjs/toolkit";
import numCellsReducer from "src/app/slices/numCells";
import nbhdWidthReducer from "src/app/slices/nbhdWidth";
import nbhdTypeReducer from "src/app/slices/nbhdType";
import mainCellReducer from "src/app/slices/mainCell";
import runningStatusReducer from "src/app/slices/runningStatus";
import refreshTimeReducer from "src/app/slices/refreshTime";
import cellSizeReducer from "src/app/slices/cellSize";
import rulesReducer from "src/app/slices/rules";
import initStateReducer from "src/app/slices/initState";
import cellsNbhdsReducer from "src/app/slices/cellsNbhds";

export const store = configureStore({
    reducer: {
        numCells: numCellsReducer,
        nbhdWidth: nbhdWidthReducer,
        nbhdType: nbhdTypeReducer,
        mainCell: mainCellReducer,
        runningStatus: runningStatusReducer,
        refreshTime: refreshTimeReducer,
        cellSize: cellSizeReducer,
        cellsNbhds: cellsNbhdsReducer,
        rules: rulesReducer,
        initState: initStateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
