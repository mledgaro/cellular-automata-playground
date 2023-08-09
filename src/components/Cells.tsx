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

export function DeactivatedCell({
    onClick = () => {},
}: {
    onClick?: () => void;
}) {
    //

    return (
        <span className="cap-icon-cell cap-deactivated-cell" onClick={onClick}>
            <FontAwesomeIcon icon={faSquareXmark} size="sm" />
        </span>
    );
}

export function SelectedCell({ onClick }: { onClick: () => void }) {
    //

    return (
        <span className="cap-icon-cell" onClick={onClick}>
            <FontAwesomeIcon icon={faSquareCheck} size="2xl" />
        </span>
    );
}

export function IconCell({
    alive = false,
    size = "5x",
    onClick = () => {},
}: {
    alive?: boolean;
    size?: SizeProp;
    onClick?: () => void;
}) {
    //

    return (
        <span className="cap-icon-cell" onClick={onClick}>
            <FontAwesomeIcon
                icon={alive ? faSquareSolid : faSquareRegular}
                size={size}
            />
        </span>
    );
}

export function SpanCell({
    alive,
    toggle,
}: {
    alive: boolean;
    toggle: () => void;
}) {
    //

    const classes = `cap-cell cap-cell-${alive ? "on" : "off"}`;

    return <span className={classes} onClick={toggle} />;
}

function Ellipsis() {
    //

    return (
        <span className="cap-icon-cell">
            <FontAwesomeIcon icon={faEllipsis} size="2xs" />
        </span>
    );
}

export function Ellipses({
    cells,
    mainCell,
    nbhdType,
}: {
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
                cells_.splice(0, 0, <Ellipsis />);
                cells_.push(<Ellipsis />);
            }

            if (mainCell >= 0 && mainCell < lastIdx) {
                cells_.splice(mainCell + 1, 0, <Ellipsis />);
            }

            if (mainCell > 0 && mainCell <= lastIdx) {
                cells_.splice(mainCell, 0, <Ellipsis />);
            }
            break;
        case "scattered":
            for (let i = lastIdx; i > 0; i--) {
                cells_.splice(i, 0, <Ellipsis />);
            }
            break;
    }

    return <span>{cells_}</span>;
}
