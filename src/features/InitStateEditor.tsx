//
import React from "react";

import { Grid } from "@mui/material";
import { faArrowRotateRight, faBroom } from "@fortawesome/free-solid-svg-icons";

import { DensitySlider } from "src/components/Slider";
import Button from "src/components/Button";

import { CellsStateHook } from "src/app/hooks/cellsState";

export default function InitStateEditor({ state }: { state: CellsStateHook }) {
    //
    return (
        <Grid container justifyContent="space-evenly">
            <Grid item md={7}>
                <DensitySlider get={state.density} set={state.setDensity} />
            </Grid>
            <Grid
                item
                md="auto"
                className="flex items-center justify-center space-x-2"
            >
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
            </Grid>
        </Grid>
    );
}
