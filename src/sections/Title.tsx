//

import React from "react";

import { RangeReducerHook } from "src/CustomHooks";

import { fa1, fa2, faD } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Title({ dimension }: { dimension: RangeReducerHook }) {
    //

    return (
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
    );
}
