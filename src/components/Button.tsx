import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Fade,
    Tooltip,
    TooltipProps,
    styled,
    tooltipClasses,
} from "@mui/material";
import React from "react";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
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

export default function CustomButtom({
    icon,
    size,
    tooltipLabel = "",
    onClick,
}: {
    icon: IconDefinition;
    size: SizeProp;
    tooltipLabel?: string;
    onClick: () => void;
}) {
    return (
        <StyledTooltip
            title={tooltipLabel}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 700 }}
            followCursor
            arrow
        >
            <Button
                className="bg-sunglow text-jet rounded-md"
                variant="contained"
                onClick={onClick}
            >
                <FontAwesomeIcon icon={icon} size={size} />
            </Button>
        </StyledTooltip>
    );
}
