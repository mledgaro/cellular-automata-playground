//

import { useEffect } from "react";
import Button from "../../components/Button";
import NumberInput from "../../components/NumberInput";
import SectionSelector from "../../components/SectionSelector";
import { useRangeReducer, useStateObj } from "../../components/CustomHooks";
import { buildState } from "../../js/Utils";

function ISNumberInput({ title, value, min, max }) {
    //

    return (
        <NumberInput
            label={title}
            value={value}
            min={min}
            max={max}
            size="sm"
            alignment="center"
        />
    );
}

function LiveCellsSelector({ selection, value, max }) {
    //

    return (
        <div>
            <SectionSelector
                title="Live cells"
                sections={[
                    {
                        label: "Number",
                        value: "num",
                    },
                    {
                        label: "Percentage",
                        value: "perc",
                    },
                ]}
                selected={selection}
                size="sm"
                alignment="center"
            />
            <ISNumberInput
                value={value}
                min={1}
                max={selection.get === "num" ? max : 100}
            />
        </div>
    );
}

function GroupSize({ minSizeVal, maxSizeVal, max }) {
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
                <div className="my-2">
                    <ISNumberInput
                        title={"Min"}
                        value={minSizeVal}
                        min={1}
                        max={max}
                    />
                </div>
                <div className="my-2">
                    <ISNumberInput
                        title={"Max"}
                        value={maxSizeVal}
                        min={minSizeVal.get}
                        max={max}
                    />
                </div>
            </div>
        </div>
    );
}

function DistributionSelector({ selection }) {
    //

    return (
        <SectionSelector
            title="Distribution"
            sections={[
                { label: "Random", value: "rand" },
                { label: "Even", value: "even" },
            ]}
            selected={selection}
            size="sm"
            alignment="center"
        />
    );
}

function BuildStateButton({
    cellsState,
    liveCellsType,
    distributionType,
    numCells,
    liveCells,
    groupMinSize,
    groupMaxSize,
}) {
    return (
        <Button
            icon={{ id: "arrow-turn-down", size: "2xl" }}
            tooltipLabel="Set state"
            onClick={() => {
                cellsState.set(
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

function Cell({ alive }) {
    //

    const classes = `cap-cell cap-cell-${alive.get ? "on" : "off"}`;

    return <span className={classes} onClick={alive.toggle}></span>;
}

function CellsSet({ cellsState }) {
    //

    return (
        <div className="row mx-auto ps-2" style={{ width: "90%" }}>
            {cellsState.get.map((e, i) => (
                <Cell key={i} alive={{get: e, toggle: () => cellsState.toggle(i)}} />
            ))}
        </div>
    );
}

export default function InitialState({ numCells, cellsState }) {
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
                        selection={liveCellsType}
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
                    <DistributionSelector selection={distributionType} />
                </div>

                <div className="col-1 d-flex align-items-center">
                    <BuildStateButton
                        cellsState={cellsState}
                        liveCellsType={liveCellsType.get}
                        distributionType={distributionType.get}
                        numCells={numCells}
                        liveCells={liveCells.get}
                        groupMinSize={groupMinSize.get}
                        groupMaxSize={groupMaxSize.get}
                    />
                </div>
            </div>

            <CellsSet cellsState={cellsState} />
        </div>
    );
}
