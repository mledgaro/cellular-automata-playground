//
import React, { useCallback, useEffect } from "react";

import { Box } from "@mui/material";

import { useAppDispatch, useAppSelector, useBoolArr } from "src/app/hooks";

import { selectCellsNbhds, setCellsNbhds } from "src/app/slices/cellsNbhds";

import { boolArray } from "src/ts/Utils";
import { selectNumCells } from "src/app/slices/numCells";
import { selectNbhdWidth } from "src/app/slices/nbhdWidth";
import { selectNbhdType } from "src/app/slices/nbhdType";
import { selectMainCell } from "src/app/slices/mainCell";

export default function NbhdsMap() {
    //

    const numCells = useAppSelector(selectNumCells);
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const width = useAppSelector(selectNbhdWidth);
    const type = useAppSelector(selectNbhdType);
    const mainCell = useAppSelector(selectMainCell);

    const cells = useBoolArr(boolArray(numCells, false));

    const dispatch = useAppDispatch();

    const highlight = useCallback(
        (idx: number) => {
            //
            let highCells = Array(numCells).fill(false);
            cellsNbhds[idx].forEach(
                (neighboor) => (highCells[neighboor] = true)
            );
            cells.set(highCells);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cellsNbhds]
    );

    useEffect(() => {
        dispatch(
            setCellsNbhds({
                numCells: numCells,
                width: width,
                type: type,
                mainCell: mainCell,
            })
        );
    }, [numCells, width, type, mainCell]);

    return (
        <Box className="cap-component-container cells-container">
            {cells.get.map((e, i) => (
                <Box
                    key={i}
                    className={`cap-cell ${e ? "on" : "off"}`}
                    onMouseOver={() => highlight(i)}
                />
            ))}
        </Box>
    );
}
