//
import React from "react";

import { Grid } from "@mui/material";
import { faArrowRotateRight, faBroom } from "@fortawesome/free-solid-svg-icons";

import { DensitySlider } from "src/components/Slider";
import { IconButton } from "src/components/Button";

export default function InitStateEditor({
    density,
    setDensity,
    setRandom,
    setClear,
}: {
    density: number;
    setDensity: (nval: number) => void;
    setRandom: () => void;
    setClear: () => void;
}) {
    //
    return (
        <Grid container justifyContent="space-evenly">
            <Grid item md={7}>
                <DensitySlider get={density} set={setDensity} />
            </Grid>
            <Grid
                item
                md="auto"
                className="flex items-center justify-center space-x-2"
            >
                <IconButton
                    icon={faArrowRotateRight}
                    iconSize="2x"
                    tooltipLabel="Reload"
                    onClick={setRandom}
                />
                <IconButton
                    icon={faBroom}
                    iconSize="2x"
                    tooltipLabel="Clear"
                    onClick={setClear}
                />
            </Grid>
        </Grid>
    );
}
