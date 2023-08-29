//
import React, { useCallback } from "react";

import { Box, Grid } from "@mui/material";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import Button from "src/components/Button";
import CustomSlider from "src/components/Slider";
import CustomRadioGroup from "src/components/RadioGroup";

import { useAppDispatch, useAppSelector, useBoolArr } from "src/app/hooks";
import {
    minVal as nbhdWidthMin,
    maxVal as nbhdWidthMax,
    defaultVal as nbhdWidthDefault,
    selectNbhdWidth,
    setNbhdWidth,
} from "src/app/slices/nbhdWidth";
import {
    NbhdType,
    defaultVal as nbhdTypeDefault,
    selectNbhdType,
    setNbhdType,
} from "src/app/slices/nbhdType";
import { selectMainCell } from "src/app/slices/mainCell";
import { selectCellsNbhds, setCellsNbhds } from "src/app/slices/cellsNbhds";

import { selectNumCells } from "src/app/slices/numCells";
import { Nbhd1dEditor } from "./CellsGroups";
import { boolArray } from "src/ts/Utils";

export default function Nbhd1d() {
    //
    return (
        <Grid container rowSpacing={2}>
            {/* Row 1 */}
            <Grid
                container
                item
                alignItems="center"
                justifyContent="space-evenly"
            >
                {/* Width */}
                {/* <Grid item md={2}>
                    <Width />
                </Grid> */}
                {/* Type */}
                <Grid item md="auto">
                    <Type />
                </Grid>
                {/* Main cell selector */}
                <Grid item md="auto">
                    <Nbhd1dEditor />
                </Grid>

                <Grid item md="auto" className="flex justify-center">
                    <Reload />
                </Grid>
            </Grid>
            {/* Row 2 */}
            {/* <Grid container item alignItems="center"> */}
            {/* Neighborhoods map */}
            <Grid item xs={12}>
                <NbhdsMap />
            </Grid>
            {/* Reload button */}
            {/* <Grid item xs={1} className="flex justify-center">
                    <Reload />
                </Grid> */}
            {/* </Grid> */}
        </Grid>
    );
}

// function Width() {
//     //
//     const width = useAppSelector(selectNbhdWidth);
//     const dispatch = useAppDispatch();
//     return (
//         <CustomSlider
//             label="Width"
//             minVal={nbhdWidthMin}
//             maxVal={nbhdWidthMax}
//             defaultVal={nbhdWidthDefault}
//             value={width}
//             marks={true}
//             onChange={(val: number) => dispatch(setNbhdWidth(val))}
//         />
//     );
// }

function Type() {
    //
    const type = useAppSelector(selectNbhdType);
    const dispatch = useAppDispatch();
    return (
        <CustomRadioGroup
            label="Type"
            options={[
                { label: "Adjacent", value: "adjacent" },
                { label: "Grouped", value: "grouped" },
                { label: "Scattered", value: "scattered" },
            ]}
            defaultVal={nbhdTypeDefault}
            value={type}
            onChange={(val: string) => dispatch(setNbhdType(val as NbhdType))}
        />
    );
}

function NbhdsMap() {
    //
    const numCells = useAppSelector(selectNumCells);
    const cellsNbhds = useAppSelector(selectCellsNbhds);

    const cells = useBoolArr(boolArray(numCells, false));

    const highlight = useCallback(
        (idx: number) => {
            //
            let highCells = Array(numCells).fill(false);
            cellsNbhds[idx].forEach(
                (neighboor) => (highCells[neighboor] = true)
            );
            cells.set(highCells);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cellsNbhds]
    );

    return (
        <Box className="cap-component-container cells-container">
            {cells.get.map((e, i) => (
                <Box
                    key={i}
                    className={`cap-cell ${e ? "on" : "off"}`}
                    onMouseOver={() => highlight(i)}
                />
            ))}
        </Box>
    );
}

function Reload() {
    //
    const params = {
        numCells: useAppSelector(selectNumCells),
        width: useAppSelector(selectNbhdWidth),
        type: useAppSelector(selectNbhdType),
        mainCell: useAppSelector(selectMainCell),
    };

    const dispatch = useAppDispatch();

    return (
        <Button
            icon={faRotate}
            size="3x"
            tooltipLabel="Reload neighborhoods"
            onClick={() => dispatch(setCellsNbhds(params))}
        />
    );
}
