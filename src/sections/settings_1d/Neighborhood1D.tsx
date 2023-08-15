//

import React, { useEffect } from "react";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import Button from "src/components/Button";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setNbhdWidth } from "src/app/slices/nbhdWidth";
import { NbhdType, setNbhdType } from "src/app/slices/nbhdType";
import { setCellsNbhds } from "src/app/slices/cellsNbhds";
import { Box, Grid } from "@mui/material";
import CustomSlider from "src/components/Slider";
import CustomRadioGroup from "src/components/RadioGroup";
import { MainCellSelector1D } from "src/features/MainCellSelector";
import NbhdsMap from "src/features/NbhdsMap";

export default function Neighborhood1D() {
    return (
        <Grid container className="section-container">
            <Grid container item>
                <Grid item md={3}>
                    <Width />
                </Grid>
                <Grid item md={5}>
                    <Type />
                </Grid>
                <Grid item md={4}>
                    <Box className="flex justify-center">
                        <MainCellSelector1D />
                    </Box>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={11}>
                    <NbhdsMap />
                </Grid>
                <Grid item xs={1}>
                    <UpdateNbhds />
                </Grid>
            </Grid>
        </Grid>
    );
}

function Width() {
    //
    const width = useAppSelector((state) => state.nbhdWidth.value);

    const dispatch = useAppDispatch();

    return (
        <CustomSlider
            className="w-[80%] mx-auto"
            label="Width"
            minVal={2}
            maxVal={8}
            defaultVal={3}
            step={1}
            value={width}
            marks={true}
            onChange={(val: number) => dispatch(setNbhdWidth(val))}
        />
    );
}

function Type() {
    //
    const type = useAppSelector((state) => state.nbhdType.value);

    const dispatch = useAppDispatch();

    return (
        <Box
            // className="relative h-full border-2 border-jet border-solid"
            className="flex justify-center"
        >
            <CustomRadioGroup
                // className="absolute w-fit left-[50%] translate-x-[-50%]"
                className=""
                label="Type"
                options={[
                    { label: "Adjacent", value: "adjacent" },
                    { label: "Grouped", value: "grouped" },
                    { label: "Scattered", value: "scattered" },
                ]}
                defaultVal="adjacent"
                value={type}
                onChange={(val: string) =>
                    dispatch(setNbhdType(val as NbhdType))
                }
            />
        </Box>
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
        <Box className="h-full relative">
            <Button
                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                icon={faRotate}
                size="2xl"
                tooltipLabel="Reload neighborhoods"
                onClick={() => dispatch(setCellsNbhds(params))}
            />
        </Box>
    );
}
