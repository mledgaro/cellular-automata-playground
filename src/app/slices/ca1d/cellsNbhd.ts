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
    numCells: number;
    nbhdWidth: number;
    nbhdType: NbhdType1D;
    nbhdCenter: number;
}

export const defaultValue = buildNbhd(
    worldSizeDefault.cols,
    nbhdWidthDefault,
    nbhdTypeDefault,
    nbhdCenterDefault
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
                action.payload.numCells,
                action.payload.nbhdWidth,
                action.payload.nbhdType,
                action.payload.nbhdCenter
            );
        },
    },
});

export const selectCellsNbhd = (state: RootState) => state.cellsNbhd.value;

export const { setCellsNbhd, reloadCellsNbhd } = cellsNbhdSlice.actions;

export default cellsNbhdSlice.reducer;

function adjacentNbhd(
    index: number,
    numCells: number,
    width: number,
    main: number
): number[] {
    //

    let nbhd = [];
    let a = index - main;
    let b = a + width;

    for (let i = a; i < b; i++) {
        nbhd.push(i);
    }

    if (a < 0) {
        nbhd = nbhd.map((e) => (e < 0 ? numCells + e : e));
    }

    if (b >= numCells) {
        nbhd = nbhd.map((e) => e % numCells);
    }

    return nbhd;
}

function groupedNbhd(
    index: number,
    numCells: number,
    width: number,
    mainCell: number
): number[] {
    //

    let nbhd = [];
    let a = Math.round(Math.random() * numCells);
    let b = a + width;

    for (let i = a; i < b; i++) {
        nbhd.push(i);
    }

    if (a < 0) {
        nbhd = nbhd.map((e) => (e < 0 ? numCells + e : e));
    }

    if (b >= numCells) {
        nbhd = nbhd.map((e) => e % numCells);
    }

    if (mainCell >= 0) {
        nbhd.splice(mainCell, 1, index);
    }

    return nbhd;
}

function scatteredNbhd(
    index: number,
    numCells: number,
    width: number,
    mainCell: number
): number[] {
    //

    let nbhd = [];

    for (let i = 0; i < width; i++) {
        nbhd.push(Math.round(Math.random() * numCells));
    }

    if (mainCell >= 0) {
        nbhd.splice(mainCell, 1, index);
    }

    return nbhd;
}

function buildNbhd(
    numCells: number,
    width: number,
    type: NbhdType1D,
    mainCell: number
) {
    //
    let arr = [];
    let getNbhd;

    switch (type) {
        case "adjacent":
            getNbhd = (index: number) =>
                adjacentNbhd(index, numCells, width, mainCell);
            break;
        case "grouped":
            getNbhd = (index: number) =>
                groupedNbhd(index, numCells, width, mainCell);
            break;
        case "scattered":
            getNbhd = (index: number) =>
                scatteredNbhd(index, numCells, width, mainCell);
            break;
    }

    for (let i = 0; i < numCells; i++) {
        arr.push(getNbhd(i));
    }

    return arr;
}
