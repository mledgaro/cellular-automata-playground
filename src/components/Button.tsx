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

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: "var(--primary)",
    color: "var(--secondary)",
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

export const ResizeBtn = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: "var(--primary)",
    color: "var(--secondary)",
    minWidth: "fit-content",
    width: "fit-content",
    padding: "3px",
    "&:hover": {
        backgroundColor: "var(--secondary)",
        color: "var(--primary)",
    },
    "&:disabled": {
        backgroundColor: "var(--tertiary)",
        color: "var(--secondary)",
    },
}));

export default function CustomButtom({
    icon,
    size,
    tooltipLabel = "",
    disabled = false,
    onClick = () => {},
    className = "",
}: {
    icon: IconDefinition;
    size: SizeProp;
    tooltipLabel?: string;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <StyledTooltip
            title={tooltipLabel}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 700 }}
            followCursor
            arrow
            className=""
        >
            <StyledButton
                className={`rounded-md ${className}`}
                variant="contained"
                onClick={onClick}
                disabled={disabled}
            >
                <FontAwesomeIcon icon={icon} size={size} />
            </StyledButton>
        </StyledTooltip>
    );
}
