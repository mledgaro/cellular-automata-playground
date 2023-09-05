//
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import React, { MouseEvent, useEffect, useRef } from "react";
import { useAppSelector } from "src/app/hooks";
import { selectNumCells } from "src/app/slices/numCells";
import CanvasCntrl from "src/ts/CanvasCntrl";
import Button from "src/components/Button";

export default function Canvas({
    cellsState,
    cellSize,
    clickHandler,
}: {
    cellsState: boolean[][];
    cellSize: number;
    clickHandler: (row: number, col: number) => void;
}) {
    //
    const numCells = useAppSelector(selectNumCells);

    const canvas = useRef<HTMLCanvasElement>(null);
    const scroll = useRef<HTMLDivElement>(null);
    const canvasCntrl = useRef<CanvasCntrl>();

    const clickHandler_ = (evt: MouseEvent) => {
        let r, c;
        r = Math.floor(
            (evt.clientY -
                (canvas.current?.offsetTop ?? 0) +
                scroll.current!.scrollTop +
                window.scrollY) /
                cellSize
        );
        c = Math.floor(
            (evt.clientX -
                (canvas.current?.offsetLeft ?? 0) +
                scroll.current!.scrollLeft +
                window.scrollX) /
                cellSize
        );
        clickHandler(r, c);
    };

    // initialize
    useEffect(() => {
        canvasCntrl.current = new CanvasCntrl(
            canvas.current,
            64,
            numCells,
            // 512,
            // 512,
            cellSize
        );
        canvasCntrl.current.clear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // state change
    useEffect(() => {
        canvasCntrl.current?.paintScene(cellsState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellsState]);

    // zoom change
    useEffect(() => {
        canvasCntrl.current!.cellSize = cellSize;
        canvasCntrl.current?.paintScene(cellsState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    return (
        <Box
            ref={scroll}
            className="max-w-[95vw] max-h-[65vh] w-fit mx-auto overflow-auto relative-"
            onClick={clickHandler_}
        >
            <canvas ref={canvas} />
            {/* <Button
                className="absolute top-2 right-2 min-w-fit w-fit opacity-25 hover:opacity-75 bg-tertiary hover:bg-primary hover:text-secondary"
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                size="lg"
                onClick={() =>
                    canvasCntrl.current?.saveScene("cellular_automaton")
                }
            /> */}
        </Box>
    );
}
