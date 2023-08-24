//
import React from "react";

import { Box, Grid } from "@mui/material";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import { StyledInput, StyledSlider } from "src/components/Slider";
import Button from "src/components/Button";

import { StateObjHook } from "src/app/hooks";
import { InitState2dHook } from "src/app/hooks/initState2d";

export default function InitState2d({ state }: { state: InitState2dHook }) {
    //
    return (
        <Grid container justifyContent="space-evenly">
            {/* live cells */}
            <Grid item md={8}>
                <LiveCells
                    state={state.liveCells}
                    maxValue={state.cellsNumber}
                />
            </Grid>
            {/* reload btn */}
            <Grid item md="auto" className="flex flex-col justify-center">
                <Button
                    className=""
                    icon={faRotate}
                    size="3x"
                    tooltipLabel="Reload init state"
                    onClick={() => state.setRandom()}
                />
            </Grid>
        </Grid>
    );
}

function LiveCells({
    state,
    maxValue,
}: {
    state: StateObjHook<number>;
    maxValue: number;
}) {
    //
    return (
        <Grid container className="cap-component-container">
            <Grid container>
                <Box className="cap-component-label ms-2 my-2">Live cells</Box>
            </Grid>

            <Grid item md={9}>
                <StyledSlider
                    defaultValue={1}
                    min={1}
                    max={maxValue}
                    value={state.get}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => state.set(value as number)}
                    marks={[
                        {
                            value: 1,
                            label: 1,
                        },
                        {
                            value: maxValue * (1 / 4),
                            label: "25%",
                        },
                        {
                            value: maxValue * (1 / 2),
                            label: "50%",
                        },
                        {
                            value: maxValue * (3 / 4),
                            label: "75%",
                        },
                        {
                            value: maxValue,
                            label: maxValue,
                        },
                    ]}
                />
            </Grid>

            <Grid item md={3} className="flex justify-center">
                <StyledInput
                    className="h-fit"
                    value={state.get}
                    size="small"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        state.set(
                            event.target.value === ""
                                ? 0
                                : Number(event.target.value)
                        )
                    }
                    onBlur={() => {
                        if (state.get < 0) {
                            state.set(0);
                        } else if (state.get > maxValue) {
                            state.set(maxValue);
                        }
                    }}
                    inputProps={{
                        step: 10,
                        min: 1,
                        max: maxValue,
                        type: "number",
                    }}
                    disableUnderline
                />
            </Grid>
        </Grid>
    );
}
