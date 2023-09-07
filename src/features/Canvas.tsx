//
import {
    faBorderAll,
    faBorderNone,
    faCameraRetro,
    faLocationDot,
    faMagnifyingGlass,
    faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import React, { MouseEvent, useEffect, useRef } from "react";
import { StateObjHook, useAppSelector, useStateObj } from "src/app/hooks";
import { selectSceneSize } from "src/app/slices/sceneSize";
import CanvasCntrl from "src/ts/CanvasCntrl";
import Button from "src/components/Button";
import { VerticalSlider } from "src/components/Slider";
import Label from "src/components/Label";
import SceneSettingsModal from "./SceneSettingsModal";

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
    const showGrid = useStateObj(false);

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
        if (showGrid.get) {
            canvasCntrl.current?.drawGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellsState]);

    // zoom change
    useEffect(() => {
        canvasCntrl.current!.cellSize = cellSize.get;
        canvasCntrl.current?.paintScene(cellsState);
        if (showGrid.get) {
            canvasCntrl.current?.drawGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize.get]);

    useEffect(() => {
        if (showGrid.get) {
            canvasCntrl.current?.drawGrid();
        } else {
            canvasCntrl.current?.paintScene(cellsState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showGrid.get]);

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
            <Box className="w-[15%]">
                <Controllers
                    cellSize={cellSize}
                    pos={cursorPos.get}
                    showGrid={showGrid}
                />
            </Box>
        </Box>
    );
}

function Controllers({
    cellSize,
    pos,
    showGrid,
}: {
    cellSize: StateObjHook<number>;
    pos: { r: number; c: number };
    showGrid: StateObjHook<boolean>;
}) {
    const sceneSize = useAppSelector(selectSceneSize);

    const editSceneModal = useStateObj(false);

    return (
        <Box className="flex flex-col w-fit items-center justify-center space-y-2">
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
                    content={`(${pos.r}, ${pos.c})`}
                    size="[0.5rem]"
                />
            </Box>
            <Box className="flex justify-center">
                <Label
                    icon={faRulerCombined}
                    tooltipLabel="Scene size"
                    content={`${sceneSize.rows}x${sceneSize.cols}`}
                    size="[0.5rem]"
                    onClick={() => editSceneModal.set(true)}
                />
            </Box>
            <Button
                tooltipLabel={`${showGrid.get ? "Hide" : "Show"} grid`}
                icon={showGrid.get ? faBorderNone : faBorderAll}
                size="xl"
                onClick={() => showGrid.set(!showGrid.get)}
            />
            <Button
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                size="xl"
                // onClick={() =>
                //     canvasCntrl.current?.saveScene("cellular_automaton")
                // }
            />
            <SceneSettingsModal
                show={editSceneModal.get}
                hide={() => editSceneModal.set(false)}
            />
        </Box>
    );
}
