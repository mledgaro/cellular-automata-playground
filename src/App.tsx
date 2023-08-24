//
import "./css/App.css";

import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, faD } from "@fortawesome/free-solid-svg-icons";

import Button from "@mui/material/Button";
import { StateObjHook, useAppSelector, useStateObj } from "./app/hooks";

import { Box } from "@mui/material";
import Controls from "./features/Controls";
import { selectNumCells } from "./app/slices/numCells";
import CustomTabs from "./components/Tabs";
import Nbhd1d from "./features/ca1d/Nbhd1d";
import Rules1d from "./features/ca1d/Rules1d";
import InitState1d from "./features/ca1d/InitState1d";
import Nbhd2d from "./features/ca2d/Nbhd2d";
import Rules2d from "./features/ca2d/Rules2d";
import CellularAutomaton1D from "./ts/CellularAutomaton1D";
import useNbhd2d from "./app/hooks/nbhd2d";
import { useRules2d } from "./app/hooks/rules2d";
import useInitState2d from "./app/hooks/initState2d";
import InitState2d from "./features/ca2d/InitState2d";

const canvasId = "cap-canvas";
const bufferSize = 64;

export default function App() {
    //
    const numCells = useAppSelector(selectNumCells);

    const dimension = useStateObj<1 | 2>(1);

    const automaton = useStateObj<CellularAutomaton1D | undefined>(undefined);

    useEffect(() => {
        automaton.set(
            new CellularAutomaton1D(canvasId, bufferSize, numCells, 8)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box className="space-y-6 my-5">
            <Title dimState={dimension} />

            <div className="max-w-[95vw] max-h-[65vh] w-fit mx-auto overflow-auto">
                <canvas id={canvasId} />
            </div>

            {/* <Skeleton
                variant="rectangular"
                width="90vw"
                height="60vh"
                className="mx-auto"
            /> */}

            <Controls automaton={automaton.get} />

            {dimension.get === 1 ? <Settings1D /> : <Settings2D />}

            {/* <Footer /> */}
        </Box>
    );
}

function Title({ dimState }: { dimState: StateObjHook<1 | 2> }) {
    return (
        <div className="flex justify-center">
            <Button
                className="bg-sunglow text-jet rounded-s-lg rounded-e-none"
                variant="contained"
                onClick={() => dimState.set(dimState.get === 1 ? 2 : 1)}
            >
                <FontAwesomeIcon
                    icon={dimState.get === 1 ? fa1 : fa2}
                    size="3x"
                />
                <FontAwesomeIcon icon={faD} size="3x" />
            </Button>

            <span className="bg-jet text-sunglow text-4xl py-2 px-3 rounded-e-lg select-none">
                Cellular Automata
            </span>
        </div>
    );
}

function Settings1D() {
    return (
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
    );
}

function Settings2D() {
    //
    const numCells = useAppSelector(selectNumCells);

    const nbhd = useNbhd2d();
    const rules = useRules2d();
    const initState = useInitState2d(bufferSize, numCells);

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

function Footer() {
    return (
        <div className="text-sm font-medium text-center">
            Universidad Nacional Autónoma de México - Facultad de Ciencias
            <br />
            Ciencias de la Computación - Vida Artificial 2022-2
            <br />
            Edgar Mendoza
            <br />
            mledgaro@ciencias.unam.mx
        </div>
    );
}
