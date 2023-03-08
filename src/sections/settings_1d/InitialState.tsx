//

import React, { createContext, useContext, useEffect } from "react";

import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import NumberInput from "../../components/NumberInput";
import { OptionGroup } from "../../components/SectionSelector";
import { useRangeReducer, useStateObj } from "src/CustomHooks";
import { APICtx, InitStateCtx, NumCellsCtx } from "src/App";
import { DistributionType } from "src/ts/CellularAutomaton";

type LiveCellsType = "num" | "perc";

const LiveCellsTypeCtx = createContext("num");
const DistTypeCtx = createContext("rand");
const LiveCellsCtx = createContext(1);
const GroupMinSizeCtx = createContext(1);
const GroupMaxSizeCtx = createContext(1);
const ISAPICtx = createContext({
    liveCellsType: (val: LiveCellsType) => {},
    distType: (val: DistributionType) => {},
    liveCells: { set: (val: number) => {}, next: () => {}, prev: () => {} },
    groupMinSize: { set: (val: number) => {}, next: () => {}, prev: () => {} },
    groupMaxSize: { set: (val: number) => {}, next: () => {}, prev: () => {} },
});

function LiveCellsSelector() {
    //

    const numCells = useContext(NumCellsCtx);
    const type = useContext(LiveCellsTypeCtx);
    const liveCells = useContext(LiveCellsCtx);
    const api = useContext(ISAPICtx);

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
                selected={{ get: type, set: api.liveCellsType }}
                size="sm"
                alignment="center"
            />

            <NumberInput
                value={{
                    get: liveCells,
                    set: api.liveCells.set,
                    next: api.liveCells.next,
                    prev: api.liveCells.prev,
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

    const numCells = useContext(NumCellsCtx);
    const minSize = useContext(GroupMinSizeCtx);
    const maxSize = useContext(GroupMaxSizeCtx);
    const api = useContext(ISAPICtx);

    useEffect(() => {
        if (maxSize < minSize) {
            api.groupMaxSize.set(minSize);    
        }
    }, [minSize]);

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
                        value={{
                            get: minSize,
                            set: api.groupMinSize.set,
                            next: api.groupMinSize.next,
                            prev: api.groupMinSize.prev,
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
                            set: api.groupMaxSize.set,
                            next: api.groupMaxSize.next,
                            prev: api.groupMaxSize.prev,
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

    const distr = useContext(DistTypeCtx);
    const api = useContext(ISAPICtx);

    return (
        <OptionGroup
            title="Distribution"
            options={[
                { label: "Random", value: "rand" },
                { label: "Even", value: "even" },
            ]}
            selected={{ get: distr, set: api.distType }}
            size="sm"
            alignment="center"
        />
    );
}

function BuildStateButton() {
    //

    const liveCellsType = useContext(LiveCellsTypeCtx) as LiveCellsType;
    const distr = useContext(DistTypeCtx) as DistributionType;
    const liveCells = useContext(LiveCellsCtx);
    const groupMinSize = useContext(GroupMinSizeCtx);
    const groupMaxSize = useContext(GroupMaxSizeCtx);

    const api = useContext(APICtx);

    return (
        <Button
            icon={faArrowTurnDown}
            tooltipLabel="Set state"
            onClick={() => {
                api.initState.set(
                    liveCellsType === "perc"
                        ? (liveCells / 100)
                        : liveCells,
                    groupMinSize,
                    groupMaxSize,
                    distr
                );
            }}
        />
    );
}

function Cell({ alive, toggle }: { alive: boolean; toggle: () => void }) {
    //

    const classes = `cap-cell cap-cell-${alive ? "on" : "off"}`;

    return <span className={classes} onClick={toggle} />;
}

function CellsSet() {
    //

    const initState = useContext(InitStateCtx);
    const api = useContext(APICtx);

    return (
        <div className="row mx-auto ps-2" style={{ width: "90%" }}>
            {initState.arr.map((e, i) => (
                <Cell
                    key={i}
                    alive={e}
                    toggle={() => api.initState.toggleCell(i)}
                />
            ))}
        </div>
    );
}

export default function InitialState() {
    //

    const numCells = useContext(NumCellsCtx);

    const liveCellsType = useStateObj("num");
    const distributionType = useStateObj("rand");

    const liveCells = useRangeReducer(1, numCells, 1, false);
    const groupMinSize = useRangeReducer(1, numCells, 1, false);
    const groupMaxSize = useRangeReducer(
        groupMinSize.get,
        numCells,
        groupMinSize.get,
        false
    );

    const api = {
        liveCellsType: liveCellsType.set,
        distType: distributionType.set,
        liveCells: {
            set: liveCells.set,
            next: liveCells.next,
            prev: liveCells.prev,
        },
        groupMinSize: {
            set: groupMinSize.set,
            next: groupMinSize.next,
            prev: groupMinSize.prev,
        },
        groupMaxSize: {
            set: groupMaxSize.set,
            next: groupMaxSize.next,
            prev: groupMaxSize.prev,
        },
    };

    return (
        <LiveCellsTypeCtx.Provider value={liveCellsType.get}>
            <DistTypeCtx.Provider value={distributionType.get}>
                <LiveCellsCtx.Provider value={liveCells.get}>
                    <GroupMinSizeCtx.Provider value={groupMinSize.get}>
                        <GroupMaxSizeCtx.Provider value={groupMaxSize.get}>
                            <ISAPICtx.Provider value={api}>
                                <div
                                    className="row mb-2 mx-auto"
                                    style={{ width: "80%" }}
                                >
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
                                        <BuildStateButton />
                                    </div>
                                </div>

                                <CellsSet />
                            </ISAPICtx.Provider>
                        </GroupMaxSizeCtx.Provider>
                    </GroupMinSizeCtx.Provider>
                </LiveCellsCtx.Provider>
            </DistTypeCtx.Provider>
        </LiveCellsTypeCtx.Provider>
    );
}