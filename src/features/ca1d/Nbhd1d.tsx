//
import React from "react";

import { Grid } from "@mui/material";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import Button from "src/components/Button";
import CustomSlider from "src/components/Slider";
import CustomRadioGroup from "src/components/RadioGroup";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
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
import { setCellsNbhds } from "src/app/slices/cellsNbhds";

import NbhdsMap from "src/features/ca1d/NbhdsMap";
import { selectNumCells } from "src/app/slices/numCells";
import { MainCellSelector } from "./CellsGroups";

export default function Nbhd1d() {
    //
    return (
        <Grid container rowSpacing={2}>
            {/* Row 1 */}
            <Grid
                container
                item
                alignItems="center"
                columnSpacing={2}
                justifyContent="space-evenly"
            >
                {/* Width */}
                <Grid item md={3}>
                    <Width />
                </Grid>
                {/* Type */}
                <Grid item md="auto">
                    <Type />
                </Grid>
                {/* Main cell selector */}
                <Grid item md="auto" className="">
                    <MainCellSelector />
                </Grid>
            </Grid>
            {/* Row 2 */}
            <Grid container item alignItems="center">
                {/* Neighborhoods map */}
                <Grid item xs={11}>
                    <NbhdsMap />
                </Grid>
                {/* Reload button */}
                <Grid item xs={1} className="flex justify-center">
                    <Reload />
                </Grid>
            </Grid>
        </Grid>
    );
}

function Width() {
    //
    const width = useAppSelector(selectNbhdWidth);

    const dispatch = useAppDispatch();

    return (
        <CustomSlider
            label="Width"
            minVal={nbhdWidthMin}
            maxVal={nbhdWidthMax}
            defaultVal={nbhdWidthDefault}
            value={width}
            marks={true}
            onChange={(val: number) => dispatch(setNbhdWidth(val))}
        />
    );
}

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
            size="2xl"
            tooltipLabel="Reload neighborhoods"
            onClick={() => dispatch(setCellsNbhds(params))}
        />
    );
}
