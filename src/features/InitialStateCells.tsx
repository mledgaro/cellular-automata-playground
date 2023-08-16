import { Box, Paper } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { toggleInitStateCell } from "src/app/slices/initState";

export function CellsSet() {
    //
    const initState = useAppSelector((state) => state.initState.value);

    const dispatch = useAppDispatch();

    return (
        <div className="cap-component-container cells-container">
            {initState.map((e, i) => (
                <Cell
                    key={i}
                    alive={e}
                    toggle={() => dispatch(toggleInitStateCell(i))}
                />
            ))}
        </div>
    );
}

function Cell({ alive, toggle }: { alive: boolean; toggle: () => void }) {
    //
    const classes = `cap-cell ${alive ? "on" : "off"}`;

    return <Box className={classes} onClick={toggle} />;
}
