import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, BoxProps, Fade } from "@mui/material";
import React from "react";
import { MiniButton, StyledTooltip } from "./Button";

export default function Label({
    icon,
    tooltipLabel,
    content,
    size = "lg",
    vertical = false,
    ...props
}: BoxProps & {
    icon: IconDefinition;
    tooltipLabel: string;
    content: JSX.Element | string;
    size?: string;
    vertical?: boolean;
}) {
    //
    const className_ = `${
        props.className
    } flex items-center cap-component-container py-2 px-3 select-none ${
        vertical ? "flex-col space-y-1" : "flex-row space-x-2"
    } text-${size}`;

    return (
        <StyledTooltip
            title={tooltipLabel}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
            followCursor
            arrow
        >
            <Box {...{ ...props, className: className_ }}>
                <Box>
                    <FontAwesomeIcon icon={icon} />
                </Box>
                <Box className="text-tertiary w-full">{content}</Box>
            </Box>
        </StyledTooltip>
    );
}

export function LabelButton({
    icon,
    tooltipLabel,
    content,
    size = "lg",
    vertical = false,
    onClick,
    ...props
}: BoxProps & {
    icon: IconDefinition;
    tooltipLabel: string;
    content: JSX.Element | string;
    size?: string;
    vertical?: boolean;
    onClick: () => void;
}) {
    //
    const className_ = `${
        props.className
    } flex items-center cap-component-container py-2 px-3 select-none ${
        vertical ? "flex-col space-y-1" : "flex-row space-x-2"
    } text-${size}`;

    return (
        <StyledTooltip
            title={tooltipLabel}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
            followCursor
            arrow
        >
            <Box {...{ ...props, className: className_ }}>
                <Box>
                    <MiniButton icon={icon} iconSize="lg" onClick={onClick} />
                </Box>
                <Box className="text-tertiary">{content}</Box>
            </Box>
        </StyledTooltip>
    );
}
