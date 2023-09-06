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
        >
            <StyledButton
                variant="contained"
                onClick={onClick}
                disabled={disabled}
                className={className}
            >
                <FontAwesomeIcon icon={icon} size={size} />
            </StyledButton>
        </StyledTooltip>
    );
}

export function MiniButton({
    icon,
    disabled = false,
    onClick = () => {},
}: {
    icon: IconDefinition;
    disabled?: boolean;
    onClick?: () => void;
}) {
    return (
        <StyledButton
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            className="p-[4px]"
            // style={{ padding: "4px" }}
        >
            <FontAwesomeIcon icon={icon} size="xs" />
        </StyledButton>
    );
}
