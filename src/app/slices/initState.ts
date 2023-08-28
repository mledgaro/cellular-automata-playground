//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultVal as numCellsDefault } from "./numCells";
import { RootState } from "../store";

export type DistributionType = "even" | "rand";

interface InitStateState {
    value: boolean[];
    liveCells: number;
    clusterSize: number[];
    distribution: DistributionType;
}

export const initialState: InitStateState = {
    value: buildState(numCellsDefault, 1, [1, 1], "even"),
    liveCells: 1,
    clusterSize: [1, 1],
    distribution: "even",
};

function variableDist(
    minVal: number,
    maxVal: number,
    totalSum: number
): number[] {
    //

    let arr = [];
    let diff = Math.abs(maxVal - minVal);
    let sum = 0;
    let num;

    while (sum < totalSum) {
        num = minVal + Math.round(Math.random() * diff);
        arr.push(num);
        sum += num;
    }

    arr[arr.length - 1] -= sum - totalSum;

    return arr;
}

/**
 * Returns an array of n = 'nums' random integers whose sum equals 'totalSum'.
 * @param {Int} nums number of integers
 * @param {Int} totalSum total sum
 */
function randomDist(nums: number, totalSum: number): number[] {
    //

    let arr = [];
    let sum = 0;

    for (let i = 0, n; i < nums; i++) {
        n = Math.round(Math.random() * totalSum);
        arr.push(n);
        sum += n;
    }

    let trim = Math.round((sum - totalSum) / nums);

    for (let i = 0, diff, trimAc = 0; i < nums; i++) {
        diff = arr[i] - (trim + trimAc);
        if (diff > 0) {
            arr[i] = diff;
            trimAc = 0;
        } else {
            arr[i] = 1;
            trimAc = Math.abs(diff + 1);
        }
    }

    return arr;
}

function buildState(
    numCells: number,
    liveCells: number,
    clusterSize: number[],
    distribution: DistributionType
) {
    //
    const [clusterSizeMin, clusterSizeMax] = clusterSize;

    if (liveCells >= 0 && liveCells < 1) {
        liveCells = Math.round(liveCells * numCells);
    } else {
        liveCells = Math.max(1, Math.min(liveCells, numCells));
    }

    let deadCells = numCells - liveCells;

    let groupSizeDiff = Math.abs(clusterSizeMax - clusterSizeMin);

    let trueArr, falseArr;

    if (groupSizeDiff > 0) {
        trueArr = variableDist(clusterSizeMin, clusterSizeMax, liveCells);
    } else {
        trueArr = Array(Math.round(liveCells / clusterSizeMin)).fill(
            clusterSizeMin
        );
    }

    if (distribution === "rand") {
        falseArr = randomDist(trueArr.length + 1, deadCells);
    } else {
        falseArr = Array(trueArr.length + 1).fill(
            Math.round(deadCells / (trueArr.length + 1))
        );
    }

    let arr: boolean[] = [];

    for (let i = 0; i < trueArr.length; i++) {
        arr = arr.concat(
            Array(falseArr[i]).fill(false).concat(Array(trueArr[i]).fill(true))
        );
    }

    let diff = numCells - arr.length;
    if (diff <= 0) {
        arr = arr.slice(0, numCells);
    } else {
        arr = arr.concat(Array(diff).fill(false));
    }

    return arr;
}

export const initStateSlice = createSlice({
    name: "initState",
    initialState,
    reducers: {
        setLiveCells: (state, action: PayloadAction<number>) => {
            state.liveCells = action.payload;
            state.value = buildState(
                state.value.length,
                action.payload,
                state.clusterSize,
                state.distribution
            );
        },
        setClusterSize: (state, action: PayloadAction<number[]>) => {
            state.clusterSize = action.payload;
            state.value = buildState(
                state.value.length,
                state.liveCells,
                action.payload,
                state.distribution
            );
        },
        setDistribution: (state, action: PayloadAction<DistributionType>) => {
            state.distribution = action.payload;
            state.value = buildState(
                state.value.length,
                state.liveCells,
                state.clusterSize,
                action.payload
            );
        },
        reloadInitState: (state) => {
            state.value = buildState(
                state.value.length,
                state.liveCells,
                state.clusterSize,
                state.distribution
            );
        },
        toggleInitStateCell: (state, action: PayloadAction<number>) => {
            state.value = state.value.map((e, i) =>
                i === action.payload ? !e : e
            );
        },
        resizeInitState: (state, action: PayloadAction<number>) => {
            state.value = state.value = buildState(
                action.payload,
                state.liveCells,
                state.clusterSize,
                state.distribution
            );
        },
    },
});

export const selectInitState = (state: RootState) => state.initState.value;
export const selectLiveCells = (state: RootState) => state.initState.liveCells;
export const selectClusterSize = (state: RootState) =>
    state.initState.clusterSize;
export const selectDistribution = (state: RootState) =>
    state.initState.distribution;

export const {
    setLiveCells,
    setClusterSize,
    setDistribution,
    reloadInitState,
    resizeInitState,
    toggleInitStateCell,
} = initStateSlice.actions;

export default initStateSlice.reducer;
