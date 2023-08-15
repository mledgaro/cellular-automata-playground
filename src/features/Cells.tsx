//
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCheck,
    faSquare as faSquareRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
    faEllipsis,
    faSquare as faSquareSolid,
    faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";

import { NbhdType } from "src/app/slices/nbhdType";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Box } from "@mui/material";

export function IconCell({
    alive = false,
    size = "lg",
    onClick = () => {},
}: {
    alive?: boolean;
    size?: SizeProp;
    onClick?: () => void;
}) {
    return (
        <span onClick={onClick}>
            <FontAwesomeIcon
                icon={alive ? faSquareSolid : faSquareRegular}
                size={size}
            />
        </span>
    );
}

export function SelectedCell({
    size = "lg",
    onClick = () => {},
}: {
    size?: SizeProp;
    onClick?: () => void;
}) {
    return (
        <span onClick={onClick}>
            <FontAwesomeIcon icon={faSquareCheck} size={size} />
        </span>
    );
}

function Ellipsis({ size = "xs" }: { size?: SizeProp }) {
    return <FontAwesomeIcon icon={faEllipsis} size={size} />;
}

export function Ellipses({
    size = "sm",
    cells,
    mainCell,
    nbhdType,
}: {
    size?: SizeProp;
    cells: JSX.Element[];
    mainCell: number;
    nbhdType: NbhdType;
}) {
    //
    let cells_ = [...cells];
    const lastIdx = cells_.length - 1;

    switch (nbhdType) {
        case "adjacent":
            break;
        case "grouped":
            if (mainCell === -1) {
                cells_.splice(0, 0, <Ellipsis size={size} key={1} />);
                cells_.push(<Ellipsis size={size} key={2} />);
            } else {
                if (mainCell >= 0 && mainCell < lastIdx) {
                    cells_.splice(
                        mainCell + 1,
                        0,
                        <Ellipsis size={size} key={1} />
                    );
                }
                if (mainCell > 0 && mainCell <= lastIdx) {
                    cells_.splice(
                        mainCell,
                        0,
                        <Ellipsis size={size} key={2} />
                    );
                }
            }
            break;
        case "scattered":
            for (let i = lastIdx; i > 0; i--) {
                cells_.splice(i, 0, <Ellipsis size={size} key={i} />);
            }
            break;
    }

    return <>{cells_}</>;
}

export function DeactivatedCell({
    size = "lg",
    onClick = () => {},
}: {
    size?: SizeProp;
    onClick?: () => void;
}) {
    //

    return (
        <span className="cap-icon-cell cap-deactivated-cell" onClick={onClick}>
            <FontAwesomeIcon icon={faSquareXmark} size={size} />
        </span>
    );
}
