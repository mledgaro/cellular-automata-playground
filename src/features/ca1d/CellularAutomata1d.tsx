//
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "src/app/hooks";

import {
    selectWorldSize,
    setWorldSize,
} from "src/app/slices/mainFrame/worldSize";
import Nbhd1d from "src/features/ca1d/Nbhd1d";
import Rules1d from "src/features/ca1d/Rules1d";
import InitStateEditor from "src/features/InitStateEditor";
import MainFrame from "../mainFrame/MainFrame";
import {
    boolArrayToInt,
    countTrue,
    createArray,
    createArray2d,
    resizeArray2d,
    randomBool,
} from "src/ts/Utils";
import { selectIterations } from "src/app/slices/mainFrame/iterations";
import { DataFileCA1D, DataFileObj, NbhdType1D } from "src/app/types";
import { selectNbhdType, setNbhdType } from "src/app/slices/ca1d/nbhdType";
import { selectNbhdWidth, setNbhdWidth } from "src/app/slices/ca1d/nbhdWidth";
import { selectCellsNbhd, setCellsNbhd } from "src/app/slices/ca1d/cellsNbhd";
import { selectRules, setRules } from "src/app/slices/ca1d/rules";
import {
    selectNbhdCenter,
    setNbhdCenter,
} from "src/app/slices/ca1d/nbhdCenter";
import {
    selectCells,
    setCells,
    toggleCell,
} from "src/app/slices/mainFrame/cells";
import { selectWorldLimitsGetCell } from "src/app/slices/mainFrame/worldLimits";

const slug = "ca1d";

export default function CellularAutomata1d() {
    //
    const worldSize = useAppSelector(selectWorldSize);

    const getCell = useAppSelector(selectWorldLimitsGetCell);
    const iterations = useAppSelector(selectIterations);
    const cells = useAppSelector(selectCells) as boolean[][];

    const nbhdType = useAppSelector(selectNbhdType);
    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const nbhdCenter = useAppSelector(selectNbhdCenter);
    const cellsNbhd = useAppSelector(selectCellsNbhd);
    const rules = useAppSelector(selectRules);

    const dispatch = useAppDispatch();

    const initState = useRef<boolean[] | null>(null);
    const currState = useRef<boolean[] | null>(null);
    const liveCells = useRef(0);

    const onCellClick = (_: number, c: number) => {
        let nval = !cells[0][c];
        dispatch(toggleCell({ r: 0, c: c }));
        liveCells.current += nval ? 1 : -1;
    };

    const init = () => {
        initState.current = cells[0];
        currState.current = cells[0];
    };

    const next = () => {
        //
        let nstate: boolean[];

        if (iterations >= worldSize.rows) {
            nstate = nextState(
                cellsNbhd,
                rules,
                worldSize.cols,
                (idx: number) => getCell(worldSize.rows - 1, idx)
            );
            dispatch(setCells(cells.slice(1).concat([nstate])));
        } else {
            nstate = nextState(
                cellsNbhd,
                rules,
                worldSize.cols,
                (idx: number) => getCell(iterations, idx)
            );
            dispatch(
                setCells(
                    cells.map((r, i) => (i === iterations + 1 ? nstate : r))
                )
            );
        }
        currState.current = nstate;
        liveCells.current = countTrue(nstate);
    };

    const stop = () => {
        dispatch(
            setCells(
                [
                    initState.current ?? createArray(worldSize.cols, false),
                ].concat(
                    createArray2d(worldSize.rows - 1, worldSize.cols, false)
                )
            )
        );

        liveCells.current = countTrue(initState.current ?? []);
        initState.current = null;
        currState.current = null;
    };

    const rand = (density: number) => {
        let st = randomBool(worldSize.cols, density);
        dispatch(
            setCells(
                [st].concat(
                    createArray2d(worldSize.rows - 1, worldSize.cols, false)
                )
            )
        );
        liveCells.current = countTrue(st);
    };

    const clear = () => {
        liveCells.current = 0;
    };

    const exportData = () => {
        return {
            type: slug,
            worldSize: worldSize,
            nbhdType: nbhdType,
            nbhdWidth: nbhdWidth,
            nbhdCenter: nbhdCenter,
            cellsNbhd: cellsNbhd,
            rules: rules,
            initState: initState.current ?? cells[0],
            currState: currState.current ?? cells[0],
            iterations: iterations,
        };
    };

    const importData = (data: DataFileObj) => {
        let data_ = data as DataFileCA1D;
        console.log("ca1d import data", data_);
        dispatch(setWorldSize(data_.worldSize));
        dispatch(setNbhdType(data_.nbhdType));
        dispatch(setNbhdWidth(data_.nbhdWidth));
        dispatch(setNbhdCenter(data_.nbhdCenter));
        dispatch(setCellsNbhd(data_.cellsNbhd));
        dispatch(setRules(data_.rules));
        dispatch(
            setCells(
                resizeArray2d(
                    [data_.initState],
                    data_.worldSize.rows,
                    data_.worldSize.cols,
                    false
                )
            )
        );
    };

    return (
        <MainFrame
            title="1D Cellular Automata"
            slug={slug}
            init={init}
            next={next}
            stop={stop}
            onCellClick={onCellClick}
            neighborhood={<Nbhd1d />}
            rules={<Rules1d />}
            initialState={<InitStateEditor random={rand} clear={clear} />}
            liveCells={liveCells.current}
            exportData={exportData}
            importData={importData}
        />
    );
}

function nextState(
    cellsNbhds: number[][],
    rules: boolean[],
    worldSize: number,
    getCell: (idx: number) => boolean
): boolean[] {
    //
    let nstate = [];
    for (let i = 0, nbhd, rule, cell; i < worldSize; i++) {
        nbhd = cellsNbhds[i].map((e) => getCell(e));
        rule = boolArrayToInt(nbhd, false);
        cell = rules[rule];
        nstate.push(cell);
    }
    return nstate;
}
