//
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "src/app/hooks";

import { Box } from "@mui/material";
import { selectNumCells } from "src/app/slices/numCells";
import CustomTabs from "src/components/Tabs";
import Nbhd1d from "src/features/ca1d/Nbhd1d";
import Rules1d from "src/features/ca1d/Rules1d";
import InitState1d from "src/features/ca1d/InitState1d";
import CellularAutomaton1d from "src/ts/CellularAutomaton1d";
import Scene from "src/features/Scene";
import CanvasCntrl from "src/ts/CanvasCntrl";
import {
    resizeInitState,
    selectInitState,
    toggleInitStateCell,
} from "src/app/slices/initState";
import { resizeRules, selectRules } from "src/app/slices/rules";
import { selectCellsNbhds, setCellsNbhds } from "src/app/slices/cellsNbhds";
import { selectNbhdWidth } from "src/app/slices/nbhdWidth";
import { selectNbhdType } from "src/app/slices/nbhdType";
import { selectMainCell } from "src/app/slices/mainCell";
import { createArray2d } from "src/ts/Utils";

export default function CellularAutomata1d() {
    //
    const numCells = useAppSelector(selectNumCells);
    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const nbhdType = useAppSelector(selectNbhdType);
    const mainCell = useAppSelector(selectMainCell);
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);
    const initState = useAppSelector(selectInitState);

    const dispatch = useAppDispatch();

    const automaton = useRef(new CellularAutomaton1d());
    const buffer = useRef(createArray2d(64, numCells, false));

    const init = (canvas: CanvasCntrl | undefined) => {
        automaton.current.initState = initState;
        initState.forEach((cell, i) => (buffer.current[0][i] = cell));
        canvas!.paintRow(automaton.current.iterations, automaton.current.state);
    };

    const next = (canvas: CanvasCntrl | undefined) => {
        automaton.current.nextState(cellsNbhds, rules);
        if (automaton.current.iterations < (canvas?.rows ?? 0)) {
            automaton.current.state.forEach(
                (cell, i) =>
                    (buffer.current[automaton.current.iterations][i] = cell)
            );
            canvas!.paintRow(
                automaton.current.iterations,
                automaton.current.state
            );
        } else {
            buffer.current.shift();
            buffer.current.push(automaton.current.state);
            canvas?.paintScene(buffer.current);
        }
        return [automaton.current.state];
    };

    const toggle = (canvas: CanvasCntrl | undefined, r: number, c: number) => {
        const newVal = !initState[c];
        dispatch(toggleInitStateCell(c));
        canvas?.paintCell(0, c, newVal);
    };

    useEffect(() => {
        dispatch(
            setCellsNbhds({
                numCells: numCells,
                width: nbhdWidth,
                type: nbhdType,
                mainCell: mainCell,
            })
        );
    }, [numCells, nbhdWidth, nbhdType, mainCell]);

    useEffect(() => {
        dispatch(resizeRules(Math.pow(2, nbhdWidth)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhdWidth]);

    useEffect(() => {
        dispatch(resizeInitState(numCells));
    }, [numCells]);

    return (
        <Box className="space-y-6 my-5">
            <Scene cells={initState} toggle={toggle} init={init} next={next} />
            <CustomTabs
                tabs={[
                    {
                        title: "Neighborhood",
                        content: <Nbhd1d />,
                    },
                    {
                        title: "Rules",
                        content: <Rules1d />,
                    },
                    {
                        title: "Initial state",
                        content: <InitState1d />,
                    },
                ]}
            />
        </Box>
    );
}
