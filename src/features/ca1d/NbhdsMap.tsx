//
import React, { useCallback } from "react";

import { Box } from "@mui/material";

import { useAppSelector, useBoolArr } from "src/app/hooks";

import { selectCellsNbhds } from "src/app/slices/cellsNbhds";

import { boolArray } from "src/ts/Utils";
import { selectNumCells } from "src/app/slices/numCells";

export default function NbhdsMap() {
    //

    const numCells = useAppSelector(selectNumCells);
    const cellsNbhds = useAppSelector(selectCellsNbhds);

    const cells = useBoolArr(boolArray(numCells, false));

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
