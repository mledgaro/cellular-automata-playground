//
import React from "react";

import { Box, Grid } from "@mui/material";
import { faArrowRotateRight, faBroom } from "@fortawesome/free-solid-svg-icons";

import { DensitySlider } from "src/components/Slider";
import Button from "src/components/Button";

import { InitState2dHook } from "src/app/hooks/initState2d";

export default function InitState2d({ state }: { state: InitState2dHook }) {
    //
    return (
        <Grid container justifyContent="space-evenly">
            {/* density */}
            <Grid item md={8}>
                <DensitySlider get={state.density} set={state.setDensity} />
            </Grid>
            {/* reload btn */}
            <Grid item md="auto" className="flex flex-col justify-center">
                <Box className="space-x-2">
                    <Button
                        icon={faArrowRotateRight}
                        size="2x"
                        tooltipLabel="Reload"
                        onClick={() => state.setRandom()}
                    />
                    <Button
                        icon={faBroom}
                        size="2x"
                        tooltipLabel="Clear"
                        onClick={() => state.clear()}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
