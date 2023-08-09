//

import React, { useCallback, useEffect } from "react";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import { OptionGroup } from "../../components/SectionSelector";
import NumberInput from "../../components/NumberInput";
import Button from "../../components/Button";
import { IconCell, SelectedCell, Ellipses } from "../../components/Cells";
import { NbhdType } from "src/app/slices/nbhdType";
import { boolArray } from "src/ts/Utils";
import Title from "src/components/Title";
import {
    BoolArrHook,
    useAppDispatch,
    useAppSelector,
    useBoolArrState,
} from "src/app/hooks";
import {
    decrementNbhdWidth,
    incrementNbhdWidth,
    setNbhdWidth,
} from "src/app/slices/nbhdWidth";
import { setNbhdType } from "src/app/slices/nbhdType";
import { setMainCell } from "src/app/slices/mainCell";

import { setCellsNbhds } from "src/app/slices/cellsNbhds";
import { Box } from "@mui/material";
import CustomSlider from "src/components/Slider";

export default function Neighborhood1D() {
    //

    // return (
    //     <div>
    //         <div className="row mx-auto" style={{ width: "85%" }}>
    //             {/* */}

    //             <div className="col-3 d-flex align-items-center">
    //                 <Width />
    //             </div>

    //             <div className="col-4">
    //                 <Type />
    //             </div>

    //             <div className="col-4 d-flex align-items-center">
    //                 <MainCellSelector />
    //             </div>

    //             <div className="col-1 d-flex align-items-center">
    //                 <UpdateNbhds />
    //             </div>
    //         </div>

    //         <NbhdsMap />
    //     </div>
    // );

    return (
        <Box>
            <Width />
            <Type />
            <MainCellSelector />
            <UpdateNbhds />
            <NbhdsMap />
        </Box>
    );
}

function Width() {
    //

    const width = useAppSelector((state) => state.nbhdWidth.value);

    const dispatch = useAppDispatch();

    // return (
    //     <NumberInput
    //         size="sm"
    //         label="Width"
    //         value={width}
    //         increment={() => dispatch(incrementNbhdWidth())}
    //         decrement={() => dispatch(decrementNbhdWidth())}
    //         min={2}
    //         max={8}
    //     />
    // );

    return (
        <CustomSlider
            label="Width"
            minVal={2}
            maxVal={8}
            defaultVal={3}
            step={1}
            value={width}
            onChange={(val: number) => dispatch(setNbhdWidth(val))}
        />
    );
}

function Type() {
    //

    const type = useAppSelector((state) => state.nbhdType.value);

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

    const width = useAppSelector((state) => state.nbhdWidth.value);
    const type = useAppSelector((state) => state.nbhdType.value);
    const mainCell = useAppSelector((state) => state.mainCell.value);

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

    const width = useAppSelector((state) => state.nbhdWidth.value);
    const type = useAppSelector((state) => state.nbhdType.value);
    const mainCell = useAppSelector((state) => state.mainCell.value);

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
        numCells: useAppSelector((state) => state.numCells.value),
        width: useAppSelector((state) => state.nbhdWidth.value),
        type: useAppSelector((state) => state.nbhdType.value),
        mainCell: useAppSelector((state) => state.mainCell.value),
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

    const numCells = useAppSelector((state) => state.numCells.value);
    const cellsNbhds = useAppSelector((state) => state.cellsNbhds.value);

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

    const numCells = useAppSelector((state) => state.numCells.value);

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
