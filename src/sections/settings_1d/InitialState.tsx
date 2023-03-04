//

import React from "react";
import { useEffect } from "react";
import Button from "../../components/Button";
import NumberInput from "../../components/NumberInput";
import { OptionGroup } from "../../components/SectionSelector";
import {
    BoolArrHook,
    BoolState,
    useRangeReducer,
    useStateObj,
} from "../../CustomHooks";
import { buildState } from "../../ts/Utils";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import { RangeReducerHook, StateObjHook } from "src/CustomHooks";

function LiveCellsSelector({
    option,
    value,
    max,
}: {
    option: StateObjHook;
    value: RangeReducerHook;
    max: number;
}) {
    //

    return (
        <div>
            <OptionGroup
                title="Live cells"
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
                selected={option}
                size="sm"
                alignment="center"
            />

            <NumberInput
                value={value}
                min={1}
                max={option.get === "num" ? max : 100}
                size="sm"
                alignment="center"
            />
        </div>
    );
}

function GroupSize({
    minSizeVal,
    maxSizeVal,
    max,
}: {
    minSizeVal: RangeReducerHook;
    maxSizeVal: RangeReducerHook;
    max: number;
}) {
    //

    useEffect(() => {
        if (maxSizeVal.get < minSizeVal.get) {
            maxSizeVal.set(minSizeVal.get);
        }
    }, [minSizeVal.get]);

    return (
        <div>
            <div
                className="cap-container-dark-1 cap-section-selector-title mx-auto mb-1"
                style={{ fontSize: "small" }}
            >
                Group size
            </div>
            <div className="mx-auto" style={{ width: "80%" }}>
                {/*  */}

                <div className="my-2">
                    <NumberInput
                        label="Min"
                        value={minSizeVal}
                        min={1}
                        max={max}
                        size="sm"
                        alignment="center"
                    />
                </div>

                <div className="my-2">
                    <NumberInput
                        label="Max"
                        value={maxSizeVal}
                        min={minSizeVal.get}
                        max={max}
                        size="sm"
                        alignment="center"
                    />
                </div>
            </div>
        </div>
    );
}

function DistributionSelector({ option }: { option: StateObjHook }) {
    //

    return (
        <OptionGroup
            title="Distribution"
            options={[
                { label: "Random", value: "rand" },
                { label: "Even", value: "even" },
            ]}
            selected={option}
            size="sm"
            alignment="center"
        />
    );
}

function BuildStateButton({
    setState,
    liveCellsType,
    distributionType,
    numCells,
    liveCells,
    groupMinSize,
    groupMaxSize,
}: {
    setState: (arr: boolean[]) => void;
    liveCellsType: "num" | "perc";
    distributionType: "rand" | "even";
    numCells: number;
    liveCells: number;
    groupMinSize: number;
    groupMaxSize: number;
}) {
    //

    return (
        <Button
            icon={faArrowTurnDown}
            tooltipLabel="Set state"
            onClick={() => {
                setState(
                    buildState(
                        liveCellsType,
                        distributionType,
                        numCells,
                        liveCells,
                        groupMinSize,
                        groupMaxSize
                    )
                );
            }}
        />
    );
}

function Cell({ alive }: { alive: BoolState }) {
    //

    const classes = `cap-cell cap-cell-${alive.get ? "on" : "off"}`;

    return <span className={classes} onClick={alive.toggle}></span>;
}

function CellsSet({ state }: { state: BoolArrHook }) {
    //

    return (
        <div className="row mx-auto ps-2" style={{ width: "90%" }}>
            {state.get.map((e, i) => (
                <Cell
                    key={i}
                    alive={{ get: e, toggle: () => state.toggle(i) }}
                />
            ))}
        </div>
    );
}

export default function InitialState({
    numCells,
    state,
}: {
    numCells: number;
    state: BoolArrHook;
}) {
    //

    let liveCellsType = useStateObj("num");
    let distributionType = useStateObj("rand");

    let liveCells = useRangeReducer(1, numCells, 1, false);
    const groupMinSize = useRangeReducer(1, numCells, 1, false);
    const groupMaxSize = useRangeReducer(
        groupMinSize.get,
        numCells,
        groupMinSize.get,
        false
    );

    return (
        <div>
            <div className="row mb-2 mx-auto" style={{ width: "80%" }}>
                <div className="col-4">
                    <LiveCellsSelector
                        option={liveCellsType}
                        value={liveCells}
                        max={numCells}
                    />
                </div>

                <div className="col-3">
                    <GroupSize
                        minSizeVal={groupMinSize}
                        maxSizeVal={groupMaxSize}
                        max={numCells}
                    />
                </div>

                <div className="col-4">
                    <DistributionSelector option={distributionType} />
                </div>

                <div className="col-1 d-flex align-items-center">
                    <BuildStateButton
                        setState={state.set}
                        liveCellsType={liveCellsType.get}
                        distributionType={distributionType.get}
                        numCells={numCells}
                        liveCells={liveCells.get}
                        groupMinSize={groupMinSize.get}
                        groupMaxSize={groupMaxSize.get}
                    />
                </div>
            </div>

            <CellsSet state={state} />
        </div>
    );
}
