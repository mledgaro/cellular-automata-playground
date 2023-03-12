//

import React, { useContext, useCallback } from "react";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";

import { OptionGroup } from "../../components/SectionSelector";
import NumberInput from "../../components/NumberInput";
import Button from "../../components/Button";
import { IconCell, SelectedCell, Ellipses } from "../../components/Cells";
import { BoolArrHook, useBoolArrState } from "../../ts/CustomHooks";
import {
    APICtx,
    CellsNbhdsCtx,
    MainCellCtx,
    NbhdTypeCtx,
    NbhdWidthCtx,
    NumCellsCtx,
} from "src/App";
import { NbhdType } from "src/ts/CellularAutomaton";
import { boolArray } from "src/ts/Utils";

function Width() {
    //

    const width = useContext(NbhdWidthCtx);
    const api = useContext(APICtx);

    return (
        <NumberInput
            label="Width"
            value={{
                get: width,
                prev: api.nbhdWidth.prev,
                next: api.nbhdWidth.next,
                set: api.nbhdWidth.set,
            }}
            min={2}
            max={8}
            size="sm"
            alignment="center"
        />
    );
}

function Type() {
    //

    const type = useContext(NbhdTypeCtx);
    const api = useContext(APICtx);

    return (
        <OptionGroup
            title="Type"
            options={[
                { label: "Adjacent", value: "adjacent" },
                { label: "Grouped", value: "grouped" },
                { label: "Scattered", value: "scattered" },
            ]}
            selected={{ get: type, set: api.nbhdType.set }}
            size="sm"
            alignment="center"
        />
    );
}

function MainCellSelector() {
    //

    const width = useContext(NbhdWidthCtx);
    const type = useContext(NbhdTypeCtx) as NbhdType;
    const mainCell = useContext(MainCellCtx);
    const api = useContext(APICtx);

    let cells = [];

    for (let i = 0; i < width; i++) {
        cells.push(<IconCell onClick={() => api.mainCell.set(i)} size="lg" />);
    }

    if (mainCell !== -1) {
        cells.splice(
            mainCell,
            1,
            <SelectedCell onClick={() => api.mainCell.set(-1)} />
        );
    }

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "max-content" }}
        >
            <Ellipses cells={cells} mainCell={mainCell} nbhdType={type} />
        </div>
    );
}

function UpdateNbhds() {
    //

    const nbhdWidth = useContext(NbhdWidthCtx);
    const nbhdType = useContext(NbhdTypeCtx) as NbhdType;
    const mainCell = useContext(MainCellCtx);
    const api = useContext(APICtx);

    return (
        <Button
            icon={faDiagramProject}
            tooltipLabel="Change neighborhoods"
            onClick={() => api.cellsNbhds.set(nbhdWidth, nbhdType, mainCell)}
        />
    );
}

function HighlightCell({
    index,
    highlightedCells,
}: {
    index: number;
    highlightedCells: BoolArrHook;
}) {
    //

    const numCells = useContext(NumCellsCtx);
    const cellsNbhds = useContext(CellsNbhdsCtx);

    const highlight = useCallback(() => {
        //
        let nArr = Array(numCells).fill(false);
        cellsNbhds(index).forEach((e) => (nArr[e] = true));
        highlightedCells.set(nArr);
    }, [cellsNbhds]);

    const classes = `cap-cell cap-cell-off ${
        highlightedCells.get[index] ? "cap-cell-high" : ""
    }`;

    return <span className={classes} onMouseOver={highlight} />;
}

function NbhdsMap() {
    //

    const numCells = useContext(NumCellsCtx);

    const highlightedCells = useBoolArrState(boolArray(numCells, false));

    return (
        <div className="row mx-auto ps-2 mt-2" style={{ width: "90%" }}>
            {highlightedCells.get.map((e, i) => (
                <HighlightCell
                    key={i}
                    index={i}
                    highlightedCells={highlightedCells}
                />
            ))}
        </div>
    );
}

export default function Neighborhood1D() {
    //

    return (
        <div>
            <div className="row mx-auto" style={{ width: "85%" }}>
                {/* */}

                <div className="col-3 d-flex align-items-center">
                    <Width />
                </div>

                <div className="col-4">
                    <Type />
                </div>

                <div className="col-4 d-flex align-items-center">
                    <MainCellSelector />
                </div>

                <div className="col-1 d-flex align-items-center">
                    <UpdateNbhds />
                </div>
            </div>

            <NbhdsMap />
        </div>
    );
}
