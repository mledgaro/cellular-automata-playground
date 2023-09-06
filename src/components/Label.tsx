import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Fade } from "@mui/material";
import React from "react";
import { StyledTooltip } from "./Button";

export default function Label({
    icon,
    tooltipLabel,
    info,
    size = "2xl",
    vertical = false,
}: {
    icon: IconDefinition;
    tooltipLabel: string;
    info: string;
    size?: string;
    vertical?: boolean;
}) {
    return (
        <StyledTooltip
            title={tooltipLabel}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
            followCursor
            arrow
        >
            <Box
                className={`flex items-center cap-component-container py-2 px-3 w-fit ${
                    vertical ? "flex-col space-y-1" : "flex-row space-x-2"
                } text-${size}`}
            >
                <Box>
                    <FontAwesomeIcon icon={icon} />
                </Box>
                <Box className="text-tertiary">{info}</Box>
            </Box>
        </StyledTooltip>
    );
}
