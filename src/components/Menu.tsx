//
import React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { Box } from "@mui/material";
import { IconButton } from "./Button";
import { useStateObj } from "src/app/hooks";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

export function FloatMenu({
    icon,
    iconSize = "lg",
    tooltipLabel = "",
    boxProps = "",
    content,
}: {
    icon: IconDefinition;
    iconSize?: SizeProp;
    tooltipLabel?: string;
    boxProps?: string;
    content: JSX.Element;
}) {
    const show = useStateObj(false);
    return (
        <Box className="relative">
            <IconButton
                icon={icon}
                iconSize={iconSize}
                tooltipLabel=""
                onClick={() => show.set(!show.get)}
                className="p-2"
            />
            {show.get && (
                <Box
                    className={`cap-float-menu ${boxProps}`}
                    onBlur={() => show.set(false)}
                >
                    {content}
                </Box>
            )}
        </Box>
    );
}
