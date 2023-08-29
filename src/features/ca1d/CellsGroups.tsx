//
import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCheck,
    faSquare as faSquareRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
    faEllipsis,
    faSquareMinus,
    faSquarePlus,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";

import { NbhdType, selectNbhdType } from "src/app/slices/nbhdType";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    minVal as nbhdWidthMin,
    maxVal as nbhdWidthMax,
    selectNbhdWidth,
    setNbhdWidth,
} from "src/app/slices/nbhdWidth";
import { intToBoolArray } from "src/ts/Utils";
import { selectMainCell, setMainCell } from "src/app/slices/mainCell";
import { ResizeBtn } from "src/components/Button";

export function Nbhd1dEditor({ className = "" }: { className?: string }) {
    //

    const width = useAppSelector(selectNbhdWidth);
    const type = useAppSelector(selectNbhdType);
    const mainCell = useAppSelector(selectMainCell);

    const dispatch = useAppDispatch();

    const set = (val: number) => dispatch(setMainCell(val));

    let cells = [];

    for (let i = 0; i < width; i++) {
        cells.push(
            <FontAwesomeIcon
                icon={faSquareRegular}
                size="xl"
                onClick={() => set(i)}
            />
        );
    }

    if (mainCell !== -1) {
        cells.splice(
            mainCell,
            1,
            <FontAwesomeIcon
                icon={faSquareCheck}
                size="2xl"
                onClick={() => set(-1)}
            />
        );
    }

    // update main cell if width changes
    useEffect(() => {
        //
        if (mainCell >= width) {
            dispatch(setMainCell(width / 2));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    cells = addEllipses(cells, mainCell, type, "xs");

    return (
        <Box
            className={`cap-component-container w-fit p-2 space-x-4 flex flex-row ${className}`}
        >
            <Box className="space-x-1">{cells}</Box>
            <Box className="flex flex-col justify-center">
                <Box className="space-x-1">
                    <ResizeBtn
                        variant="contained"
                        className=""
                        onClick={() => dispatch(setNbhdWidth(width - 1))}
                        disabled={width <= nbhdWidthMin}
                    >
                        <FontAwesomeIcon icon={faSquareMinus} />
                    </ResizeBtn>
                    <ResizeBtn
                        variant="contained"
                        className=""
                        onClick={() => dispatch(setNbhdWidth(width + 1))}
                        disabled={width >= nbhdWidthMax}
                    >
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </ResizeBtn>
                </Box>
            </Box>
        </Box>
    );
}

export function RulePreview({ index }: { index: number }) {
    //
    const nbhdType = useAppSelector(selectNbhdType);
    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const mainCell = useAppSelector(selectMainCell);

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <FontAwesomeIcon
            key={i}
            icon={e ? faSquareSolid : faSquareRegular}
            size={i === mainCell ? "2xl" : "lg"}
        />
    ));

    cells = addEllipses(cells, mainCell, nbhdType, "xs");

    return (
        <Box className="cap-component-container w-fit p-2 space-x-1.5">
            {cells}
        </Box>
    );
}

function addEllipses(
    cells: JSX.Element[],
    mainCell: number,
    nbhdType: NbhdType,
    size: SizeProp
) {
    //
    let cells_ = [...cells];
    const lastIdx = cells_.length - 1;

    switch (nbhdType) {
        case "adjacent":
            break;
        case "grouped":
            if (mainCell === -1) {
                cells_.splice(
                    0,
                    0,
                    <FontAwesomeIcon icon={faEllipsis} size={size} key={1} />
                );
                cells_.push(
                    <FontAwesomeIcon icon={faEllipsis} size={size} key={2} />
                );
            } else {
                if (mainCell >= 0 && mainCell < lastIdx) {
                    cells_.splice(
                        mainCell + 1,
                        0,
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            size={size}
                            key={1}
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
                            key={2}
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
                    <FontAwesomeIcon icon={faEllipsis} size={size} key={i} />
                );
            }
            break;
    }

    return cells_;
}
