//
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Slider, SliderProps, styled } from "@mui/material";
import React from "react";

export const StyledSlider = styled(Slider)<SliderProps>(({ theme }) => ({
    width: "calc(100% - 40px)",
    marginLeft: "20px",
    marginRight: "20px",
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
    label = "",
    icon,
    minVal,
    maxVal,
    defaultVal,
    step = 1,
    marks = false,
    value,
    onChange,
    className = "",
}: {
    label?: string;
    icon?: IconDefinition;
    minVal: number;
    maxVal: number;
    defaultVal: number;
    step?: number;
    marks?: boolean;
    value: number | number[];
    onChange: (val: number) => void;
    className?: string;
}) {
    return (
        <Box className={`cap-component-container pt-1 ${className}`}>
            {icon && <FontAwesomeIcon icon={icon} />}

            {label !== "" && (
                <Box className="cap-component-label ml-2">{label}</Box>
            )}

            <StyledSlider
                aria-label={label}
                defaultValue={defaultVal}
                valueLabelDisplay="auto"
                step={step}
                marks={marks}
                min={minVal}
                max={maxVal}
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
