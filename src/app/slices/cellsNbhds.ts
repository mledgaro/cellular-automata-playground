//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultVal as numCellsDefault } from "./numCells";
import { defaultVal as nbhdWidthDefault } from "./nbhdWidth";
import { NbhdType, defaultVal as nbhdTypeDefault } from "./nbhdType";
import { defaultVal as mainCellDefault } from "./mainCell";
import { RootState } from "../store";

interface CellsNbhdsState {
    value: number[][];
}

interface SetParams {
    numCells: number;
    width: number;
    type: NbhdType;
    mainCell: number;
}

export const defaultVal = buildNbhd({
    numCells: numCellsDefault,
    width: nbhdWidthDefault,
    type: nbhdTypeDefault,
    mainCell: mainCellDefault,
});

const initialState: CellsNbhdsState = {
    value: defaultVal,
};

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

function buildNbhd(params: SetParams) {
    //
    let arr = [];
    let getNbhd;

    switch (params.type) {
        case "adjacent":
            getNbhd = (index: number) =>
                adjacentNbhd(
                    index,
                    params.numCells,
                    params.width,
                    params.mainCell
                );
            break;
        case "grouped":
            getNbhd = (index: number) =>
                groupedNbhd(
                    index,
                    params.numCells,
                    params.width,
                    params.mainCell
                );
            break;
        case "scattered":
            getNbhd = (index: number) =>
                scatteredNbhd(
                    index,
                    params.numCells,
                    params.width,
                    params.mainCell
                );
            break;
    }

    for (let i = 0; i < params.numCells; i++) {
        arr.push(getNbhd(i));
    }

    return arr;
}

export const cellsNbhdsSlice = createSlice({
    name: "cellsNbhds",
    initialState,
    reducers: {
        setCellsNbhds: (state, action: PayloadAction<SetParams>) => {
            state.value = buildNbhd(action.payload);
        },
    },
});

export const selectCellsNbhds = (state: RootState) => state.cellsNbhds.value;

export const { setCellsNbhds } = cellsNbhdsSlice.actions;

export default cellsNbhdsSlice.reducer;
