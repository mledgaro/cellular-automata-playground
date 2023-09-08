//
import {
    faBorderAll,
    faBorderNone,
    faCameraRetro,
    faGlobe,
    faLocationDot,
    faMagnifyingGlass,
    faVial,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Grid } from "@mui/material";
import React, { MouseEvent, useEffect, useRef } from "react";
import { StateObjHook, useAppSelector, useStateObj } from "src/app/hooks";
import { selectSceneSize } from "src/app/slices/sceneSize";
import CanvasCntrl from "src/ts/CanvasCntrl";
import { IconButton, MiniButton, StyledButton } from "src/components/Button";
import { VerticalSlider } from "src/components/Slider";
import Label, { LabelButton } from "src/components/Label";
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
    const sliderMarks = useStateObj([{ value: 10, label: "mid" }]);

    const container = useRef<HTMLDivElement>(null);
    const scroll = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
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

    useEffect(() => {
        const vfit = Math.floor(
            container.current!.clientHeight / sceneSize.rows
        );
        const hfit = Math.floor(
            (container.current!.clientWidth * 0.94) / sceneSize.cols
        );
        sliderMarks.set([
            {
                value: vfit,
                label: "v",
            },
            {
                value: hfit,
                label: "h",
            },
        ]);
        cellSize.set(Math.min(vfit, hfit));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [container.current?.clientHeight, container.current?.clientWidth]);

    return (
        <Grid
            container
            className="w-screen h-[65vh]"
            justifyContent="space-evenly"
        >
            <Grid
                item
                xs={8}
                sm={9}
                md={10}
                className="flex items-center justify-center h-full"
                ref={container}
            >
                <Box
                    ref={scroll}
                    className="max-w-[95%] max-h-full w-fit overflow-auto"
                    onMouseMove={cursor}
                    onClick={() =>
                        clickHandler(cursorPos.get.r, cursorPos.get.c)
                    }
                >
                    <canvas ref={canvas} />
                </Box>
            </Grid>

            <Grid item xs={4} sm={3} md={2} lg="auto">
                <Controllers
                    cellSize={cellSize}
                    pos={cursorPos.get}
                    showGrid={showGrid}
                    screenshot={() =>
                        canvasCntrl.current?.saveScene("cellular_automaton")
                    }
                    sliderMarks={sliderMarks.get}
                />
            </Grid>
        </Grid>
    );
}

function Controllers({
    cellSize,
    pos,
    showGrid,
    screenshot,
    className = "",
    sliderMarks = [],
}: {
    cellSize: StateObjHook<number>;
    pos: { r: number; c: number };
    showGrid: StateObjHook<boolean>;
    screenshot: () => void;
    className?: string;
    sliderMarks?: { value: number; label: string }[];
}) {
    const sceneSize = useAppSelector(selectSceneSize);

    const editSceneModal = useStateObj(false);

    return (
        <Box className="flex flex-col h-full items-center justify-center space-y-2">
            {/* <StyledButton variant="contained" className="p-1"> */}
            <LabelButton
                icon={faGlobe}
                tooltipLabel="World settings"
                content={`${sceneSize.rows}x${sceneSize.cols}`}
                size="sm"
                onClick={() => editSceneModal.set(true)}
            />
            {/* </StyledButton> */}

            <Label
                icon={faLocationDot}
                tooltipLabel="Current coordinates"
                content={
                    <Box className="flex justify-center">{`(${pos.r + 1}, ${
                        pos.c + 1
                    })`}</Box>
                }
                size="sm"
                className="w-[6rem]"
            />

            <VerticalSlider
                icon={faMagnifyingGlass}
                tooltipLabel="Zoom"
                min={cellSizeVal.minVal}
                max={cellSizeVal.maxVal}
                defaultValue={cellSizeVal.defaultVal}
                state={cellSize}
                marks={sliderMarks}
            />

            <IconButton
                tooltipLabel={`${showGrid.get ? "Hide" : "Show"} grid`}
                icon={showGrid.get ? faBorderNone : faBorderAll}
                iconSize="xl"
                onClick={() => showGrid.set(!showGrid.get)}
            />
            <IconButton
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                iconSize="xl"
                onClick={screenshot}
            />
            <SceneSettingsModal
                show={editSceneModal.get}
                hide={() => editSceneModal.set(false)}
            />
        </Box>
    );
}
