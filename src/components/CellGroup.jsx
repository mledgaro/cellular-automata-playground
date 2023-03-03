//

import { useContext } from "react";

import FAIcon from "./FAIcon";
import NumberInput from "./NumberInput";

import { NbhdContext2D } from "../sections/settings/Neighborhood";
import { intToBoolArray } from "../js/Utils";

function DeactivatedCell({ onClick }) {
    //

    return (
        <span
            className="cap-icon-cell"
            onClick={onClick}
            style={{ color: "#6c757d" }}
        >
            <FAIcon
                icon={{
                    id: "square-xmark",
                    style: "solid",
                    size: "sm",
                }}
            />
        </span>
    );
}

function SelectedCell({ onClick }) {
    //

    return (
        <span className="cap-icon-cell" onClick={onClick}>
            <FAIcon
                icon={{
                    id: "square-check",
                    style: "regular",
                    size: "2xl",
                }}
            />
        </span>
    );
}

function Cell({ alive, main, onClick }) {
    //

    alive = alive == null ? false : alive;
    main = main == null ? true : main;

    return (
        <span className="cap-icon-cell" onClick={onClick}>
            <FAIcon
                icon={{
                    id: "square",
                    style: alive ? "solid" : "regular",
                    size: main ? "lg" : "xs",
                }}
            />
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

function Arrow() {
    return (
        <span className="cap-icon-cell">
            <FAIcon icon={{ id: "arrow-right", style: "solid", size: "sm" }} />
        </span>
    );
}

function addEllipses(cells, type, mainCell) {
    //

    if (type === "grouped") {
        if (mainCell === 0) {
            cells.splice(1, 0, <Ellipsis />);
        } else if (mainCell === cells.length - 1) {
            cells.splice(cells.length - 1, 0, <Ellipsis />);
        } else if (mainCell > 0) {
            cells.splice(mainCell + 1, 0, <Ellipsis />);
            cells.splice(mainCell, 0, <Ellipsis />);
        }

        return cells;
    } else if (type === "scattered") {
        let len = cells.length - 1;
        for (let i = len; i > 0; i--) {
            cells.splice(i, 0, <Ellipsis />);
        }
        return cells;
    }

    return cells;
}

export function NbhdInput({ type, nbhdWidth, selection }) {
    //

    let cells = [];

    for (let i = 0; i < nbhdWidth; i++) {
        cells.push(<Cell onClick={() => selection.set(i)} />);
    }

    if (selection.get !== -1) {
        cells.splice(
            selection.get,
            1,
            <SelectedCell onClick={() => selection.set(-1)} />
        );
    }

    cells = addEllipses(cells, type, selection.get);

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "max-content" }}
        >
            {cells}
        </div>
    );
}

export function Rule({ type, index, nbhdWidth, mainCell, selection }) {
    //

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <Cell key={i} alive={e} main={i === mainCell} />
    ));

    cells = addEllipses(cells, type, mainCell);

    cells.push(<Arrow />);
    cells.push(<Cell alive={selection.get} />);

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "max-content" }}
            onClick={selection.change}
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
                    {isActive(r, c) && (
                        <Cell
                            selected={sel}
                            onClick={() => selected.set({ r: r, c: c })}
                        />
                    )}
                    {!isActive(r, c) && <DeactivatedCell />}
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
