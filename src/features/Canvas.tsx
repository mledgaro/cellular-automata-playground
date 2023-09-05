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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VerticalSlider } from "src/components/Slider";

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
        r = Math.floor(r / cellSize.get);

        c = evt.clientX;
        c -= cont.current!.offsetLeft;
        c += scroll.current!.scrollLeft;
        c += window.scrollX;
        c = Math.floor(c / cellSize.get);

        clickHandler(r, c);
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
        <Box
            className="flex flex-row justify-evenly w-full h-[60vh] "
            ref={cont}
        >
            <Box className="flex items-center justify-center w-[88%]">
                <Box
                    ref={scroll}
                    className="max-w-full max-h-full w-fit overflow-auto"
                    onClick={clickHandler_}
                >
                    <canvas ref={canvas} />
                </Box>
            </Box>

            <Controllers cellSize={cellSize} />
        </Box>
    );
}

function Controllers({ cellSize }: { cellSize: StateObjHook<number> }) {
    return (
        <Box className="flex flex-col w-fit items-center justify-center space-y-3">
            <VerticalSlider
                icon={faMagnifyingGlass}
                tooltipLabel="Zoom"
                min={cellSizeVal.minVal}
                max={cellSizeVal.maxVal}
                defaultVal={cellSizeVal.defaultVal}
                state={cellSize}
            />

            <Box className="flex flex-row space-x-2 cap-component-container text-lg w-fit py-2 px-3 items-center">
                <Box>
                    <FontAwesomeIcon icon={faLocationDot} size="xl" />
                </Box>
                <Box className="flex flex-col">
                    <Box>{`r ${9999}`}</Box>
                    <Box>{`c ${9999}`}</Box>
                </Box>
            </Box>
            <Button
                className="min-w-fit w-fit"
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                size="xl"
                // onClick={() =>
                //     canvasCntrl.current?.saveScene("cellular_automaton")
                // }
            />
            <Button
                className="min-w-fit w-fit"
                tooltipLabel="Settings"
                icon={faGear}
                size="xl"
                // onClick={() => }
            />
        </Box>
    );
}
