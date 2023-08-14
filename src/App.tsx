//

import "./css/App.css";

import React, { useEffect, useRef } from "react";

import Settings2D from "./sections/Settings2D";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, faD } from "@fortawesome/free-solid-svg-icons";

import Button from "@mui/material/Button";
import { StateHookObj, useAppSelector, useStateObj } from "./app/hooks";
import Settings1D from "./sections/Settings1D";
import { Box, Skeleton } from "@mui/material";
import CanvasController from "./ts/CanvasController";
import CellularAutomaton from "./ts/CellularAutomaton";
import Controls from "./sections/Controls";

const canvasId = "cap-canvas";
const bufferSize = 64;
// const automaton = new CellularAutomaton();
// let canvasCntrl: CanvasController;
// let timer: NodeJS.Timer;

export default function App() {
    //

    const dimension = useStateObj(1);

    const settings = dimension.get === 1 ? <Settings1D /> : <Settings2D />;

    const numCells = useAppSelector((state) => state.numCells.value);

    // const automaton = useRef(new CellularAutomaton());
    // const canvasCntrl = useRef(
    //     new CanvasController(canvasId, bufferSize, numCells)
    // );
    // const timer = useRef(setInterval() as NodeJS.Timer);

    // useEffect(() => {
    //     canvasCntrl = new CanvasController(canvasId, bufferSize, numCells);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <Box className="space-y-5 my-5">
            <Title dimState={dimension} />

            {/* <Canvas /> */}
            {/* <div id="canvas-container">
                <canvas id={canvasId} />
            </div> */}
            <Skeleton
                variant="rectangular"
                width="90vw"
                height="60vh"
                className="mx-auto"
            />

            <Controls
            // automaton={automaton.current}
            // canvasCntrl={canvasCntrl.current}
            // timer={timer.current}
            />

            {settings}

            {/* <Footer /> */}
        </Box>
    );
}

function Title({ dimState }: { dimState: StateHookObj }) {
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

function Footer() {
    return (
        <div id="footer" className="mt-5 mb-3">
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
