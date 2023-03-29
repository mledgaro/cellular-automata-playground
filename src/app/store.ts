/* eslint-disable react-hooks/rules-of-hooks */
//

import { configureStore } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks";
import { NbhdType } from "src/features/nbhdType";
import numCellsReducer, { selectNumCells } from "src/features/numCells";
import nbhdWidthReducer, { selectNbhdWidth } from "src/features/nbhdWidth";
import nbhdTypeReducer, { selectNbhdType } from "src/features/nbhdType";
import mainCellReducer, { selectMainCell } from "src/features/mainCell";
import liveCellsTypeReducer, {
    LiveCellsType,
    selectLiveCellsType,
} from "src/features/liveCellsType";
import distributionTypeReducer, {
    DistributionType,
    selectDistributionType,
} from "src/features/distributionType";
import liveCellsReducer, { selectLiveCells } from "src/features/liveCells";
import groupMinSizeReducer, {
    selectGroupMinSize,
} from "src/features/groupMinSize";
import groupMaxSizeReducer, {
    selectGroupMaxSize,
} from "src/features/groupMaxSize";
import runningStatusReducer, {
    RunningStatusType,
    selectRunningStatus,
} from "src/features/runningStatus";
import refreshTimeReducer, {
    selectRefreshTime,
    selectRefreshTimeIndex,
} from "src/features/refreshTime";
import cellSizeReducer, {
    selectCellSize,
    selectCellSizeIndex,
} from "src/features/cellSize";
import rulesReducer from "src/features/rules";
import initStateReducer from "src/features/initState";
import cellsNbhdsReducer from "src/features/cellsNbhds";
import { boolArrayToInt } from "src/ts/Utils";

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
        return useAppSelector(selectNumCells);
    },
    get nbhdWidth(): number {
        return useAppSelector(selectNbhdWidth);
    },
    get nbhdType(): NbhdType {
        return useAppSelector(selectNbhdType);
    },
    get mainCell(): number {
        return useAppSelector(selectMainCell);
    },
    get liveCellsType(): LiveCellsType {
        return useAppSelector(selectLiveCellsType);
    },
    get distributionType(): DistributionType {
        return useAppSelector(selectDistributionType);
    },
    get liveCells(): number {
        return useAppSelector(selectLiveCells);
    },
    get groupMinSize(): number {
        return useAppSelector(selectGroupMinSize);
    },
    get groupMaxSize(): number {
        return useAppSelector(selectGroupMaxSize);
    },
    get runningStatus(): RunningStatusType {
        return useAppSelector(selectRunningStatus);
    },
    get refreshTime(): number {
        return useAppSelector(selectRefreshTime);
    },
    get refreshTimeIndex(): number {
        return useAppSelector(selectRefreshTimeIndex);
    },
    get cellSize(): number {
        return useAppSelector(selectCellSize);
    },
    get cellSizeIndex(): number {
        return useAppSelector(selectCellSizeIndex);
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
