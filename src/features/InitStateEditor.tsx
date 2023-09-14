//
import React from "react";

import { Grid } from "@mui/material";
import { faArrowRotateRight, faBroom } from "@fortawesome/free-solid-svg-icons";

import { DensitySlider } from "src/components/Slider";
import { IconButton } from "src/components/Button";
import { useAppDispatch, useStateObj } from "src/app/hooks";
import { clearCells } from "src/app/slices/mainFrame/cells";

export default function InitStateEditor({
    random,
    clear,
}: {
    random: (density: number) => void;
    clear: () => void;
}) {
    //
    const dispatch = useAppDispatch();
    const density = useStateObj(0.5);

    return (
        <Grid container justifyContent="space-evenly">
            <Grid item md={7}>
                <DensitySlider
                    get={density.get}
                    set={(nval: number) => {
                        density.set(nval);
                        random(nval);
                    }}
                />
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
                    onClick={() => random(density.get)}
                />
                <IconButton
                    icon={faBroom}
                    iconSize="2x"
                    tooltipLabel="Clear"
                    onClick={() => {
                        clear();
                        dispatch(clearCells());
                    }}
                />
            </Grid>
        </Grid>
    );
}
