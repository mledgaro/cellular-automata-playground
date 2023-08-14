//

import React from "react";
import { RangeReducerHook, StateHookObj } from "src/app/hooks";
import CustomRadioGroup from "src/components/RadioGroup";
import { Box } from "@mui/material";
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
        <Box className="section-container">
            <CustomRadioGroup
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
            <MainCellSelector2D
                type={type.get}
                width={width.get}
                height={height.get}
                selected={mainCell}
            />
        </Box>
    );
}
