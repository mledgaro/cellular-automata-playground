//
import { Box } from "@mui/material";
import React, { LegacyRef, MouseEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { selectCells } from "src/app/slices/mainFrame/cells";
import { selectCellsSize } from "src/app/slices/mainFrame/cellsSize";
import {
    selectCursorPosition,
    setCursorPosition,
} from "src/app/slices/mainFrame/cursorPosition";
import { selectGridVisibility } from "src/app/slices/mainFrame/gridVisibility";
import { selectWorldSize } from "src/app/slices/mainFrame/worldSize";
import CanvasCntrl from "src/ts/CanvasCntrl";

export default function Canvas({
    clickHandler,
    canvas,
    canvasCntrl,
}: {
    clickHandler: (row: number, col: number) => void;
    canvas: LegacyRef<HTMLCanvasElement>;
    canvasCntrl: CanvasCntrl | undefined;
}) {
    //
    const worldSize = useAppSelector(selectWorldSize);
    const cells = useAppSelector(selectCells);
    const cellsSize: number = useAppSelector(selectCellsSize);
    const cursorPos = useAppSelector(selectCursorPosition);
    const gridVisibility = useAppSelector(selectGridVisibility);

    const dispatch = useAppDispatch();

    const scroll = useRef<HTMLDivElement>(null);

    const cursorMoveHandler = (evt: MouseEvent) => {
        let r, c;

        r = evt.pageY;
        r -= scroll.current!.offsetTop;
        r += scroll.current!.scrollTop;
        r = Math.floor(r / cellsSize);

        c = evt.pageX;
        c -= scroll.current!.offsetLeft;
        c += scroll.current!.scrollLeft;
        c = Math.floor(c / cellsSize);

        dispatch(setCursorPosition({ r: r, c: c }));
    };

    const clickHandler_ = () => {
        clickHandler(cursorPos.r, cursorPos.c);
    };

    // zoom change
    useEffect(() => {
        if (canvasCntrl) {
            canvasCntrl!.cellSize = cellsSize;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellsSize]);

    useEffect(() => {
        canvasCntrl?.setSize(worldSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [worldSize]);

    useEffect(() => {
        canvasCntrl?.paintScene(cells);
        if (gridVisibility) {
            canvasCntrl?.drawGrid();
        }
    });

    return (
        <Box
            ref={scroll}
            className="max-w-[95%] max-h-full w-fit overflow-auto border-tertiary border-3 border-solid"
            onMouseMove={cursorMoveHandler}
            onClick={clickHandler_}
        >
            <canvas ref={canvas} />
        </Box>
    );
}
