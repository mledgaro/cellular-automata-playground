import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { Position, Size } from "src/app/types";
import { createArray2d, extendArray2d, setArray2dItem } from "src/ts/Utils";
import { defaultValue as worldSizeDefault } from "src/app/slices/mainFrame/worldSize";

interface CellsState {
    value: boolean[][];
}

const initialState: CellsState = {
    value: createArray2d(worldSizeDefault.rows, worldSizeDefault.cols, false),
};

export const cellsSlice = createSlice({
    name: "cells",
    initialState,
    reducers: {
        setCells: (state, action: PayloadAction<boolean[][]>) => {
            state.value = action.payload;
        },
        toggleCell: (state, action: PayloadAction<Position>) => {
            const pos = action.payload;
            state.value = setArray2dItem(
                pos.r,
                pos.c,
                state.value,
                !state.value[pos.r][pos.c]
            );
        },
        clearCells: (state) => {
            state.value = state.value.map((row) => row.map(() => false));
        },
        resizeCellsArr: (state, action: PayloadAction<Size>) => {
            const size = action.payload;
            state.value = extendArray2d(
                state.value,
                size.rows,
                size.cols,
                false
            );
        },
    },
});

export const selectCells = (state: RootState) => state.cells.value;

export const { setCells, toggleCell, clearCells, resizeCellsArr } =
    cellsSlice.actions;

export default cellsSlice.reducer;
