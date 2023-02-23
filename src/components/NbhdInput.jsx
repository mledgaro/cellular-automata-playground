//

import { useContext, useState } from "react";

import FAIcon from "./FAIcon";
import NumberInput from "./NumberInput";

import {
    NbhdContext1D,
    NbhdContext2D,
} from "../sections/settings/Neighborhood";

function Cell({ active, selected, onClick }) {
    //

    let icon;

    active = active == null ? true : active;

    if (active) {
        icon = {
            id: selected ? "square-check" : "square",
            style: "regular",
            size: selected ? "2xl" : "lg",
        };
    } else {
        icon = {
            id: "square-xmark",
            style: "solid",
            size: "sm",
        };
    }

    return (
        <span
            className="cap-icon-cell"
            onClick={onClick}
            style={{ color: !active ? "#6c757d" : "" }}
        >
            <FAIcon icon={icon} />
        </span>
    );
}

function Ellipsis() {
    //

    return (
        <span className="cap-icon-cell">
            <FAIcon icon={{ id: "ellipsis", size: "2xs" }} />
        </span>
    );
}

export function CellGroup1D({ type, numCells, selected, allowSelection}) {
    //

    let cells = [];
    let lastIdx = numCells - 1;

    let select;
    if (allowSelection) {
        select = (i) => selected.set(i);
    } else {
        select = (i) => {};
    }

    for (let i = 0; i < numCells; i++) {
        cells.push(
            <Cell
                key={i}
                selected={allowSelection && selected.get === i}
                onClick={() => select(i)}
            />
        );
    }

    if (allowSelection && type === "grouped") {
        if (selected.get === 0) {
            cells.splice(1, 0, <Ellipsis />);
        } else if (selected.get === lastIdx) {
            cells.splice(lastIdx, 0, <Ellipsis />);
        } else {
            cells.splice(selected.get + 1, 0, <Ellipsis />);
            cells.splice(selected.get, 0, <Ellipsis />);
        }
    } else if (type === "scattered") {
        for (let i = 0; i < lastIdx; i++) {
            cells.splice(i * 2 + 1, 0, <Ellipsis />);
        }
    }

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "fit-content" }}
        >
            {cells}
        </div>
    );
}
function CellGroup2D({ type, width, height, selected, extraClasses }) {
    //

    let isActive;

    switch (type) {
        case "vonneumann":
            isActive = (r, c) => selected.get.r === r || selected.get.c === c;
            break;

        case "diagonal":
            isActive = (r, c) =>
                Math.abs(selected.get.r - r) === Math.abs(selected.get.c - c);
            break;

        default:
            isActive = (r, c) => true;
    }

    let cells = [];

    for (let r = 0, row, sel; r < height; r++) {
        row = [];
        for (let c = 0; c < width; c++) {
            sel = r === selected.get.r && c === selected.get.c;
            row.push(
                <td style={{ padding: "5px" }}>
                    <Cell
                        active={isActive(r, c)}
                        selected={sel}
                        onClick={() => selected.set({ r: r, c: c })}
                    />
                </td>
            );
        }
        cells.push(<tr>{row}</tr>);
    }

    return (
        <table className={`cap-container-dark-1 ${extraClasses}`}>
            {cells}
        </table>
    );
}


export function NbhdInput2D({ type }) {
    //

    const nbhdContext = useContext(NbhdContext2D);

    return (
        <div className="row mt-2 mx-auto" style={{ width: "50%" }}>
            <div className="col">
                <NumberInput
                    label="Width"
                    value={nbhdContext.nbhdWidth}
                    min={2}
                    max={8}
                    alignment="center"
                    extraClasses="mb-2"
                />

                <NumberInput
                    label="Height"
                    value={nbhdContext.nbhdHeight}
                    min={2}
                    max={8}
                    alignment="center"
                />
            </div>

            <div className="col">
                <CellGroup2D
                    type={type}
                    width={nbhdContext.nbhdWidth.get}
                    height={nbhdContext.nbhdHeight.get}
                    selected={nbhdContext.mainCell}
                    extraClasses="mx-auto"
                />
            </div>
        </div>
    );
}
