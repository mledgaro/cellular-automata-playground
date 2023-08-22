//
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Input,
    InputProps,
    Slider,
    SliderProps,
    styled,
} from "@mui/material";
import React from "react";

export const StyledSlider = styled(Slider)<SliderProps>(({ theme }) => ({
    width: "calc(100% - 40px)",
    marginLeft: "20px",
    marginRight: "20px",
    color: "var(--sunglow)",
    "& .MuiSlider-rail": {
        backgroundColor: "var(--frenchGray)",
    },
    "& .MuiSlider-track": {
        backgroundColor: "var(--sunglow)",
        borderColor: "var(--sunglow)",
    },
    "& .MuiSlider-mark": {
        backgroundColor: "var(--sunglow)",
        width: "5px",
        height: "5px",
    },
    "& .MuiSlider-markLabel": {
        color: "var(--frenchGray)",
        fontWeight: "500",
    },
    "& .MuiSlider-thumb": {
        backgroundColor: "var(--sunglow)",
        "&:hover, &.Mui-focusVisible": {
            boxShadow: "0px 0px 0px 8px rgba(255, 209, 102, 0.2)",
        },
        "&.Mui-active": {
            boxShadow: "0px 0px 0px 14px rgba(255, 209, 102, 0.2)",
        },
    },
}));

export const StyledInput = styled(Input)<InputProps>(({ theme }) => ({
    color: "var(--sunglow)",
    borderBottom: "1px solid var(--frenchGray)",
    "&:hover": {
        borderBottom: "1px solid var(--sunglow)",
    },
    "&.Mui-focused": {
        borderBottom: "3px solid var(--sunglow)",
    },
    "&.Mui-focused:hover": {
        borderBottom: "3px solid var(--sunglow)",
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
    valueLabelDisplay = "auto",
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
    valueLabelDisplay?: "on" | "auto" | "off";
    className?: string;
}) {
    return (
        <Box className={`cap-component-container pt-1 ${className}`}>
            {icon && (
                <Box className="cap-component-label ml-2 mt-1">
                    <FontAwesomeIcon icon={icon} />
                </Box>
            )}

            {label !== "" && (
                <Box className="cap-component-label ml-2 mt-2">{label}</Box>
            )}

            <StyledSlider
                aria-label={label}
                defaultValue={defaultVal}
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
                valueLabelDisplay={valueLabelDisplay}
            />
        </Box>
    );
}
