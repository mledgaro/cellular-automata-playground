//

import React from "react";
import { RangeReducerHook, StateHookObj } from "src/app/hooks";
import CustomRadioGroup from "src/components/RadioGroup";
import { Grid } from "@mui/material";
import CustomSlider from "src/components/Slider";
import { MainCellSelector2D } from "src/features/MainCellSelector";
import { NbhdType2D } from "src/ts/Utils";

export default function Neighborhood2D({
    type,
    width,
    height,
    mainCell,
}: {
    type: StateHookObj<NbhdType2D>;
    width: RangeReducerHook;
    height: RangeReducerHook;
    mainCell: StateHookObj<any>;
}) {
    //

    return (
        <Grid container className="section-container">
            {/* row 1 */}
            <Grid item container columnSpacing={3}>
                {/* width */}
                <Grid item xs>
                    <CustomSlider
                        label="Width"
                        minVal={2}
                        maxVal={8}
                        defaultVal={3}
                        step={1}
                        value={width.get}
                        marks={true}
                        onChange={(val: number) => width.set(val)}
                    />
                </Grid>
                {/* height */}
                <Grid item xs>
                    <CustomSlider
                        label="Height"
                        minVal={2}
                        maxVal={8}
                        defaultVal={3}
                        step={1}
                        value={height.get}
                        marks={true}
                        onChange={(val: number) => height.set(val)}
                    />
                </Grid>
            </Grid>
            {/* row 2 */}
            <Grid item container alignItems="center" className="">
                {/* type */}
                <Grid item xs className="flex justify-center">
                    <CustomRadioGroup
                        className="h-fit"
                        label="Type"
                        options={[
                            { label: "Moore", value: "moore" },
                            { label: "Von Neumann", value: "vonneumann" },
                            { label: "Diagonal", value: "diagonal" },
                        ]}
                        defaultVal="moore"
                        value={type.get}
                        onChange={(val: string) => type.set(val)}
                    />
                </Grid>
                {/* main cell selector */}
                <Grid item xs className="flex justify-center">
                    <MainCellSelector2D
                        type={type.get}
                        width={width.get}
                        height={height.get}
                        selected={mainCell}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
