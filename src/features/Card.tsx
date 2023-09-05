import React from "react";

import { Box, Fade } from "@mui/material";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { StyledTooltip } from "src/components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({
    icon,
    tooltipLabel,
    value,
}: {
    icon: IconDefinition;
    tooltipLabel: string;
    value: number;
}) {
    return (
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
    );
}
