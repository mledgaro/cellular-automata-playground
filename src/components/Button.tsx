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
        color: "#323031",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#323031",
        color: "#ffd166",
    },
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: "var(--sunglow)",
    color: "var(--jet)",
    "&:hover": {
        backgroundColor: "var(--jet)",
        color: "var(--sunglow)",
    },
    "&:disabled": {
        backgroundColor: "var(--frenchGray)",
        color: "var(--jet)",
        borderColor: "var(--jet)",
        borderStyle: "solid",
        borderWidth: "2px",
    },
}));

export const ResizeBtn = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: "var(--sunglow)",
    color: "var(--jet)",
    minWidth: "fit-content",
    width: "fit-content",
    padding: "3px",
    "&:hover": {
        backgroundColor: "var(--jet)",
        color: "var(--sunglow)",
    },
    "&:disabled": {
        backgroundColor: "var(--frenchGray)",
        color: "var(--jet)",
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
