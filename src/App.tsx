//

import "./css/App.css";

import React from "react";

import Canvas from "./sections/Canvas";
import Settings2D from "./sections/Settings2D";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, faD } from "@fortawesome/free-solid-svg-icons";

import Button from "@mui/material/Button";
import { StateHookObj, useStateObj } from "./app/hooks";
import Settings1D from "./sections/Settings1D";
import { Skeleton } from "@mui/material";

export default function App() {
    //

    const dimension = useStateObj(1);

    const settings = dimension.get === 1 ? <Settings1D /> : <Settings2D />;

    return (
        <div>
            <Title dimState={dimension} />

            {/* <Canvas /> */}
            <Skeleton
                variant="rectangular"
                width="90vw"
                height="60vh"
                className="mx-auto"
            />

            {settings}

            {/* <Footer /> */}
        </div>
    );
}

function Title({ dimState }: { dimState: StateHookObj }) {
    return (
        <div className="flex justify-center py-4">
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
