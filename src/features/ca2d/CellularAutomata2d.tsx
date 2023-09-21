//
import React, { useRef } from "react";

import { useAppDispatch, useAppSelector, useStateObj } from "src/app/hooks";

import {
    selectWorldSize,
    setWorldSize,
} from "src/app/slices/mainFrame/worldSize";
import Nbhd2d from "src/features/ca2d/Nbhd2d";
import Rules2d from "src/features/ca2d/Rules2d";
import InitStateEditor from "src/features/InitStateEditor";
import MainFrame from "src/features/mainFrame/MainFrame";
import {
    copyArray2d,
    countTrue2d,
    resizeArray2d,
    randomBool2d,
} from "src/ts/Utils";
import {
    DataFileCA2D,
    DataFileObj,
    NbhdType2D,
    Position,
    Size,
} from "src/app/types";
import { selectIterations } from "src/app/slices/mainFrame/iterations";
import {
    clearCells,
    selectCells,
    setCells,
    toggleCell,
} from "src/app/slices/mainFrame/cells";
import { selectWorldLimitsGetCell } from "src/app/slices/mainFrame/worldLimits";
import { selectNbhd2d, setNbhd2d } from "src/app/slices/ca2d/nbhd2d";
import {
    selectNbhdCenter2d,
    setNbhdCenter2d,
} from "src/app/slices/ca2d/nbhdCenter2d";
import { selectRules2d, setRules2d } from "src/app/slices/ca2d/rules2d";

const slug = "ca2d";

export default function CellularAutomata2d() {
    //
    const worldSize = useAppSelector(selectWorldSize);
    const getCell = useAppSelector(selectWorldLimitsGetCell);
    const iterations = useAppSelector(selectIterations);
    const cells = useAppSelector(selectCells);

    const nbhd = useAppSelector(selectNbhd2d);
    const nbhdCenter = useAppSelector(selectNbhdCenter2d);
    const rules = useAppSelector(selectRules2d);

    const dispatch = useAppDispatch();

    const nbhdType = useStateObj<NbhdType2D>("moore");
    const initState = useRef<boolean[][] | null>(null);
    const calcNbhd_ = useRef(calcNbhd(nbhd, nbhdCenter));
    const liveCells = useRef(0);

    const onCellClick = (r: number, c: number) => {
        liveCells.current += !cells[r][c] ? 1 : -1;
        dispatch(toggleCell({ r: r, c: c }));
    };

    const init = () => {
        calcNbhd_.current = calcNbhd(nbhd, nbhdCenter);
        initState.current = copyArray2d(cells);
    };

    const next = () => {
        const nstate = nextState(calcNbhd_.current, rules, worldSize, getCell);
        liveCells.current = countTrue2d(nstate);
        dispatch(setCells(nstate));
    };

    const stop = () => {
        if (initState.current) {
            liveCells.current = countTrue2d(initState.current);
            dispatch(setCells(initState.current));
        } else {
            liveCells.current = 0;
            dispatch(clearCells());
        }
        initState.current = null;
    };

    const rand = (density: number) => {
        let st = randomBool2d(worldSize.rows, worldSize.cols, density);
        liveCells.current = countTrue2d(st);
        dispatch(setCells(st));
    };

    const clear = () => {
        liveCells.current = 0;
    };

    const exportData = () => {
        return {
            type: slug,
            worldSize: worldSize,
            nbhdType: nbhdType.get,
            nbhd: nbhd,
            nbhdCenter: nbhdCenter,
            rules: rules,
            initState: initState.current ?? cells,
            currState: cells,
            iterations: iterations,
        };
    };

    const importData = (data: DataFileObj) => {
        let data_ = data as DataFileCA2D;
        dispatch(setWorldSize(data_.worldSize));
        nbhdType.set(data_.nbhdType);
        dispatch(setNbhd2d(data_.nbhd));
        dispatch(setNbhdCenter2d(data_.nbhdCenter));
        dispatch(setRules2d(data_.rules));
        dispatch(
            setCells(
                resizeArray2d(
                    data_.initState,
                    data_.worldSize.rows,
                    data_.worldSize.cols,
                    false
                )
            )
        );
        console.log("ca2d loading data");
    };

    return (
        <MainFrame
            title="2D Cellular Automata"
            slug={slug}
            init={init}
            next={next}
            stop={stop}
            onCellClick={onCellClick}
            neighborhood={<Nbhd2d type={nbhdType} />}
            rules={<Rules2d />}
            initialState={<InitStateEditor random={rand} clear={clear} />}
            liveCells={liveCells.current}
            exportData={exportData}
            importData={importData}
        />
    );
}

function calcNbhd(nbhd: boolean[][], center: Position): (Position | null)[][] {
    //
    let pr: number;
    let cnbhd = nbhd.map((row, ri) => {
        pr = ri - center.r;
        return row.map((n) => (n ? { r: pr, c: 0 } : null));
    });
    cnbhd[center.r][center.c] = null;

    for (let ci = 0, pc, ri; ci < cnbhd[0].length; ci++) {
        pc = ci - center.c;
        for (ri = 0; ri < cnbhd.length; ri++) {
            if (cnbhd[ri][ci] !== null) {
                cnbhd[ri][ci]!.c = pc;
            }
        }
    }
    return cnbhd;
}

function nextState(
    nbhd: (Position | null)[][],
    rules: (boolean | null)[],
    worldSize: Size,
    getCell: (r: number, c: number) => boolean
): boolean[][] {
    //
    const nstate = [];
    let row, nnbrs;
    for (let r = 0; r < worldSize.rows; r++) {
        row = [];
        for (let c = 0; c < worldSize.cols; c++) {
            nnbrs = nbhd.reduce(
                (accr, row) =>
                    accr +
                    row.reduce(
                        (acc, nbr) =>
                            acc +
                            (nbr && getCell(r + nbr.r, c + nbr.c) ? 1 : 0),
                        0
                    ),
                0
            );
            row.push(rules[nnbrs] ?? getCell(r, c));
        }
        nstate.push(row);
    }
    return nstate;
}
