//

import { useContext, useState } from "react";
import CAPNumberInput from "./CAPNumberInput";
import { NbhdContext } from "../sections/settings/Neighborhood";
import { inputGroupClasses } from "../js/Utils";
import FAIcon from "./FAIcon";

function Cell({ selected, onClick }) {
    //

    let icon = {
        id: selected ? "square-check" : "square",
        style: "regular",
        size: selected ? "2xl" : "lg",
    };

    return (
        <span
            className="input-group-text cap-text-label px-1"
            onClick={onClick}
        >
            &nbsp;
            <FAIcon icon={icon} />
        </span>
    );
}

function Ellipsis() {
    //

    return (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon icon={{ id: "ellipsis", size: "xs" }} />
        </span>
    );
}

function Container({ content, size, alignment, onClick }) {
    return (
        <div
            className={inputGroupClasses(size, alignment, "")}
            // onClick={() => setSelected(selected === 0 ? -1 : 0)}
            onClick={onClick}
        >
            {content}
        </div>
    );
}

function CAPCellGroup({ type, numCells, selected, size, alignment }) {
    //

    let cells = [];
    let onClickCell = (i) => {};
    let onClickCont = () => {};
    let lastIdx = numCells - 1;

    selected.set(selected.get === -1 ? lastIdx : selected.get);

    if (type === "insitu") {
        onClickCell = (i) => selected.set(i);
    } else {
        onClickCont = () => selected.set(selected.get === 0 ? lastIdx : 0);
    }

    for (let i = 0; i < numCells; i++) {
        cells.push(
            <Cell
                selected={selected.get === i}
                onClick={() => onClickCell(i)}
            />
        );
    }

    if (type === "grouped") {
        if (selected.get === 0) {
            cells.splice(1, 0, <Ellipsis />);
        } else {
            cells.splice(lastIdx, 0, <Ellipsis />);
        }
    } else if (type === "scattered") {
        for (let i = 0; i < lastIdx; i++) {
            cells.splice(i * 2 + 1, 0, <Ellipsis />);
        }
    }

    return (
        <Container
            content={cells}
            size={size}
            alignment={alignment}
            onClick={onClickCont}
        />
    );
}

export function CAPNbhdInput1D({ type }) {
    //

    const nbhdContext = useContext(NbhdContext);

    let updateNumCells;

    if (type === "insitu") {
        nbhdContext.mainCell.set(Math.ceil(nbhdContext.nbhdWidth.get / 2) - 1);
        updateNumCells = (val) => {
            nbhdContext.nbhdWidth.set(val);
            nbhdContext.mainCell.set(Math.ceil(val / 2) - 1);
        };
    } else {
        nbhdContext.mainCell.set(0);
        updateNumCells = (val) => {
            nbhdContext.nbhdWidth.set(val);
            nbhdContext.mainCell.set(0);
        };
    }

    return (
        <div className="row">
            <div className="col">
                <CAPNumberInput
                    label="Cells"
                    value={{
                        get: nbhdContext.nbhdWidth.get,
                        set: updateNumCells,
                    }}
                    min={2}
                    max={16}
                    alignment="end"
                />
            </div>

            <div className="col">
                <CAPCellGroup
                    type={type}
                    numCells={nbhdContext.nbhdWidth.get}
                    selected={nbhdContext.mainCell}
                    alignment="start"
                />
            </div>
        </div>
    );
}
function Cell2({ selected, onClick }) {
    //

    let icon = {
        id: selected ? "square-check" : "square",
        style: "regular",
        size: selected ? "2xl" : "lg",
    };

    return (
        <span className="cap-icon-cell" onClick={onClick}>
            <FAIcon icon={icon} />
        </span>
    );
}
function CellGroup2D({ type, width, height, selected, extraClasses }) {
    //

    let cells = [];

    for (let r = 0, row, sel; r < height; r++) {
        row = [];
        for (let c = 0; c < width; c++) {
            sel = r === selected.get.r && c === selected.get.c;
            row.push(
                <td style={{ padding: "5px" }}>
                    <Cell2
                        selected={sel}
                        onClick={() => selected.set({ r: r, c: c })}
                    />
                </td>
            );
        }
        cells.push(<tr>{row}</tr>);
    }

    return <table className={`cap-cell-group ${extraClasses}`}>{cells}</table>;
}

export function NbhdInput2D() {
    //

    let [selected, setSelected] = useState({ r: 1, c: 1 });
    let [width, setWidth] = useState(3);
    let [height, setHeight] = useState(3);

    return (
        <div className="row mt-2 mx-auto" style={{ width: "50%" }}>
            <div className="col">
                <CAPNumberInput
                    label="Width"
                    value={{
                        get: width,
                        set: setWidth,
                    }}
                    min={2}
                    max={8}
                    alignment="center"
                    extraClasses="mb-2"
                />
                
                <CAPNumberInput
                    label="Height"
                    value={{
                        get: height,
                        set: setHeight,
                    }}
                    min={2}
                    max={8}
                    alignment="center"
                />
            </div>

            <div className="col">
                <CellGroup2D
                    width={width}
                    height={height}
                    selected={{ get: selected, set: setSelected }}
                    extraClasses="mx-auto"
                />
            </div>
        </div>
    );
}
