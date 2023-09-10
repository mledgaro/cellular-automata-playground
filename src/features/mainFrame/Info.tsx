import React from "react";
import { Box, Grid } from "@mui/material";
import { faHeart, faStopwatch } from "@fortawesome/free-solid-svg-icons";

import { StateObjHook } from "src/app/hooks";

import Label from "src/components/Label";
import InputNumber from "src/components/InputNumber";
import { FloatMenu } from "src/components/Menu";

export default function Info({
    iterations,
    stopIterations,
    liveCells,
}: {
    iterations: number;
    stopIterations: StateObjHook<number>;
    liveCells: number;
}) {
    //

    return (
        <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item md={3} className="flex justify-center">
                <Iterations
                    iterations={iterations}
                    stopIterations={stopIterations}
                />
            </Grid>

            <Grid item md={3} className="flex justify-center">
                <Label
                    icon={faHeart}
                    tooltipLabel="Live cells"
                    content={liveCells.toString()}
                    textSize="xl"
                    iconSize="2xl"
                />
            </Grid>
        </Grid>
    );
}

function Iterations({
    iterations,
    stopIterations,
}: {
    iterations: number;
    stopIterations: StateObjHook<number>;
}) {
    return (
        <Box className="flex flex-row space-x-2 items-center cap-component-container py-2 px-3 select-none">
            <Box>
                <FloatMenu
                    icon={faStopwatch}
                    iconSize="xl"
                    content={
                        <InputNumber
                            state={stopIterations}
                            min={0}
                            max={100_000}
                            label="Pause at"
                        />
                    }
                    boxProps="bottom-0 left-0 w-[8rem] translate-x-[1rem] -translate-y-[3rem]"
                />
            </Box>
            <Box className="text-tertiary text-xl">
                {iterations +
                    (stopIterations.get > 0 ? ` / ${stopIterations.get}` : "")}
            </Box>
        </Box>
    );
}
