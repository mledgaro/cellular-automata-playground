//
import React from "react";

import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons";

import { Box } from "@mui/material";
import { IconButton } from "./Button";
import { useBool } from "src/app/hooks";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

type ModalMenuButtonProps = {
    icon: IconDefinition;
    content: JSX.Element;
    iconSize?: SizeProp;
    tooltipLabel?: string;
    iconOnShow?: IconDefinition;
    orientation?: "row" | "col";
    hideDoneButton?: boolean;
    onClose?: () => void;
    boxProps?: string;
};

export default function FloatingMenuButton({
    icon,
    content,
    iconSize = "lg",
    tooltipLabel = "",
    iconOnShow,
    orientation = "col",
    hideDoneButton = false,
    onClose = () => {},
    boxProps = "",
}: ModalMenuButtonProps) {
    const show = useBool(false);
    return (
        <Box className="relative">
            <IconButton
                icon={show.get ? iconOnShow ?? icon : icon}
                iconSize={iconSize}
                tooltipLabel={tooltipLabel}
                onClick={() => show.toggle()}
                className="p-2"
            />
            {show.get && (
                <Box className={`cap-modal-menu ${orientation} ${boxProps}`}>
                    {content}
                    {!hideDoneButton && (
                        <IconButton
                            icon={faCheck}
                            iconSize="lg"
                            tooltipLabel="Done"
                            onClick={() => {
                                show.setFalse();
                                onClose();
                            }}
                            className={`${
                                orientation === "col"
                                    ? "w-1/2 min-w-fit mx-auto"
                                    : "h-fit my-auto"
                            }`}
                        />
                    )}
                </Box>
            )}
        </Box>
    );
}
