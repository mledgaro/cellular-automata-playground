//

import React, { useContext, useEffect } from "react";

import { faRotate } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import NumberInput from "../../components/NumberInput";
import { OptionGroup } from "../../components/SectionSelector";
import { APICtx, InitStateCtx } from "src/App";
import { DistributionType } from "src/ts/CellularAutomaton";
import { SpanCell } from "src/components/Cells";
import Title from "src/components/Title";
import { dataStore } from "src/app/store";
import { useAppDispatch } from "src/app/hooks";
import { LiveCellsType, setLiveCellsType } from "src/features/liveCellsType";
import {
    decrementLiveCells,
    incrementLiveCells,
    setLiveCells,
} from "src/features/liveCells";
import {
    decrementGroupMaxSize,
    incrementGroupMaxSize,
    setGroupMaxSize,
} from "src/features/groupMaxSize";
import {
    decrementGroupMinSize,
    incrementGroupMinSize,
    setGroupMinSize,
} from "src/features/groupMinSize";
import { setDistributionType } from "src/features/distributionType";

export default function InitialState() {
    //

    return (
        <div>
            <div className="row mb-2 mx-auto" style={{ width: "80%" }}>
                {/*  */}

                <div className="col-4">
                    <LiveCellsSelector />
                </div>

                <div className="col-3">
                    <GroupSize />
                </div>

                <div className="col-4">
                    <DistributionSelector />
                </div>

                <div className="col-1 d-flex align-items-center">
                    <ReloadBtn />
                </div>
            </div>

            <CellsSet />
        </div>
    );
}

function LiveCellsSelector() {
    //

    const numCells = dataStore.numCells();
    const type = dataStore.liveCellsType();
    const liveCells = dataStore.liveCells();
    const dispatch = useAppDispatch();

    return (
        <div>
            <Title text="Live cells" size="small" />
            <OptionGroup
                options={[
                    {
                        label: "Number",
                        value: "num",
                    },
                    {
                        label: "Percentage",
                        value: "perc",
                    },
                ]}
                selected={{
                    get: type,
                    set: (value: LiveCellsType) =>
                        dispatch(setLiveCellsType(value)),
                }}
                size="sm"
                alignment="center"
            />

            <NumberInput
                value={{
                    get: liveCells,
                    set: (val: number) => dispatch(setLiveCells(val)),
                    next: () => dispatch(incrementLiveCells()),
                    prev: () => dispatch(decrementLiveCells()),
                }}
                min={1}
                max={type === "num" ? numCells : 100}
                size="sm"
                alignment="center"
            />
        </div>
    );
}

function GroupSize() {
    //

    const numCells = dataStore.numCells();
    const minSize = dataStore.groupMinSize();
    const maxSize = dataStore.groupMaxSize();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (maxSize < minSize) {
            dispatch(setGroupMaxSize(minSize));
        }
    }, [maxSize, minSize]);

    return (
        <div>
            <Title text="Group size" size="small" />

            <div className="mx-auto" style={{ width: "80%" }}>
                {/*  */}

                <div className="my-2">
                    <NumberInput
                        label="Min"
                        value={{
                            get: minSize,
                            set: (val: number) =>
                                dispatch(setGroupMinSize(val)),
                            next: () => dispatch(incrementGroupMinSize()),
                            prev: () => dispatch(decrementGroupMinSize()),
                        }}
                        min={1}
                        max={numCells}
                        size="sm"
                        alignment="center"
                    />
                </div>

                <div className="my-2">
                    <NumberInput
                        label="Max"
                        value={{
                            get: maxSize,
                            set: (val: number) =>
                                dispatch(setGroupMaxSize(val)),
                            next: () => dispatch(incrementGroupMaxSize()),
                            prev: () => dispatch(decrementGroupMaxSize()),
                        }}
                        min={minSize}
                        max={numCells}
                        size="sm"
                        alignment="center"
                    />
                </div>
            </div>
        </div>
    );
}

function DistributionSelector() {
    //

    const distr = dataStore.distributionType();
    const dispatch = useAppDispatch();

    return (
        <div>
            <Title text="Distribution" size="small" />
            <OptionGroup
                options={[
                    { label: "Random", value: "rand" },
                    { label: "Even", value: "even" },
                ]}
                selected={{
                    get: distr,
                    set: (val: DistributionType) =>
                        dispatch(setDistributionType(val)),
                }}
                size="sm"
                alignment="center"
            />
        </div>
    );
}

function ReloadBtn() {
    //

    const liveCellsType = dataStore.liveCellsType();
    const distr = dataStore.distributionType();
    const liveCells = dataStore.liveCells();
    const groupMinSize = dataStore.groupMinSize();
    const groupMaxSize = dataStore.groupMaxSize();

    const api = useContext(APICtx)!;

    return (
        <Button
            icon={faRotate}
            tooltipLabel="Reload init state"
            onClick={() => {
                api.automaton.state.set(
                    liveCellsType === "perc" ? liveCells / 100 : liveCells,
                    groupMinSize,
                    groupMaxSize,
                    distr
                );
            }}
        />
    );
}

function CellsSet() {
    //

    const initState = useContext(InitStateCtx)!;
    const api = useContext(APICtx)!;

    return (
        <div className="row mx-auto ps-2" style={{ width: "90%" }}>
            {initState.arr.map((e, i) => (
                <SpanCell
                    key={i}
                    alive={e}
                    toggle={() => api.automaton.state.toggleCell(i)}
                />
            ))}
        </div>
    );
}
