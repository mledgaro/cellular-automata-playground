//

import React, { useEffect } from "react";

import { faRotate } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/deprecated/Button";
import NumberInput from "../../components/deprecated/NumberInput";
import { OptionGroup } from "../../components/deprecated/SectionSelector";
import { DistributionType } from "src/app/slices/distributionType";
import { SpanCell } from "src/features/Cells";
import Title from "src/components/deprecated/Title";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { LiveCellsType, setLiveCellsType } from "src/app/slices/liveCellsType";
import {
    decrementLiveCells,
    incrementLiveCells,
} from "src/app/slices/liveCells";
import {
    decrementGroupMaxSize,
    incrementGroupMaxSize,
    setGroupMaxSize,
} from "src/app/slices/groupMaxSize";
import {
    decrementGroupMinSize,
    incrementGroupMinSize,
} from "src/app/slices/groupMinSize";
import { setDistributionType } from "src/app/slices/distributionType";
import { setInitState, toggleInitStateCell } from "src/app/slices/initState";

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

    const numCells = useAppSelector((state) => state.numCells.value);
    const type = useAppSelector((state) => state.liveCellsType.value);
    const liveCells = useAppSelector((state) => state.liveCells.value);

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
                value={liveCells}
                increment={() => dispatch(incrementLiveCells())}
                decrement={() => dispatch(decrementLiveCells())}
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

    const numCells = useAppSelector((state) => state.numCells.value);
    const minSize = useAppSelector((state) => state.groupMinSize.value);
    const maxSize = useAppSelector((state) => state.groupMaxSize.value);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (maxSize < minSize) {
            dispatch(setGroupMaxSize(minSize));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxSize, minSize]);

    return (
        <div>
            <Title text="Group size" size="small" />

            <div className="mx-auto" style={{ width: "80%" }}>
                {/*  */}

                <div className="my-2">
                    <NumberInput
                        label="Min"
                        value={minSize}
                        increment={() => dispatch(incrementGroupMinSize())}
                        decrement={() => dispatch(decrementGroupMinSize())}
                        min={1}
                        max={numCells}
                        size="sm"
                        alignment="center"
                    />
                </div>

                <div className="my-2">
                    <NumberInput
                        label="Max"
                        value={maxSize}
                        increment={() => dispatch(incrementGroupMaxSize())}
                        decrement={() => dispatch(decrementGroupMaxSize())}
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

    const distr = useAppSelector((state) => state.distributionType.value);

    const dispatch = useAppDispatch();

    return (
        <div>
            <Title text="Distribution" size="small" />
            <OptionGroup
                options={[
                    { label: "Even", value: "even" },
                    { label: "Random", value: "rand" },
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

    const liveCells = useAppSelector((state) => state.liveCells.value);
    const liveCellsType = useAppSelector((state) => state.liveCellsType.value);

    const params = {
        numCells: useAppSelector((state) => state.numCells.value),
        liveCells: liveCellsType === "perc" ? liveCells / 100 : liveCells,
        groupMinSize: useAppSelector((state) => state.groupMinSize.value),
        groupMaxSize: useAppSelector((state) => state.groupMaxSize.value),
        distribution: useAppSelector((state) => state.distributionType.value),
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        //
        dispatch(setInitState(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <Button
            icon={faRotate}
            tooltipLabel="Reload init state"
            onClick={() => dispatch(setInitState(params))}
        />
    );
}

function CellsSet() {
    //

    const initState = useAppSelector((state) => state.initState.value);

    const dispatch = useAppDispatch();

    return (
        <div className="row mx-auto ps-2" style={{ width: "90%" }}>
            {initState.map((e, i) => (
                <SpanCell
                    key={i}
                    alive={e}
                    toggle={() => dispatch(toggleInitStateCell(i))}
                />
            ))}
        </div>
    );
}
