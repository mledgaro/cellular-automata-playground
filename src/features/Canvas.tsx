//
import {
    faCameraRetro,
    faGear,
    faLocationDot,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import React, { MouseEvent, useEffect, useRef } from "react";
import { StateObjHook, useAppSelector, useStateObj } from "src/app/hooks";
import { selectSceneSize } from "src/app/slices/sceneSize";
import CanvasCntrl from "src/ts/CanvasCntrl";
import Button from "src/components/Button";
import { VerticalSlider } from "src/components/Slider";
import Label from "src/components/Label";

const cellSizeVal = { minVal: 1, maxVal: 20, defaultVal: 8 };
export default function Canvas({
    cellsState,
    clickHandler,
}: {
    cellsState: boolean[][];
    clickHandler: (row: number, col: number) => void;
}) {
    //
    const sceneSize = useAppSelector(selectSceneSize);

    const cellSize = useStateObj(cellSizeVal.defaultVal);
    const cursorPos = useStateObj({ r: 0, c: 0 });

    const canvas = useRef<HTMLCanvasElement>(null);
    const scroll = useRef<HTMLDivElement>(null);
    const canvasCntrl = useRef<CanvasCntrl>();

    const cursor = (evt: MouseEvent) => {
        let r, c;

        r = evt.pageY;
        r -= scroll.current!.offsetTop;
        r += scroll.current!.scrollTop;
        r = Math.floor(r / cellSize.get);

        c = evt.pageX;
        c -= scroll.current!.offsetLeft;
        c += scroll.current!.scrollLeft;
        c = Math.floor(c / cellSize.get);

        cursorPos.set({ r: r, c: c });
    };

    // initialize
    useEffect(() => {
        canvasCntrl.current = new CanvasCntrl(
            canvas.current,
            sceneSize.rows,
            sceneSize.cols,
            cellSize.get
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
        canvasCntrl.current!.cellSize = cellSize.get;
        canvasCntrl.current?.paintScene(cellsState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize.get]);

    return (
        <Box className="flex flex-row justify-evenly w-full h-[60vh] ">
            <Box className="flex items-center justify-center w-[80%]">
                <Box
                    ref={scroll}
                    className="max-w-full max-h-full w-fit overflow-auto"
                    onMouseMove={cursor}
                    onClick={() =>
                        clickHandler(cursorPos.get.r, cursorPos.get.c)
                    }
                >
                    <canvas ref={canvas} />
                </Box>
            </Box>

            <Controllers cellSize={cellSize} pos={cursorPos.get} />
        </Box>
    );
}

function Controllers({
    cellSize,
    pos,
}: {
    cellSize: StateObjHook<number>;
    pos: { r: number; c: number };
}) {
    return (
        <Box className="flex flex-col w-[15%] items-center justify-center space-y-3">
            <VerticalSlider
                icon={faMagnifyingGlass}
                tooltipLabel="Zoom"
                min={cellSizeVal.minVal}
                max={cellSizeVal.maxVal}
                defaultVal={cellSizeVal.defaultVal}
                state={cellSize}
            />
            <Box className="flex justify-center">
                <Label
                    icon={faLocationDot}
                    tooltipLabel="Current coordinates"
                    info={`(${pos.r}, ${pos.c})`}
                    size="[0.5rem]"
                />
            </Box>
            <Button
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                size="xl"
                // onClick={() =>
                //     canvasCntrl.current?.saveScene("cellular_automaton")
                // }
            />
            <Button
                tooltipLabel="Settings"
                icon={faGear}
                size="xl"
                // onClick={() => }
            />
        </Box>
    );
}
