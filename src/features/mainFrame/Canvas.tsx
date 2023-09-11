//
import { Box } from "@mui/material";
import React, { LegacyRef, MouseEvent, useEffect, useRef } from "react";
import { StateObjHook } from "src/app/hooks";
import CanvasCntrl from "src/ts/CanvasCntrl";

export default function Canvas({
    cellsState,
    cellsSize,
    cursorPos,
    showGrid,
    clickHandler,
    canvas,
    canvasCntrl,
}: {
    cellsState: boolean[][];
    cellsSize: number;
    cursorPos: StateObjHook<{ r: number; c: number }>;
    showGrid: boolean;
    clickHandler: (row: number, col: number) => void;
    canvas: LegacyRef<HTMLCanvasElement>;
    canvasCntrl: CanvasCntrl | undefined;
}) {
    //
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

        cursorPos.set({ r: r, c: c });
    };

    const clickHandler_ = () => {
        clickHandler(cursorPos.get.r, cursorPos.get.c);
    };

    // state change
    useEffect(() => {
        canvasCntrl?.paintScene(cellsState);
        if (showGrid) {
            canvasCntrl?.drawGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellsState]);

    // zoom change
    useEffect(() => {
        if (canvasCntrl) {
            canvasCntrl!.cellSize = cellsSize;
        }
        canvasCntrl?.paintScene(cellsState);
        if (showGrid) {
            canvasCntrl?.drawGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellsSize]);

    useEffect(() => {
        if (showGrid) {
            canvasCntrl?.drawGrid();
        } else {
            canvasCntrl?.paintScene(cellsState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showGrid]);

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
