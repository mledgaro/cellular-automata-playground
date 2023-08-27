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
import { selectInitState } from "./app/slices/initState";
import { resizeRules, selectRules } from "./app/slices/rules";
import { selectCellsNbhds } from "./app/slices/cellsNbhds";
import { selectNbhdWidth } from "./app/slices/nbhdWidth";

export default function App() {
    //
    return (
        // <BrowserRouter>
        <Box>
            <CellularAutomata1d />

            {/* <Routes>
                    <Route index element={<CellularAutomata1d />} />
                    <Route path="ca1d" element={<CellularAutomata1d />} />
                    <Route path="ca2d" element={<Settings2D />} />
                </Routes> */}
        </Box>
        // </BrowserRouter>
    );
}

function CellularAutomata1d() {
    //
    const nbhdWidth = useAppSelector(selectNbhdWidth);

    const dispatch = useAppDispatch();

    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);
    const initState = useAppSelector(selectInitState);

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
        dispatch(resizeRules(Math.pow(2, nbhdWidth)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhdWidth]);

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

    useEffect(() => {
        rules.resize(nbhd.size);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhd.size]);

    return (
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
    );
}
