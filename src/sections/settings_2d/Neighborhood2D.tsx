//

import React from "react";
import { RangeReducerHook, StateHookObj } from "src/app/hooks";
import CustomRadioGroup from "src/components/RadioGroup";
import { Grid } from "@mui/material";
import CustomSlider from "src/components/Slider";
import { MainCellSelector2D } from "src/features/MainCellSelector";

export type NbhdType2D = "moore" | "vonneumann" | "diagonal";

export default function Neighborhood2D({
    type,
    width,
    height,
    mainCell,
}: {
    type: StateHookObj;
    width: RangeReducerHook;
    height: RangeReducerHook;
    mainCell: StateHookObj;
}) {
    //

    return (
        <Grid container className="section-container">
            <Grid item container columnSpacing={3}>
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

            <Grid item container className="">
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
