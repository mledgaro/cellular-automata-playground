/* eslint-disable react-hooks/rules-of-hooks */
//

import { configureStore } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks";
import { NbhdType } from "src/ts/CellularAutomaton";
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
    selectRefreshTimeLength,
} from "src/features/refreshTime";
import cellSizeReducer, {
    selectCellSize,
    selectCellSizeIndex,
    selectCellSizeLength,
} from "src/features/cellSize";

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
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dataStore = {
    numCells: (): number => useAppSelector(selectNumCells),
    nbhdWidth: (): number => useAppSelector(selectNbhdWidth),
    nbhdType: (): NbhdType => useAppSelector(selectNbhdType),
    mainCell: (): number => useAppSelector(selectMainCell),
    liveCellsType: (): LiveCellsType => useAppSelector(selectLiveCellsType),
    distributionType: (): DistributionType =>
        useAppSelector(selectDistributionType),
    liveCells: (): number => useAppSelector(selectLiveCells),
    groupMinSize: (): number => useAppSelector(selectGroupMinSize),
    groupMaxSize: (): number => useAppSelector(selectGroupMaxSize),
    runningStatus: (): RunningStatusType => useAppSelector(selectRunningStatus),
    refreshTime: (): number => useAppSelector(selectRefreshTime),
    refreshTimeIndex: (): number => useAppSelector(selectRefreshTimeIndex),
    refreshTimeLength: (): number => useAppSelector(selectRefreshTimeLength),
    cellSize: (): number => useAppSelector(selectCellSize),
    cellSizeIndex: (): number => useAppSelector(selectCellSizeIndex),
    cellSizeLength: (): number => useAppSelector(selectCellSizeLength),
};
