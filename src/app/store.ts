/* eslint-disable react-hooks/rules-of-hooks */
//

import { configureStore } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks";
import { NbhdType } from "src/features/nbhdType";
import numCellsReducer from "src/features/numCells";
import nbhdWidthReducer from "src/features/nbhdWidth";
import nbhdTypeReducer from "src/features/nbhdType";
import mainCellReducer from "src/features/mainCell";
import liveCellsTypeReducer, {
    LiveCellsType,
} from "src/features/liveCellsType";
import distributionTypeReducer, {
    DistributionType,
} from "src/features/distributionType";
import liveCellsReducer from "src/features/liveCells";
import groupMinSizeReducer from "src/features/groupMinSize";
import groupMaxSizeReducer from "src/features/groupMaxSize";
import runningStatusReducer, {
    RunningStatusType,
} from "src/features/runningStatus";
import refreshTimeReducer from "src/features/refreshTime";
import cellSizeReducer from "src/features/cellSize";
import rulesReducer from "src/features/rules";
import initStateReducer from "src/features/initState";
import cellsNbhdsReducer from "src/features/cellsNbhds";
import { boolArrayToInt } from "src/ts/Utils";
import { values as refreshTimeValues } from "src/features/refreshTime";
import { values as cellSizeValues } from "src/features/cellSize";

export const store = configureStore({
    reducer: {
        numCells: numCellsReducer,
        nbhdWidth: nbhdWidthReducer,
        nbhdType: nbhdTypeReducer,
        mainCell: mainCellReducer,
        liveCellsType: liveCellsTypeReducer,
        distributionType: distributionTypeReducer,
        liveCells: liveCellsReducer,
        groupMinSize: groupMinSizeReducer,
        groupMaxSize: groupMaxSizeReducer,
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

export const dataStore = {
    get numCells(): number {
        return useAppSelector((state) => state.numCells.value);
    },
    get nbhdWidth(): number {
        return useAppSelector((state) => state.nbhdWidth.value);
    },
    get nbhdType(): NbhdType {
        return useAppSelector((state) => state.nbhdType.value);
    },
    get mainCell(): number {
        return useAppSelector((state) => state.mainCell.value);
    },
    get liveCellsType(): LiveCellsType {
        return useAppSelector((state) => state.liveCellsType.value);
    },
    get distributionType(): DistributionType {
        return useAppSelector((state) => state.distributionType.value);
    },
    get liveCells(): number {
        return useAppSelector((state) => state.liveCells.value);
    },
    get groupMinSize(): number {
        return useAppSelector((state) => state.groupMinSize.value);
    },
    get groupMaxSize(): number {
        return useAppSelector((state) => state.groupMaxSize.value);
    },
    get runningStatus(): RunningStatusType {
        return useAppSelector((state) => state.runningStatus.value);
    },
    get refreshTime(): number {
        return useAppSelector(
            (state) => refreshTimeValues[state.refreshTime.value]
        );
    },
    get refreshTimeIndex(): number {
        return useAppSelector((state) => state.refreshTime.value);
    },
    get cellSize(): number {
        return useAppSelector((state) => cellSizeValues[state.cellSize.value]);
    },
    get cellSizeIndex(): number {
        return useAppSelector((state) => state.cellSize.value);
    },
    cellsNbhds: {
        get arr(): number[][] {
            return useAppSelector((state) => state.cellsNbhds.value);
        },
        getCell(index: number): number[] {
            return useAppSelector((state) => state.cellsNbhds.value[index]);
        },
    },
    rules: {
        get arr(): boolean[] {
            return useAppSelector((state) => state.rules.value);
        },
        getState(ruleNumber: number): boolean {
            return useAppSelector((state) => state.rules.value[ruleNumber]);
        },
        get integer(): number {
            return useAppSelector((state) =>
                boolArrayToInt(state.rules.value, true)
            );
        },
    },
    initState: {
        get arr(): boolean[] {
            return useAppSelector((state) => state.initState.value);
        },
        getCell(index: number): boolean {
            return useAppSelector((state) => state.initState.value[index]);
        },
    },
};
