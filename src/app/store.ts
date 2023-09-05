/* eslint-disable react-hooks/rules-of-hooks */
//

import { configureStore } from "@reduxjs/toolkit";
import sceneSizeReducer from "src/app/slices/sceneSize";
import nbhdWidthReducer from "src/app/slices/nbhdWidth";
import nbhdTypeReducer from "src/app/slices/nbhdType";
import mainCellReducer from "src/app/slices/mainCell";
import rulesReducer from "src/app/slices/rules";
import initStateReducer from "src/app/slices/initState";
import cellsNbhdsReducer from "src/app/slices/cellsNbhds";

export const store = configureStore({
    reducer: {
        sceneSize: sceneSizeReducer,
        nbhdWidth: nbhdWidthReducer,
        nbhdType: nbhdTypeReducer,
        mainCell: mainCellReducer,
        cellsNbhds: cellsNbhdsReducer,
        rules: rulesReducer,
        initState: initStateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
