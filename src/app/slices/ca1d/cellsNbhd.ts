import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { defaultValue as worldSizeDefault } from "src/app/slices/mainFrame/worldSize";
import { defaultValue as nbhdTypeDefault } from "src/app/slices/ca1d/nbhdType";
import { defaultValue as nbhdWidthDefault } from "src/app/slices/ca1d/nbhdWidth";
import { defaultValue as nbhdCenterDefault } from "src/app/slices/ca1d/nbhdCenter";
import { NbhdType1D } from "src/app/types";

interface CellsNbhdState {
    value: number[][];
}

export interface ReloadCellsNbhdParams {
    nbhdType: NbhdType1D;
    nbhdWidth: number;
    nbhdCenter: number;
    numCells: number;
}

export const defaultValue = buildNbhd(
    nbhdTypeDefault,
    nbhdWidthDefault,
    nbhdCenterDefault,
    worldSizeDefault.cols
);

const initialState: CellsNbhdState = {
    value: defaultValue,
};

export const cellsNbhdSlice = createSlice({
    name: "cellsNbhd",
    initialState,
    reducers: {
        setCellsNbhd: (state, action: PayloadAction<number[][]>) => {
            state.value = action.payload;
        },
        reloadCellsNbhd: (
            state,
            action: PayloadAction<ReloadCellsNbhdParams>
        ) => {
            state.value = buildNbhd(
                action.payload.nbhdType,
                action.payload.nbhdWidth,
                action.payload.nbhdCenter,
                action.payload.numCells
            );
        },
    },
});

export const selectCellsNbhd = (state: RootState) => state.cellsNbhd.value;

export const { setCellsNbhd, reloadCellsNbhd } = cellsNbhdSlice.actions;

export default cellsNbhdSlice.reducer;

function adjacentNbhd(index: number, width: number, center: number): number[] {
    //
    const nbhd = [];
    const a = index - center;
    const b = a + width;

    for (let i = a; i < b; i++) {
        nbhd.push(i);
    }

    return nbhd;
}

function groupedNbhd(
    index: number,
    width: number,
    center: number,
    numCells: number
): number[] {
    //
    const nbhd = [];
    const a = Math.round(Math.random() * numCells);
    const b = a + width;

    for (let i = a; i < b; i++) {
        nbhd.push(i);
    }

    if (center >= 0) {
        nbhd.splice(center, 1, index);
    }

    return nbhd;
}

function scatteredNbhd(
    index: number,
    width: number,
    center: number,
    numCells: number
): number[] {
    //
    const nbhd = [];

    for (let i = 0; i < width; i++) {
        nbhd.push(Math.round(Math.random() * numCells));
    }

    if (center >= 0) {
        nbhd.splice(center, 1, index);
    }

    return nbhd;
}

function buildNbhd(
    type: NbhdType1D,
    width: number,
    center: number,
    numCells: number
) {
    //
    const arr = [];
    let getNbhd;

    switch (type) {
        case "adjacent":
            getNbhd = (index: number) => adjacentNbhd(index, width, center);
            break;
        case "grouped":
            getNbhd = (index: number) =>
                groupedNbhd(index, width, center, numCells);
            break;
        case "scattered":
            getNbhd = (index: number) =>
                scatteredNbhd(index, width, center, numCells);
            break;
    }

    for (let i = 0; i < numCells; i++) {
        arr.push(getNbhd(i));
    }

    return arr;
}
