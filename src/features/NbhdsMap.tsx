import { Box, Paper } from "@mui/material";
import React, { useCallback } from "react";
import { BoolArrHook, useAppSelector, useBoolArrState } from "src/app/hooks";
import { boolArray } from "src/ts/Utils";

export default function NbhdsMap() {
    //

    const numCells = useAppSelector((state) => state.numCells.value);

    const highlightedCells = useBoolArrState(boolArray(numCells, false));

    return (
        <div className="cap-component-container cells-container">
            {highlightedCells.get.map((e, i) => (
                <HighlightCell
                    key={i}
                    index={i}
                    highlightedCells={highlightedCells}
                />
            ))}
        </div>
    );
}

function HighlightCell({
    index,
    highlightedCells,
}: {
    index: number;
    highlightedCells: BoolArrHook;
}) {
    //

    const numCells = useAppSelector((state) => state.numCells.value);
    const cellsNbhds = useAppSelector((state) => state.cellsNbhds.value);

    const highlight = useCallback(() => {
        //
        let nArr = Array(numCells).fill(false);
        cellsNbhds[index].forEach((e) => (nArr[e] = true));
        highlightedCells.set(nArr);
    }, [cellsNbhds, highlightedCells, index, numCells]);

    const classes = `cap-cell ${highlightedCells.get[index] ? "on" : "off"}`;

    // return <Paper className={classes} onMouseOver={highlight} />;
    return <Box className={classes} onMouseOver={highlight} />;
}
