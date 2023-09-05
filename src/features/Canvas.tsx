//
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import React, { MouseEvent, useEffect, useRef } from "react";
import { useAppSelector } from "src/app/hooks";
import { selectSceneSize } from "src/app/slices/sceneSize";
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
    const sceneSize = useAppSelector(selectSceneSize);

    const canvas = useRef<HTMLCanvasElement>(null);
    const cont = useRef<HTMLDivElement>(null);
    const scroll = useRef<HTMLDivElement>(null);
    const canvasCntrl = useRef<CanvasCntrl>();

    const clickHandler_ = (evt: MouseEvent) => {
        let r, c;

        r = evt.clientY;
        r -= cont.current!.offsetTop;
        r += scroll.current!.scrollTop;
        r += window.scrollY;
        r = Math.floor(r / cellSize);

        c = evt.clientX;
        c -= cont.current!.offsetLeft;
        c += scroll.current!.scrollLeft;
        c += window.scrollX;
        c = Math.floor(c / cellSize);

        clickHandler(r, c);
    };

    // initialize
    useEffect(() => {
        canvasCntrl.current = new CanvasCntrl(
            canvas.current,
            sceneSize.rows,
            sceneSize.cols,
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
        <Box className="relative w-fit mx-auto" ref={cont}>
            <Box
                ref={scroll}
                className="max-w-[95vw] max-h-[65vh] w-fit mx-auto overflow-auto static"
                onClick={clickHandler_}
            >
                <canvas ref={canvas} />
            </Box>

            <Button
                className="min-w-fit w-fit opacity-25 hover:opacity-75 bg-tertiary hover:bg-primary hover:text-secondary absolute top-2 left-3"
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                size="lg"
                onClick={() =>
                    canvasCntrl.current?.saveScene("cellular_automaton")
                }
            />
        </Box>
    );
}
