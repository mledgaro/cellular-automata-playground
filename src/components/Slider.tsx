//
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Fade, Grid, Slider, SliderProps, styled } from "@mui/material";
import React from "react";
import { StateObjHook } from "src/app/hooks";
import { StyledTooltip } from "src/components/Button";

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
        <Box className={`${className}`}>
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
        <Grid container alignItems="center" justifyContent="center">
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
        <Grid container>
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
        </Grid>
    );
}

export function VerticalSlider({
    icon,
    tooltipLabel,
    state,
    ...props
}: SliderProps & {
    icon: IconDefinition;
    tooltipLabel: string;
    state: StateObjHook<number>;
}) {
    return (
        <Box className="flex flex-col w-fit items-center text-primary justify-center shadow-sm shadow-tertiary rounded-md p-1">
            <Box className="">
                <StyledSlider
                    {...props}
                    className={`${props.className} h-[20vh] w-[8px] my-[15px]`}
                    value={state.get}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => state.set(value as number)}
                    valueLabelDisplay="off"
                    orientation="vertical"
                />
            </Box>

            <Box>
                <StyledTooltip
                    title={tooltipLabel}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 700 }}
                    followCursor
                    arrow
                >
                    <FontAwesomeIcon icon={icon} size="xl" />
                </StyledTooltip>
            </Box>
        </Box>
    );
}
