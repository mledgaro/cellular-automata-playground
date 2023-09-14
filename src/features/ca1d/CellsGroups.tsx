//
import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCheck,
    faSquare as faSquareRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
    faEllipsis,
    faMinus,
    faPlus,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";

import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Box } from "@mui/material";

import { intToBoolArray } from "src/ts/Utils";
import { MiniButton } from "src/components/Button";
import { NbhdType1D } from "src/app/types";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { selectNbhdType } from "src/app/slices/ca1d/nbhdType";
import { selectNbhdWidth, setNbhdWidth } from "src/app/slices/ca1d/nbhdWidth";
import {
    selectNbhdCenter,
    setNbhdCenter,
} from "src/app/slices/ca1d/nbhdCenter";

export function Nbhd1dEditor({
    minWidth = 2,
    maxWidth = 8,
    className = "",
}: {
    minWidth?: number;
    maxWidth?: number;
    className?: string;
}) {
    //
    const type = useAppSelector(selectNbhdType);
    const width = useAppSelector(selectNbhdWidth);
    const center = useAppSelector(selectNbhdCenter);

    const dispatch = useAppDispatch();

    const setCenter = (idx: number) => dispatch(setNbhdCenter(idx));

    let cells = [];
    const keyBase = Math.floor(Math.random() * 100);

    for (let i = 0; i < width; i++) {
        cells.push(
            <FontAwesomeIcon
                key={keyBase + i}
                icon={faSquareRegular}
                size="xl"
                onClick={() => setCenter(i)}
            />
        );
    }

    if (center !== -1) {
        cells.splice(
            center,
            1,
            <FontAwesomeIcon
                key={keyBase + center}
                icon={faSquareCheck}
                size="2xl"
                onClick={() => setCenter(-1)}
            />
        );
    }

    // update main cell if width changes
    useEffect(() => {
        //
        if (center >= width) {
            setCenter(Math.floor(width / 2));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    cells = addEllipses(cells, center, type, "xs");

    return (
        <Box
            className={`text-primary w-fit space-x-4 flex flex-row ${className}`}
        >
            <Box className="space-x-1">{cells}</Box>

            <Box className="space-x-1">
                <MiniButton
                    icon={faMinus}
                    onClick={() => dispatch(setNbhdWidth(width - 1))}
                    disabled={width <= minWidth}
                />
                <MiniButton
                    icon={faPlus}
                    onClick={() => dispatch(setNbhdWidth(width + 1))}
                    disabled={width >= maxWidth}
                />
            </Box>
        </Box>
    );
}

export function RulePreview({ index }: { index: number }) {
    //
    const nbhdType = useAppSelector(selectNbhdType);
    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const nbhdCenter = useAppSelector(selectNbhdCenter);

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <FontAwesomeIcon
            key={i}
            icon={e ? faSquareSolid : faSquareRegular}
            size={i === nbhdCenter ? "2xl" : "lg"}
        />
    ));

    cells = addEllipses(cells, nbhdCenter, nbhdType, "xs");

    return <Box className="text-primary w-fit space-x-1.5">{cells}</Box>;
}

function addEllipses(
    cells: JSX.Element[],
    mainCell: number,
    nbhdType: NbhdType1D,
    size: SizeProp
) {
    //
    let cells_ = [...cells];
    const lastIdx = cells_.length - 1;
    const keyBase = Math.floor(Math.random() * 100) + 100;

    switch (nbhdType) {
        case "adjacent":
            break;
        case "grouped":
            if (mainCell === -1) {
                cells_.splice(
                    0,
                    0,
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        size={size}
                        key={keyBase + 1}
                    />
                );
                cells_.push(
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        size={size}
                        key={keyBase + 2}
                    />
                );
            } else {
                if (mainCell >= 0 && mainCell < lastIdx) {
                    cells_.splice(
                        mainCell + 1,
                        0,
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            size={size}
                            key={keyBase + 1}
                        />
                    );
                }
                if (mainCell > 0 && mainCell <= lastIdx) {
                    cells_.splice(
                        mainCell,
                        0,
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            size={size}
                            key={keyBase + 2}
                        />
                    );
                }
            }
            break;
        case "scattered":
            for (let i = lastIdx; i > 0; i--) {
                cells_.splice(
                    i,
                    0,
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        size={size}
                        key={keyBase + i}
                    />
                );
            }
            break;
    }

    return cells_;
}
