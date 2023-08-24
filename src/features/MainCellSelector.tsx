//
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Ellipses, IconCell, SelectedCell } from "./Cells";
import { selectMainCell, setMainCell } from "src/app/slices/mainCell";
import { Box } from "@mui/material";
import { selectNbhdWidth } from "src/app/slices/nbhdWidth";
import { selectNbhdType } from "src/app/slices/nbhdType";

export function MainCellSelector1D({ className = "" }: { className?: string }) {
    //

    const width = useAppSelector(selectNbhdWidth);
    const type = useAppSelector(selectNbhdType);
    const mainCell = useAppSelector(selectMainCell);

    const dispatch = useAppDispatch();

    const set = (val: number) => dispatch(setMainCell(val));

    let cells = [];

    for (let i = 0; i < width; i++) {
        cells.push(<IconCell onClick={() => set(i)} size="xl" />);
    }

    if (mainCell !== -1) {
        cells.splice(
            mainCell,
            1,
            <SelectedCell size={"2xl"} onClick={() => set(-1)} />
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

    return (
        <Box
            className={`cap-component-container w-fit p-2 space-x-1.5 ${className}`}
        >
            <Ellipses
                size="xs"
                cells={cells}
                mainCell={mainCell}
                nbhdType={type}
            />
        </Box>
    );
}
