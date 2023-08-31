//
import React from "react";

import { Grid } from "@mui/material";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

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
