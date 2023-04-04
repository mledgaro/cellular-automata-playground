//

import React, { useCallback, useEffect } from "react";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import { OptionGroup } from "../../components/SectionSelector";
import NumberInput from "../../components/NumberInput";
import Button from "../../components/Button";
import { IconCell, SelectedCell, Ellipses } from "../../components/Cells";
import { BoolArrHook, useBoolArrState } from "../../ts/CustomHooks";
import { NbhdType } from "src/features/nbhdType";
import { boolArray } from "src/ts/Utils";
import Title from "src/components/Title";
import { useAppDispatch } from "src/app/hooks";
import { decrementNbhdWidth, incrementNbhdWidth } from "src/features/nbhdWidth";
import { setNbhdType } from "src/features/nbhdType";
import { setMainCell } from "src/features/mainCell";
import { dataStore } from "src/app/store";
import { setCellsNbhds } from "src/features/cellsNbhds";

export default function Neighborhood1D() {
    //

    return (
        <div>
            <div className="row mx-auto" style={{ width: "85%" }}>
                {/* */}

                {/* <div className="col-2 d-flex align-items-center">
                    <Width />
                </div> */}

                <div className="col-3">
                    <Type />
                </div>

                <div className="col-4 border">
                    <Nbhd />
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

function Width() {
    //

    const width = dataStore.nbhdWidth;

    const dispatch = useAppDispatch();

    return (
        <NumberInput
            label="Width"
            value={width}
            increment={() => dispatch(incrementNbhdWidth())}
            decrement={() => dispatch(decrementNbhdWidth())}
            min={2}
            max={8}
        />
    );
}

function Type() {
    //

    const type = dataStore.nbhdType;

    const dispatch = useAppDispatch();

    const set = (val: NbhdType) => dispatch(setNbhdType(val));

    return (
        <div>
            <Title text="Type" size="small" />
            <OptionGroup
                options={[
                    { label: "Adjacent", value: "adjacent" },
                    { label: "Grouped", value: "grouped" },
                    { label: "Scattered", value: "scattered" },
                ]}
                selected={{
                    get: type,
                    set: set,
                }}
                size="sm"
                alignment="center"
            />
        </div>
    );
}

function MainCellSelector() {
    //

    const width = dataStore.nbhdWidth;
    const type = dataStore.nbhdType;
    const mainCell = dataStore.mainCell;

    const dispatch = useAppDispatch();

    const set = (val: number) => dispatch(setMainCell(val));

    let cells = [];

    for (let i = 0; i < width; i++) {
        cells.push(<IconCell onClick={() => set(i)} size="lg" />);
    }

    if (mainCell !== -1) {
        cells.splice(mainCell, 1, <SelectedCell onClick={() => set(-1)} />);
    }

    useEffect(() => {
        //
        if (mainCell === width) {
            dispatch(setMainCell(mainCell - 1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "max-content" }}
        >
            <Ellipses cells={cells} mainCell={mainCell} nbhdType={type} />
        </div>
    );
}

function Nbhd() {
    //

    const width = dataStore.nbhdWidth;
    const type = dataStore.nbhdType;
    const mainCell = dataStore.mainCell;

    const dispatch = useAppDispatch();

    const set = (val: number) => dispatch(setMainCell(val));

    let cells = [];

    for (let i = 0; i < width; i++) {
        cells.push(<IconCell onClick={() => set(i)} size="lg" />);
    }

    if (mainCell !== -1) {
        cells.splice(mainCell, 1, <SelectedCell onClick={() => set(-1)} />);
    }

    useEffect(() => {
        //
        if (mainCell === width) {
            dispatch(setMainCell(mainCell - 1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    return (
        <div className="row border" style={{}}>
            <div
                className="d-flex align-items-center border"
                style={{ width: "fit-content" }}
            >
                <NumberInput
                    size="sm"
                    value={width}
                    increment={() => dispatch(incrementNbhdWidth())}
                    decrement={() => dispatch(decrementNbhdWidth())}
                    min={2}
                    max={8}
                />
            </div>
            <div
                className="cap-container-dark-1 border"
                style={{ padding: "8px", width: "max-content" }}
            >
                <Ellipses cells={cells} mainCell={mainCell} nbhdType={type} />
            </div>
        </div>
    );
}

function UpdateNbhds() {
    //

    const params = {
        numCells: dataStore.numCells,
        width: dataStore.nbhdWidth,
        type: dataStore.nbhdType,
        mainCell: dataStore.mainCell,
    };
    const dispatch = useAppDispatch();

    useEffect(() => {
        //
        dispatch(setCellsNbhds(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <Button
            icon={faRotate}
            tooltipLabel="Reload neighborhoods"
            onClick={() => dispatch(setCellsNbhds(params))}
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

    const numCells = dataStore.numCells;
    const cellsNbhds = dataStore.cellsNbhds.arr;

    const highlight = useCallback(() => {
        //
        let nArr = Array(numCells).fill(false);
        cellsNbhds[index].forEach((e) => (nArr[e] = true));
        highlightedCells.set(nArr);
    }, [cellsNbhds, highlightedCells, index, numCells]);

    const classes = `cap-cell cap-cell-off ${
        highlightedCells.get[index] ? "cap-cell-high" : ""
    }`;

    return <span className={classes} onMouseOver={highlight} />;
}

function NbhdsMap() {
    //

    const numCells = dataStore.numCells;

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
