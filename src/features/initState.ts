//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DistributionType } from "./distributionType";

interface InitStateState {
    value: boolean[];
}

interface SetParams {
    numCells: number;
    liveCells: number;
    groupMinSize: number;
    groupMaxSize: number;
    distribution: DistributionType;
}

const initialState: InitStateState = {
    value: [],
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

export const initStateSlice = createSlice({
    name: "initState",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<SetParams>) => {
            //
            const params = action.payload;

            if (params.liveCells >= 0 && params.liveCells < 1) {
                params.liveCells = Math.round(
                    params.liveCells * params.numCells
                );
            } else {
                params.liveCells = Math.max(
                    1,
                    Math.min(params.liveCells, params.numCells)
                );
            }

            let deadCells = params.numCells - params.liveCells;

            let groupSizeDiff = Math.abs(
                params.groupMaxSize - params.groupMinSize
            );

            let trueArr, falseArr;

            if (groupSizeDiff > 0) {
                trueArr = variableDist(
                    params.groupMinSize,
                    params.groupMaxSize,
                    params.liveCells
                );
            } else {
                trueArr = Array(
                    Math.round(params.liveCells / params.groupMinSize)
                ).fill(params.groupMinSize);
            }

            if (params.distribution === "rand") {
                falseArr = randomDist(trueArr.length + 1, deadCells);
            } else {
                falseArr = Array(trueArr.length + 1).fill(
                    Math.round(deadCells / (trueArr.length + 1))
                );
            }

            let arr: boolean[] = [];

            for (let i = 0; i < trueArr.length; i++) {
                arr = arr.concat(
                    Array(falseArr[i])
                        .fill(false)
                        .concat(Array(trueArr[i]).fill(true))
                );
            }

            let diff = params.numCells - arr.length;
            if (diff <= 0) {
                arr = arr.slice(0, params.numCells);
            } else {
                arr = arr.concat(Array(diff).fill(false));
            }

            state.value = arr;
        },
        toggleCell: (state, action: PayloadAction<number>) => {
            state.value = state.value.map((e, i) =>
                i === action.payload ? !e : e
            );
        },
    },
});

const { set, toggleCell } = initStateSlice.actions;

export const setInitState = set;
export const toggleCellInitState = toggleCell;

export default initStateSlice.reducer;
