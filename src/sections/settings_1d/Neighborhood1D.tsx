//

import React, { createContext, useContext, useCallback } from "react";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";

import { OptionGroup } from "../../components/SectionSelector";
import NumberInput from "../../components/NumberInput";
import Button from "../../components/Button";
import {
    Cell,
    SelectedCell,
    Ellipses,
} from "../../components/Cells";
import {
    ArrayStateHook,
    BoolArrHook,
    RangeReducerHook,
    StateObjHook,
    useBoolArrState,
} from "../../CustomHooks";

import { boolArray } from "src/ts/Utils";
import { NbhdType } from "src/ts/CellularAutomaton";

const WidthCtx = createContext(3);
const TypeCtx = createContext("none");
const MainCellCtx = createContext(1);
const CellsNbhdsCtx = createContext([[0]]);
const APICtx = createContext({
    width: {
        next: () => {},
        prev: () => {},
        set: (val: number) => {},
    },
    type: { set: (val: any) => {} },
    mainCell: { set: (val: any) => {} },
    cellsNbhds: {
        set: (val: any) => {},
        setAt: (val: any, index: number) => {},
    },
});

function Width() {
    //

    const width = useContext(WidthCtx);
    const api = useContext(APICtx);

    return (
        <NumberInput
            label="Width"
            value={{
                get: width,
                prev: api.width.prev,
                next: api.width.next,
                set: api.width.set,
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

    const type = useContext(TypeCtx);
    const api = useContext(APICtx);

    return (
        <OptionGroup
            title="Type"
            options={[
                { label: "Adjacent", value: "adjacent" },
                { label: "Grouped", value: "grouped" },
                { label: "Scattered", value: "scattered" },
            ]}
            selected={{ get: type, set: api.type.set }}
            size="sm"
            alignment="center"
        />
    );
}

function MainCellSelector() {
    //

    const width = useContext(WidthCtx);
    const type = useContext(TypeCtx) as NbhdType;
    const mainCell = useContext(MainCellCtx);
    const api = useContext(APICtx);

    let cells = [];

    for (let i = 0; i < width; i++) {
        cells.push(<Cell onClick={() => api.mainCell.set(i)} />);
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

function HighlightCell({
    index,
    highlightedCells,
}: {
    index: number;
    highlightedCells: BoolArrHook;
}) {
    //

    const cellsNbhds = useContext(CellsNbhdsCtx) as number[][];

    const highlight = useCallback(() => {
        //

        let nArr = Array(cellsNbhds.length).fill(false);
        cellsNbhds[index].forEach((e) => (nArr[e] = true));
        highlightedCells.set(nArr);
    }, [cellsNbhds]);


    const classes = `cap-cell cap-cell-off ${
        highlightedCells.get[index] ? "cap-cell-high" : ""
    }`;

    return (
        <span
            className={classes}
            onMouseOver={highlight}
            // onMouseOut={highlight}
        />
    );
}

function NbhdsMap() {
    //

    const cellsNbhds = useContext(CellsNbhdsCtx) as number[][];

    const highlightedCells = useBoolArrState(
        boolArray(cellsNbhds.length, false)
    );

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

function Content() {
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
                    <Button
                        icon={faDiagramProject}
                        tooltipLabel="Change neighborhoods"
                    />
                </div>
            </div>

            <NbhdsMap />
        </div>
    );
}

type Neighborhood1DProps = {
    width: RangeReducerHook;
    type: StateObjHook;
    mainCell: StateObjHook;
    cellsNbhds: ArrayStateHook<number[]>;
}

export default function Neighborhood1D({
    width,
    type,
    mainCell,
    cellsNbhds,
}: Neighborhood1DProps) {
    //

    const api = {
        width: {
            next: width.next,
            prev: width.prev,
            set: width.set,
        },
        type: { set: type.set },
        mainCell: { set: mainCell.set },
        cellsNbhds: {
            set: cellsNbhds.set,
            setAt: cellsNbhds.setAt,
        },
    };

    return (
        <WidthCtx.Provider value={width.get}>
            <TypeCtx.Provider value={type.get}>
                <MainCellCtx.Provider value={mainCell.get}>
                    <CellsNbhdsCtx.Provider value={cellsNbhds.get}>
                        <APICtx.Provider value={api}>
                            <Content />
                        </APICtx.Provider>
                    </CellsNbhdsCtx.Provider>
                </MainCellCtx.Provider>
            </TypeCtx.Provider>
        </WidthCtx.Provider>
    );
}
