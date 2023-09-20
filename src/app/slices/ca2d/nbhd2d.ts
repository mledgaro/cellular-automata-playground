import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { Position } from "src/app/types";
import { addColumn, addRow, setArray2dItem } from "src/ts/Utils";

interface Nbhd2dState {
    value: boolean[][];
}

const mooreNbhd = [
    [true, true, true],
    [true, false, true],
    [true, true, true],
];

const vonNeumannNbhd = [
    [false, true, false],
    [true, false, true],
    [false, true, false],
];

const customNbhd = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
];

const initialState: Nbhd2dState = {
    value: mooreNbhd,
};

export const nbhd2dSlice = createSlice({
    name: "nbhd2d",
    initialState,
    reducers: {
        setNbhd2d: (state, action: PayloadAction<boolean[][]>) => {
            state.value = action.payload;
        },
        setNbhd2dMoore: (state) => {
            state.value = mooreNbhd;
        },
        setNbhd2dVonNeumann: (state) => {
            state.value = vonNeumannNbhd;
        },
        setNbhd2dCustom: (state) => {
            state.value = customNbhd;
        },
        toggleNbhd2dCell: (state, action: PayloadAction<Position>) => {
            const pos = action.payload;
            state.value = setArray2dItem(
                pos.r,
                pos.c,
                state.value,
                !state.value[pos.r][pos.c]
            );
        },
        addRowNbhd2d: (state) => {
            state.value = addRow(state.value, false);
        },
        removeRowNbhd2d: (state) => {
            state.value = addRow(state.value, true);
        },
        addColNbhd2d: (state) => {
            state.value = addColumn(state.value, false);
        },
        removeColNbhd2d: (state) => {
            state.value = addColumn(state.value, true);
        },
    },
});

export const selectNbhd2d = (state: RootState) => state.nbhd2d.value;

export const {
    setNbhd2d,
    setNbhd2dMoore,
    setNbhd2dVonNeumann,
    setNbhd2dCustom,
    toggleNbhd2dCell,
    addRowNbhd2d,
    addColNbhd2d,
    removeRowNbhd2d,
    removeColNbhd2d,
} = nbhd2dSlice.actions;

export default nbhd2dSlice.reducer;
