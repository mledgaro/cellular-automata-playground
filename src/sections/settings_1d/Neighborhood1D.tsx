//

import React, { useEffect } from "react";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import Button from "src/components/Button";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setNbhdWidth } from "src/app/slices/nbhdWidth";
import { NbhdType, setNbhdType } from "src/app/slices/nbhdType";
import { setCellsNbhds } from "src/app/slices/cellsNbhds";
import { Grid } from "@mui/material";
import CustomSlider from "src/components/Slider";
import CustomRadioGroup from "src/components/RadioGroup";
import { MainCellSelector1D } from "src/features/MainCellSelector";
import NbhdsMap from "src/features/NbhdsMap";

export default function Neighborhood1D() {
    //
    const width = useAppSelector((state) => state.nbhdWidth.value);
    const type = useAppSelector((state) => state.nbhdType.value);

    const params = {
        numCells: useAppSelector((state) => state.numCells.value),
        width: width,
        type: type,
        mainCell: useAppSelector((state) => state.mainCell.value),
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCellsNbhds(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <Grid container rowSpacing={2}>
            {/* Row 1 */}
            <Grid container item alignItems="center">
                {/* Width */}
                <Grid item md={3}>
                    <CustomSlider
                        label="Width"
                        minVal={2}
                        maxVal={8}
                        defaultVal={3}
                        value={width}
                        marks={true}
                        onChange={(val: number) => dispatch(setNbhdWidth(val))}
                    />
                </Grid>
                {/* Type */}
                <Grid item md={5} className="flex justify-center">
                    <CustomRadioGroup
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
                </Grid>
                {/* Main cell selector */}
                <Grid item md={4} className="flex justify-center">
                    <MainCellSelector1D />
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
                    <Button
                        icon={faRotate}
                        size="2xl"
                        tooltipLabel="Reload neighborhoods"
                        onClick={() => dispatch(setCellsNbhds(params))}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
