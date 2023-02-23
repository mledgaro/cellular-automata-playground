//

import { useContext, useState } from "react";

import FAIcon from "./FAIcon";
import NumberInput from "./NumberInput";

import {
    NbhdContext1D,
    NbhdContext2D,
} from "../sections/settings/Neighborhood";
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

export function Cell({ selected, alive, main, lg, onClick }) {
    //

    let icon;

    selected = selected == null ? false : selected;
    alive = alive == null ? false : alive;
    main = main == null ? true : main;

    icon = {
        id: selected ? "square-check" : "square",
        style: alive ? "solid" : "regular",
        size: selected ? "2xl" : main || lg ? "lg" : "xs",
    };

    return (
        <span className="cap-icon-cell" onClick={onClick}>
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

function Arrow() {
    return (
        <span className="cap-icon-cell">
            <FAIcon icon={{ id: "arrow-right", style: "solid", size: "sm" }} />
        </span>
    );
}

export function CellGroup1D({
    type,
    index,
    nbhdWidth,
    selection,
    mainCell,
    allowSelection,
    rule,
}) {
    //

    let cells;
    let select;

    if (allowSelection) {
        select = (i) => selection.set(i);
    } else {
        select = (i) => {};
    }

    let selectRule;
    if (rule) {
        selectRule = selection.change;
    } else {
        selectRule = () => {};
    }

    index = index == null ? 0 : index;

    cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <Cell
            key={i}
            selected={allowSelection && selection.get === i}
            alive={e}
            main={i === mainCell}
            onClick={() => select(i)}
            lg={!rule}
        />
    ));

    if (type === "grouped" && allowSelection) {
        if (selection.get === 0) {
            cells.splice(1, 0, <Ellipsis />);
        } else if (selection.get === cells.length - 1) {
            cells.splice(cells.length - 1, 0, <Ellipsis />);
        } else {
            cells.splice(selection.get + 1, 0, <Ellipsis />);
            cells.splice(selection.get, 0, <Ellipsis />);
        }
    } else if (type === "scattered") {
        let len = cells.length - 1;
        for (let i = len; i > 0; i--) {
            cells.splice(i, 0, <Ellipsis />);
        }
    }

    let ruleComp;
    if (rule) {
        ruleComp = <span><Arrow /> <Cell alive={selection.get} /></span>;
    }
    else {
        ruleComp = <span />;
    }

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "max-content" }}
            onClick={selectRule}
        >
            {cells}

            {ruleComp}
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
                    
                    {isActive(r, c) &&
                        <Cell
                            selected={sel}
                            onClick={() => selected.set({ r: r, c: c })}
                        />
                    }
                    { !isActive(r, c) &&
                        <DeactivatedCell />
                    }
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
