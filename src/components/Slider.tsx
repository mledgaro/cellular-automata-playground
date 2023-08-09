//
import { Box, Slider, SliderProps, styled } from "@mui/material";
import React from "react";

const StyledSlider = styled(Slider)<SliderProps>(({ theme }) => ({
    width: "80%",
    color: "#ffd166",
    "& .MuiSlider-rail": {
        backgroundColor: "#bbb5bd",
    },
    "& .MuiSlider-track": {
        backgroundColor: "#ffd166",
        borderColor: "#ffd166",
    },
    "& .MuiSlider-mark": {
        backgroundColor: "#ffd166",
        width: "5px",
        height: "5px",
    },
    "& .MuiSlider-thumb": {
        backgroundColor: "#ffd166",
        "&:hover, &.Mui-focusVisible": {
            boxShadow: "0px 0px 0px 8px rgba(255, 209, 102, 0.2)",
        },
        "&.Mui-active": {
            boxShadow: "0px 0px 0px 14px rgba(255, 209, 102, 0.2)",
        },
    },
}));

export default function CustomSlider({
    label,
    minVal,
    maxVal,
    defaultVal,
    step,
    value,
    onChange,
}: {
    label: string;
    minVal: number;
    maxVal: number;
    defaultVal: number;
    step: number;
    value: number;
    onChange: (val: number) => void;
}) {
    return (
        <Box className="bg-jet rounded-md h-10" sx={{ position: "relative" }}>
            <span
                className="font-black text-sunglow select-none pl-3"
                style={{
                    position: "absolute",
                    margin: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            >
                {label}
            </span>

            <StyledSlider
                aria-label="Width"
                defaultValue={defaultVal}
                valueLabelDisplay="auto"
                step={step}
                marks
                min={minVal}
                max={maxVal}
                style={{
                    left: "10%",
                    position: "absolute",
                    margin: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
                value={value}
                onChange={(
                    event: Event,
                    value: number | number[],
                    activeThumb: number
                ) => onChange(value as number)}
            />
        </Box>
    );
}
