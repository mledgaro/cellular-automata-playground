//

import "./css/App.css";

import React, { useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, faD } from "@fortawesome/free-solid-svg-icons";

import Button from "@mui/material/Button";
import {
    StateHookObj,
    useAppSelector,
    useRangeReducer,
    useStateObj,
} from "./app/hooks";

import { Box, Skeleton } from "@mui/material";
import CanvasController from "./ts/CanvasController";
import CellularAutomaton from "./ts/CellularAutomaton";
import Controls from "./features/Controls";
import { selectNumCells } from "./app/slices/numCells";
import CustomTabs from "./components/Tabs";
import Neighborhood1D from "./features/Neighborhood1D";
import Rules1D from "./features/Rules1D";
import InitialState from "./features/InitialState";
import Neighborhood2D, { NbhdType2D } from "./features/Neighborhood2D";
import { Rules2D } from "./features/Rules2D";

const canvasId = "cap-canvas";
const bufferSize = 64;

export default function App() {
    //
    const numCells = useAppSelector(selectNumCells);

    const dimension = useStateObj<1 | 2>(1);

    const automaton = useRef(new CellularAutomaton());
    const canvasCntrl = useRef<CanvasController>();

    useEffect(() => {
        canvasCntrl.current = new CanvasController(
            document.getElementById(canvasId) as HTMLCanvasElement,
            bufferSize,
            numCells
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box className="space-y-6 my-5">
            <Title dimState={dimension} />

            <div id="canvas-container">
                <canvas id={canvasId} />
            </div>

            {/* <Skeleton
                variant="rectangular"
                width="90vw"
                height="60vh"
                className="mx-auto"
            /> */}

            <Controls
                automaton={automaton.current}
                canvasCntrl={canvasCntrl.current}
            />

            {dimension.get === 1 ? <Settings1D /> : <Settings2D />}

            {/* <Footer /> */}
        </Box>
    );
}

function Title({ dimState }: { dimState: StateHookObj<1 | 2> }) {
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
                    content: <Neighborhood1D />,
                },
                {
                    title: "Rules",
                    content: <Rules1D />,
                },
                {
                    title: "Initial state",
                    content: <InitialState />,
                },
            ]}
        />
    );
}

function Settings2D() {
    //
    const nbhdType = useStateObj<NbhdType2D>("moore");
    const nbhdWidth = useRangeReducer(2, 8, 3, false);
    const nbhdHeight = useRangeReducer(2, 8, 3, false);
    const mainCell = useStateObj<any>({ r: 1, c: 1 });

    return (
        <CustomTabs
            tabs={[
                {
                    title: "Neighborhood",
                    content: (
                        <Neighborhood2D
                            type={nbhdType}
                            width={nbhdWidth}
                            height={nbhdHeight}
                            mainCell={mainCell}
                        />
                    ),
                },
                {
                    title: "Rules",
                    content: (
                        <Rules2D
                            nbhdType={nbhdType.get}
                            nbhdWidth={nbhdWidth.get}
                            nbhdHeight={nbhdHeight.get}
                            mainCell={mainCell.get}
                        />
                    ),
                },
            ]}
        />
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
