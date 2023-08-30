//
import "./css/App.css";

import React, { useEffect, useRef } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    StateObjHook,
    useAppDispatch,
    useAppSelector,
    useStateObj,
} from "./app/hooks";

import { Box } from "@mui/material";
import { selectNumCells } from "./app/slices/numCells";
import CustomTabs from "./components/Tabs";
import Nbhd1d from "./features/ca1d/Nbhd1d";
import Rules1d from "./features/ca1d/Rules1d";
import InitState1d from "./features/ca1d/InitState1d";
import Nbhd2d from "./features/ca2d/Nbhd2d";
import Rules2d from "./features/ca2d/Rules2d";
import CellularAutomaton1d from "./ts/CellularAutomaton1d";
import useNbhd2d from "./app/hooks/nbhd2d";
import { useRules2d } from "./app/hooks/rules2d";
import useInitState2d from "./app/hooks/initState2d";
import InitState2d from "./features/ca2d/InitState2d";
import Scene from "./features/Scene";
import CanvasCntrl from "./ts/CanvasCntrl";
import { resizeInitState, selectInitState } from "./app/slices/initState";
import { resizeRules, selectRules } from "./app/slices/rules";
import { selectCellsNbhds, setCellsNbhds } from "./app/slices/cellsNbhds";
import { selectNbhdWidth } from "./app/slices/nbhdWidth";
import { selectNbhdType } from "./app/slices/nbhdType";
import { selectMainCell } from "./app/slices/mainCell";
import { CellularAutomaton2d } from "./ts/CellularAutomaton2d";

export default function App() {
    //
    return (
        <BrowserRouter>
            <Box>
                <Routes>
                    <Route index element={<CellularAutomata2d />} />
                    <Route path="ca1d" element={<CellularAutomata1d />} />
                    <Route path="ca2d" element={<CellularAutomata2d />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

function CellularAutomata1d() {
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

    const init = (canvas: CanvasCntrl | undefined) => {
        automaton.current.initState = initState;
        canvas!.paintRow(automaton.current.ticks, automaton.current.state);
    };

    const next = (canvas: CanvasCntrl | undefined) => {
        automaton.current.nextState(cellsNbhds, rules);
        canvas!.paintRow(automaton.current.ticks, automaton.current.state);
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
            <Box className="cap-title">1D Cellular Automata</Box>
            <Scene init={init} next={next} />
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

function CellularAutomata2d() {
    //
    const numCells = useAppSelector(selectNumCells);

    const nbhd = useNbhd2d();
    const rules = useRules2d();
    const initState = useInitState2d(64, numCells);

    const automaton = useRef(new CellularAutomaton2d());

    useEffect(() => {
        rules.resize(nbhd.size);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhd.size]);

    const init = (canvas: CanvasCntrl | undefined) => {
        automaton.current.setNbhd(nbhd.nbhd, nbhd.mainCell);
        automaton.current.rules = rules.get;
        automaton.current.state = initState.get;
        canvas?.paintScene(automaton.current.state);
    };

    const next = (canvas: CanvasCntrl | undefined) => {
        automaton.current.nextState();
        canvas?.paintScene(automaton.current.state);
    };

    return (
        <Box className="space-y-6 my-5">
            <Box className="cap-title">2D Cellular Automata</Box>
            <Scene init={init} next={next} />
            <CustomTabs
                tabs={[
                    {
                        title: "Neighborhood",
                        content: <Nbhd2d state={nbhd} />,
                    },
                    {
                        title: "Rules",
                        content: <Rules2d state={rules} />,
                    },
                    {
                        title: "Init state",
                        content: <InitState2d state={initState} />,
                    },
                ]}
            />
        </Box>
    );
}
