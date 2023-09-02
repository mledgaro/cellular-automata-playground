//
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Fade,
    Grid,
    Input,
    InputProps,
    Slider,
    SliderProps,
    styled,
} from "@mui/material";
import React from "react";
import { StateObjHook } from "src/app/hooks";
import { StyledTooltip } from "./Button";

export const StyledSlider = styled(Slider)<SliderProps>(({ theme }) => ({
    width: "calc(100% - 40px)",
    marginLeft: "20px",
    marginRight: "20px",
    color: "var(--primary)",
    "& .MuiSlider-rail": {
        backgroundColor: "var(--tertiary)",
    },
    "& .MuiSlider-track": {
        backgroundColor: "var(--primary)",
        borderColor: "var(--primary)",
    },
    "& .MuiSlider-mark": {
        backgroundColor: "var(--primary)",
        width: "5px",
        height: "5px",
    },
    "& .MuiSlider-markLabel": {
        color: "var(--tertiary)",
        fontWeight: "500",
    },
    "& .MuiSlider-thumb": {
        backgroundColor: "var(--primary)",
        "&:hover, &.Mui-focusVisible": {
            boxShadow:
                "0px 0px 0px 8px color-mix(in srgb, var(--primary) 20%, transparent)",
        },
        "&.Mui-active": {
            boxShadow:
                "0px 0px 0px 8px color-mix(in srgb, var(--primary) 20%, transparent)",
        },
    },
}));

export const StyledInput = styled(Input)<InputProps>(({ theme }) => ({
    color: "var(--primary)",
    borderBottom: "1px solid var(--tertiary)",
    "&:hover": {
        borderBottom: "1px solid var(--primary)",
    },
    "&.Mui-focused": {
        borderBottom: "3px solid var(--primary)",
    },
    "&.Mui-focused:hover": {
        borderBottom: "3px solid var(--primary)",
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

export function IconSlider({
    icon,
    tooltipLabel,
    state,
    defaultVal,
    minVal,
    maxVal,
}: {
    icon: IconDefinition;
    tooltipLabel: string;
    state: StateObjHook<number> | undefined;
    defaultVal: number;
    minVal: number;
    maxVal: number;
}) {
    return (
        <Grid
            container
            className="cap-component-container"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs="auto">
                <StyledTooltip
                    title={tooltipLabel}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 700 }}
                    followCursor
                    arrow
                >
                    <FontAwesomeIcon
                        icon={icon}
                        size="2x"
                        className="ms-2 my-2"
                    />
                </StyledTooltip>
            </Grid>

            <Grid item xs>
                <StyledSlider
                    defaultValue={defaultVal}
                    min={minVal}
                    max={maxVal}
                    value={state!.get}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => state!.set(value as number)}
                    valueLabelDisplay="off"
                />
            </Grid>
        </Grid>
    );
}

export function DensitySlider({
    get,
    set,
}: {
    get: number;
    set: (val: number) => void;
}) {
    //
    return (
        <Grid container className="cap-component-container">
            <Grid container>
                <Box className="cap-component-label ms-2 my-2">Density</Box>
            </Grid>

            <Grid item xs={12}>
                <StyledSlider
                    defaultValue={1}
                    min={0.01}
                    max={1}
                    step={0.01}
                    value={get}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => set(value as number)}
                    marks={[
                        {
                            value: 0.01,
                            label: "1%",
                        },
                        {
                            value: 0.25,
                            label: "25%",
                        },
                        {
                            value: 0.5,
                            label: "50%",
                        },
                        {
                            value: 0.75,
                            label: "75%",
                        },
                        {
                            value: 1,
                            label: "100%",
                        },
                    ]}
                />
            </Grid>

            {/* <Grid item md={3} className="flex justify-center">
                <StyledInput
                    className="h-fit"
                    value={density}
                    size="small"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(
                            setDensity(
                                event.target.value === ""
                                    ? 0
                                    : Number(event.target.value)
                            )
                        )
                    }
                    onBlur={() => {
                        if (density < 0.01) {
                            dispatch(setDensity(0.01));
                        } else if (density > 1) {
                            dispatch(setDensity(1));
                        }
                    }}
                    inputProps={{
                        step: 0.05,
                        min: 0.01,
                        max: 1,
                        type: "number",
                    }}
                    disableUnderline
                />
            </Grid> */}
        </Grid>
    );
}
