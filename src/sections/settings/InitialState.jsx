//

import { useEffect, useState } from "react";
import Button from "../../components/Button";
import CellsSet from "../../components/CellsState";
import NumberInput from "../../components/NumberInput";
import SectionSelector from "../../components/SectionSelector";
import {
    initState,
    randBoolArrPercent,
} from "../../js/Utils";

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

function LiveCellsSelector({ selected, value, numCells }) {
    //

    return (
        <SectionSelector
            title="Live cells"
            sections={[
                {
                    label: "Number",
                    component: (
                        <ISNumberInput value={value} min={0} max={numCells} />
                    ),
                },
                {
                    label: "Percentage",
                    component: (
                        <ISNumberInput value={value} min={0} max={100} />
                    ),
                },
            ]}
            selected={selected}
            size="sm"
            alignment="center"
        />
    );
}

function GroupSizeSelector({
    selected,
    groupSize,
    groupMinSize,
    groupMaxSize,
    numCells,
}) {
    useEffect(() => {
        if (groupMaxSize.get <= groupMinSize.get) {
            groupMaxSize.set(groupMinSize.get + 1);
        }
    }, [groupMinSize.get]);

    return (
        <SectionSelector
            title="Group size"
            sections={[
                {
                    label: "Fixed",
                    component: (
                        <ISNumberInput value={groupSize} min={1} max={256} />
                    ),
                },
                {
                    label: "Random",
                    component: (
                        <div className="row mx-auto" style={{ width: "80%" }}>
                            <div className="col">
                                <ISNumberInput
                                    title={"Min"}
                                    value={groupMinSize}
                                    min={1}
                                    max={numCells}
                                />
                            </div>
                            <div className="col">
                                <ISNumberInput
                                    title={"Max"}
                                    value={groupMaxSize}
                                    min={groupMinSize.get + 1}
                                    max={numCells}
                                />
                            </div>
                        </div>
                    ),
                },
            ]}
            selected={selected}
            size="sm"
            alignment="center"
        />
    );
}

function DistributionSelector({
    selected,
    groupSizeType,
    groupSize,
    groupMinSize,
    groupMaxSize,
    numCells,
}) {
    //

    return (
        <SectionSelector
            title="Distribution"
            sections={[
                { label: "Random", component: <div /> },
                {
                    label: "Even",
                    component: (
                        <GroupSizeSelector
                            groupSize={groupSize}
                            groupMinSize={groupMinSize}
                            groupMaxSize={groupMaxSize}
                            selected={groupSizeType}
                            numCells={numCells}
                        />
                    ),
                },
            ]}
            selected={selected}
            size="sm"
            alignment="center"
        />
    );
}



export default function InitialState({ numCells }) {
    //

    let [liveCellsType, setLiveCellsType] = useState(0);
    let [distribution, setDistribution] = useState(0);
    let [groupSizeType, setGroupSizeType] = useState(0);

    let [liveCells, setLiveCells] = useState(0);
    let [groupSize, setGroupSize] = useState(0);
    let [groupMinSize, setGroupMinSize] = useState(0);
    let [groupMaxSize, setGroupMaxSize] = useState(0);

    let [cellsState, setCellsState] = useState(
        randBoolArrPercent(numCells, 10)
    );

    return (
        <div>
            <div className="row mb-2 mx-auto" style={{width: "80%"}}>
                <div className="col-5">
                    <LiveCellsSelector
                        selected={{ get: liveCellsType, set: setLiveCellsType }}
                        value={{ get: liveCells, set: setLiveCells }}
                        numCells={numCells}
                    />
                </div>

                <div className="col-6">
                    <DistributionSelector
                        groupSize={{
                            get: groupSize,
                            set: setGroupSize,
                        }}
                        groupMinSize={{
                            get: groupMinSize,
                            set: setGroupMinSize,
                        }}
                        groupMaxSize={{
                            get: groupMaxSize,
                            set: setGroupMaxSize,
                        }}
                        groupSizeType={{
                            get: groupSizeType,
                            set: setGroupSizeType,
                        }}
                        selected={{ get: distribution, set: setDistribution }}
                        numCells={numCells}
                    />
                </div>

                <div className="col-1 d-flex align-items-center">
                    <Button
                        icon={{ id: "arrow-turn-down", size: "2xl" }}
                        tooltipLabel="Set state"
                        onClick={() => {
                            setCellsState(
                                initState(
                                    liveCellsType,
                                    distribution,
                                    groupSizeType,
                                    numCells,
                                    liveCells,
                                    groupSize,
                                    groupMinSize,
                                    groupMaxSize
                                )
                            );
                        }}
                    />
                </div>
            </div>

            <CellsSet cellsState={{ get: cellsState, set: setCellsState }} />
        </div>
    );
}
