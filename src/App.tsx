//

import "./css/App.css";

import React from "react";
import { useRangeReducer } from "./ts/CustomHooks";

import Canvas from "./sections/Canvas";
import Settings1D from "./sections/Settings1D";
import Settings2D from "./sections/settings_2d/Settings2D";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, faD } from "@fortawesome/free-solid-svg-icons";

export default function App() {
    //

    const dimension = useRangeReducer(1, 2, 1, true);

    let settings;

    if (dimension.get === 1) {
        settings = <Settings1D />;
    } else {
        // dimension.get === 2
        settings = <Settings2D />;
    }

    return (
        <div className="App">
            {/* Title */}
            <div className="input-group input-group-lg justify-content-center mt-2">
                <button
                    type="button"
                    className="btn cap-container-clear-1"
                    onClick={dimension.next}
                >
                    <FontAwesomeIcon
                        icon={dimension.get === 1 ? fa1 : fa2}
                        size="2xl"
                    />
                    <FontAwesomeIcon icon={faD} size="2xl" />
                </button>

                <span
                    className="input-group-text cap-container-dark-1"
                    id="app-title"
                >
                    Cellular Automata
                </span>
            </div>

            <Canvas />

            {settings}

            {/* Footer */}
            <div id="footer" className="mt-5 mb-3">
                Universidad Nacional Autónoma de México - Facultad de Ciencias
                <br />
                Ciencias de la Computación - Vida Artificial 2022-2
                <br />
                Edgar Mendoza
                <br />
                mledgaro@ciencias.unam.mx
            </div>
        </div>
    );
}
