//
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Ellipses, IconCell, SelectedCell } from "./Cells";
import { setMainCell } from "src/app/slices/mainCell";
import { Box } from "@mui/material";

export default function MainCellSelector() {
    //

    const width = useAppSelector((state) => state.nbhdWidth.value);
    const type = useAppSelector((state) => state.nbhdType.value);
    const mainCell = useAppSelector((state) => state.mainCell.value);

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

    useEffect(() => {
        //
        if (mainCell === width) {
            dispatch(setMainCell(mainCell - 1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    return (
        <Box className="bg-jet text-sunglow rounded-md w-max p-2 space-x-1.5">
            <Ellipses
                size="xs"
                cells={cells}
                mainCell={mainCell}
                nbhdType={type}
            />
        </Box>
    );
}
