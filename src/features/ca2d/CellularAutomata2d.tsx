//
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "src/app/hooks";

import { selectWorldSize } from "src/app/slices/mainFrame/worldSize";
import Nbhd2d from "src/features/ca2d/Nbhd2d";
import Rules2d from "src/features/ca2d/Rules2d";
import useNbhd2d from "src/app/hooks/ca2d/nbhd2d";
import { useRules2d } from "src/app/hooks/ca2d/rules2d";
import InitStateEditor from "src/features/InitStateEditor";
import { CellularAutomaton2d } from "src/ts/CellularAutomaton2d";
import MainFrame from "../mainFrame/MainFrame";
import { copyArray2d, countTrueArray2d, randomBoolArray2d } from "src/ts/Utils";
import { NbhdType2D, Position } from "src/app/types";
import { selectIterations } from "src/app/slices/mainFrame/iterations";
import {
    clearCells,
    selectCells,
    setCells,
    toggleCell,
} from "src/app/slices/mainFrame/cells";

export default function CellularAutomata2d() {
    //
    const worldSize = useAppSelector(selectWorldSize);
    const iterations = useAppSelector(selectIterations);
    const cells = useAppSelector(selectCells);
    const dispatch = useAppDispatch();

    const nbhd = useNbhd2d();
    const rules = useRules2d();

    const initState = useRef<boolean[][] | null>(null);
    const automaton = useRef(new CellularAutomaton2d());

    const liveCells = useRef(0);

    const onCellClick = (r: number, c: number) => {
        liveCells.current += !cells[r][c] ? 1 : -1;
        dispatch(toggleCell({ r: r, c: c }));
    };

    const init = () => {
        automaton.current.setNbhd(nbhd.nbhd, nbhd.mainCell);
        automaton.current.rules = rules.get;
        automaton.current.state = copyArray2d(cells);
        initState.current = copyArray2d(cells);
    };

    const next = () => {
        const nstate = automaton.current.nextState();
        liveCells.current = countTrueArray2d(nstate);
        dispatch(setCells(nstate));
    };

    const stop = () => {
        if (initState.current) {
            liveCells.current = countTrueArray2d(initState.current);
            dispatch(setCells(initState.current));
        } else {
            liveCells.current = 0;
            dispatch(clearCells());
        }
        initState.current = null;
    };

    const rand = (density: number) => {
        let st = randomBoolArray2d(worldSize.rows, worldSize.cols, density);
        liveCells.current = countTrueArray2d(st);
        dispatch(setCells(st));
    };

    const clear = () => {
        liveCells.current = 0;
    };

    const exportData = () => {
        let data = {
            type: "ca2d",
            nbhdType: nbhd.type,
            mainCell: nbhd.mainCell,
            neighborhood: nbhd.nbhd,
            rules: rules.get,
            initialState: initState.current ?? cells,
            currentState: cells,
            iterations: iterations,
        };
        return data;
    };

    const importData = (data: object) => {
        if ("nbhdType" in data) {
            nbhd.setType((data.nbhdType as NbhdType2D) ?? "moore");
        }
        if ("mainCell" in data) {
            nbhd.setMainCellPos((data.mainCell as Position) ?? { r: 1, c: 1 });
        }
        if ("neighborhood" in data) {
            nbhd.setNbhd(data.neighborhood as boolean[][]);
        }
        if ("rules" in data) {
            rules.set(data.rules as (boolean | null)[]);
        }
        if ("initialState" in data) {
            dispatch(setCells(data.initialState as boolean[][]));
        }
    };

    // useEffect(() => {
    //     liveCells.current = countTrueArray2d(cellsState.get);
    // }, [cellsState.get]);

    useEffect(() => {
        rules.resize(nbhd.size);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhd.size]);

    return (
        <MainFrame
            title="2D Cellular Automata"
            init={init}
            next={next}
            stop={stop}
            onCellClick={onCellClick}
            neighborhood={<Nbhd2d state={nbhd} />}
            rules={<Rules2d state={rules} />}
            initialState={<InitStateEditor random={rand} clear={clear} />}
            liveCells={liveCells.current}
            exportData={exportData}
            importData={importData}
        />
    );
}
