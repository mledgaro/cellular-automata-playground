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

function Rule1DPrefix({ type, index, nbhdWidth, mainCell }) {
    //

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <Cell key={i} state={e} main={i === mainCell} />
    ));

    if (type === "grouped") {
        cells.splice(mainCell === 0 ? 1 : mainCell, 0, <Ellipsis />);
    } else if (type === "scattered") {
        let len = cells.length - 1;
        for (let i = 0; i < len; i++) {
            cells.splice(i * 2 + 1, 0, <Ellipsis />);
        }
    }

    cells.push(<Arrow />);

    return <span>{cells}</span>;
}

export function Rule1D({ type, index, nbhdWidth, mainCell, state }) {
    //

    mainCell = mainCell === -1 ? nbhdWidth - 1 : mainCell;

    return (
        <div
            className="cap-container-dark-1 px-2 py-1 mx-auto"
            style={{ width: "fit-content" }}
            onClick={state.change}
        >
            <Rule1DPrefix
                type={type}
                index={index}
                nbhdWidth={nbhdWidth}
                mainCell={mainCell}
            />

            <Cell state={state.get} main={true} />
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
