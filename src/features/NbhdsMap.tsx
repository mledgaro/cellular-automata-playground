import { Paper } from "@mui/material";
import React, { useCallback } from "react";
import { BoolArrHook, useAppSelector, useBoolArrState } from "src/app/hooks";
import { boolArray } from "src/ts/Utils";

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

    const classes = `inline-block box-border w-4 h-4 mr-2 mb-2 ${
        highlightedCells.get[index] ? "bg-sunglow" : "bg-french-gray"
    }`;

    // return <span className={classes} onMouseOver={highlight} />;
    return <Paper className={classes} onMouseOver={highlight} />;
}

export default function NbhdsMap() {
    //

    const numCells = useAppSelector((state) => state.numCells.value);

    const highlightedCells = useBoolArrState(boolArray(numCells, false));

    return (
        <div className="bg-jet pl-2 pt-2 pb-0 pr-0 rounded-md">
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
