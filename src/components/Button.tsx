import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    ButtonProps,
    Fade,
    Tooltip,
    TooltipProps,
    styled,
    tooltipClasses,
} from "@mui/material";
import React from "react";

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "var(--secondary)",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "var(--secondary)",
        color: "var(--primary)",
    },
}));

export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: "var(--primary)",
    color: "var(--secondary)",
    minWidth: "fit-content",
    width: "fit-content",
    borderRadius: "6px",
    "&:hover": {
        backgroundColor: "var(--secondary)",
        color: "var(--primary)",
    },
    "&:disabled": {
        backgroundColor: "var(--tertiary)",
        color: "var(--secondary)",
        borderColor: "var(--secondary)",
        borderStyle: "solid",
        borderWidth: "2px",
    },
}));

export function TooltipButton({
    tooltipLabel,
    content,
    ...props
}: ButtonProps & {
    tooltipLabel: string;
    content: JSX.Element;
}) {
    return (
        <StyledTooltip
            title={tooltipLabel}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 700 }}
            followCursor
            arrow
        >
            <StyledButton variant="contained" {...props}>
                {content}
            </StyledButton>
        </StyledTooltip>
    );
}

export function IconButton({
    icon,
    iconSize,
    tooltipLabel,
    ...props
}: ButtonProps & {
    icon: IconDefinition;
    iconSize: SizeProp;
    tooltipLabel: string;
}) {
    return (
        <TooltipButton
            tooltipLabel={tooltipLabel}
            content={<FontAwesomeIcon icon={icon} size={iconSize} />}
            {...props}
        />
    );
}

export function MiniButton({
    icon,
    iconSize = "xs",
    ...props
}: ButtonProps & {
    icon: IconDefinition;
    iconSize?: SizeProp;
}) {
    return (
        <StyledButton
            {...props}
            variant="contained"
            className={`${props.className} p-[4px]`}
        >
            <FontAwesomeIcon icon={icon} size={iconSize} />
        </StyledButton>
    );
}
