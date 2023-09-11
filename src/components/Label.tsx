import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, BoxProps, Fade } from "@mui/material";
import React from "react";
import { MiniButton, StyledTooltip } from "./Button";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

export default function Label({
    icon,
    tooltipLabel,
    content,
    textSize = "lg",
    iconSize = "sm",
    vertical = false,
    ...props
}: BoxProps & {
    icon: IconDefinition;
    tooltipLabel: string;
    content: JSX.Element | string;
    textSize?: string;
    iconSize?: SizeProp;
    vertical?: boolean;
}) {
    //
    const className_ = `${
        props.className
    } flex items-center text-primary select-none ${
        vertical ? "flex-col space-y-1" : "flex-row space-x-2"
    }`;

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
                    <FontAwesomeIcon icon={icon} size={iconSize} />
                </Box>
                <Box className={`text-tertiary w-full text-${textSize}`}>
                    {content}
                </Box>
            </Box>
        </StyledTooltip>
    );
}

export function LabelButton({
    icon,
    tooltipLabel,
    content,
    size = "lg",
    iconSize = "lg",
    vertical = false,
    onClick,
    ...props
}: BoxProps & {
    icon: IconDefinition;
    tooltipLabel: string;
    content: JSX.Element | string;
    size?: string;
    iconSize?: SizeProp;
    vertical?: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
    //
    const className_ = `${props.className} flex items-center select-none ${
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
            <Box {...{ ...props, className: className_, onClick: () => {} }}>
                <Box>
                    <MiniButton
                        icon={icon}
                        iconSize={iconSize}
                        onClick={onClick}
                    />
                </Box>
                <Box className="text-tertiary">{content}</Box>
            </Box>
        </StyledTooltip>
    );
}
