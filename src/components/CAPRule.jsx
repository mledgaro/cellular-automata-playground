//

import { useState } from "react";

import FAIcon from "./FAIcon";

import { intToBoolArray } from "../js/Utils";

function Cell({ state, main }) {
    return (
        <span className="px-1">
            <FAIcon
                icon={{
                    id: "square",
                    style: state ? "solid" : "regular",
                    size: main ? "lg" : "xs",
                }}
            />
        </span>
    );
}

function Ellipsis() {
    return (
        <span className="">
            <FAIcon icon={{ id: "ellipsis", size: "2xs" }} />
        </span>
    );
}

function Arrow() {
    return (
        <span className="px-1">
            <FAIcon icon={{ id: "arrow-right", style: "solid", size: "sm" }} />
        </span>
    );
}

export function Rule1D({ type, index, nbhdWidth, mainCell }) {
    //

    let cellsState = intToBoolArray(index, nbhdWidth);

    let [alive, setAlive] = useState(false);

    let cells = [];

    mainCell = mainCell === -1 ? nbhdWidth - 1 : mainCell;

    cellsState.forEach((e, i) => {
        cells.push(<Cell state={e} main={i === mainCell} />);
    });

    if (type !== "insitu") {
        //

        if (type === "grouped") {
            cells.splice(mainCell === 0 ? 1 : mainCell, 0, <Ellipsis />);
        } else if (type === "scattered") {
            let len = cells.length - 1;
            for (let i = 0; i < len; i++) {
                cells.splice(i * 2 + 1, 0, <Ellipsis />);
            }
        }
    }

    return (
        <div
            className="cap-container-dark-1 px-2 py-1 mx-auto"
            style={{ width: "fit-content" }}
            onClick={() => setAlive(!alive)}
        >
            {cells}

            <Arrow />

            <Cell state={alive} main={true} />
        </div>
    );
}

export function Rule2D() {
    //

    const [state, setState] = useState(0);
    let icon;

    switch (state) {
        case 1:
            icon = { id: "square", style: "regular", size: "xl" };
            break;
        case 2:
            icon = { id: "square", style: "solid", size: "xl" };
            break;
        default:
            icon = { id: "square-minus", style: "regular", size: "xl" };
    }

    return (
        <span
            className=""
            onClick={() => setState(state === 2 ? 0 : state + 1)}
        >
            <FAIcon icon={icon} />
        </span>
    );
}
