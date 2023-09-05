import React from "react";

import { Box, Fade, Grid } from "@mui/material";
import {
    IconDefinition,
    faHeart,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

import { StyledTooltip } from "src/components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Info({
    iterations,
    liveCells,
}: {
    iterations: number;
    liveCells: number;
}) {
    //
    return (
        <Grid item container alignItems="center" justifyContent="center" md>
            <Card
                icon={faStopwatch}
                tooltipLabel="Iterations"
                value={iterations}
            />
            <Card icon={faHeart} tooltipLabel="Live cells" value={liveCells} />
        </Grid>
    );
}

function Card({
    icon,
    tooltipLabel,
    value,
}: {
    icon: IconDefinition;
    tooltipLabel: string;
    value: number;
}) {
    return (
        <Grid item md>
            <StyledTooltip
                title={tooltipLabel}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 500 }}
                followCursor
                arrow
            >
                <Box className="flex flex-row space-x-2 cap-component-container text-2xl w-fit py-2 px-3 mx-auto">
                    <Box>
                        <FontAwesomeIcon icon={icon} />
                    </Box>
                    <Box>{value}</Box>
                </Box>
            </StyledTooltip>
        </Grid>
    );
}
