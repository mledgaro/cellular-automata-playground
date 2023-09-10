import React, { useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import {
    faChevronDown,
    faChevronUp,
    faGears,
} from "@fortawesome/free-solid-svg-icons";

import { selectSceneSize } from "src/app/slices/sceneSize";
import { useAppSelector, useStateObj } from "src/app/hooks";

import CustomTabs from "src/components/Tabs";
import { TooltipButton } from "src/components/Button";
import { useStatus } from "src/app/hooks/status";
import CanvasCntrl from "src/ts/CanvasCntrl";

import FlowControlTools from "./FlowControlTools";
import SpaceEditionTools from "./SpaceEditionTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Canvas from "./Canvas";
import Info from "./Info";

export const cellSizeVal = { minVal: 1, maxVal: 20, defaultVal: 8 };

export default function MainFrame({
    init,
    next,
    stop,
    cellsState,
    canvasOnClick,
    tabs,
    liveCells,
}: {
    init: () => void;
    next: (iteration: number) => void;
    stop: () => void;
    cellsState: boolean[][];
    canvasOnClick: (r: number, c: number) => void;
    tabs: { title: string; content: JSX.Element }[];
    liveCells: number;
}) {
    //
    const sceneSize = useAppSelector(selectSceneSize);

    const cellsSize = useStateObj(cellSizeVal.defaultVal);
    const cursorPos = useStateObj({ r: 0, c: 0 });
    const showGrid = useStateObj(false);
    const sliderMarks = useStateObj([{ value: 10, label: "mid" }]);

    const container = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const canvasCntrl = useRef<CanvasCntrl>();

    const iterations = useStateObj(0);

    const refreshRate = useStateObj(500);
    const stopIterations = useStateObj(0);
    const status = useStatus();

    const init_ = () => {
        init();
        iterations.set(0);
    };

    const next_ = () => {
        next(iterations.get);
        iterations.set(iterations.get + 1);
    };

    const stop_ = () => {
        stop();
        iterations.set(0);
    };

    // initialize
    useEffect(() => {
        canvasCntrl.current = new CanvasCntrl(
            canvas.current,
            sceneSize.rows,
            sceneSize.cols,
            cellsSize.get
        );
        canvasCntrl.current.clear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (status.running && iterations.get === stopIterations.get - 1) {
            status.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [iterations.get]);

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
        cellsSize.set(Math.min(vfit, hfit));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [container.current?.clientHeight, container.current?.clientWidth]);

    // state change
    useEffect(() => {
        canvasCntrl.current!.paintScene(cellsState);
        if (showGrid.get) {
            canvasCntrl.current!.drawGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellsState]);

    // zoom change
    useEffect(() => {
        canvasCntrl.current!.cellSize = cellsSize.get;
        canvasCntrl.current!.paintScene(cellsState);
        if (showGrid.get) {
            canvasCntrl.current!.drawGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellsSize]);

    useEffect(() => {
        if (showGrid.get) {
            canvasCntrl.current!.drawGrid();
        } else {
            canvasCntrl.current!.paintScene(cellsState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showGrid.get]);

    return (
        <Box className="space-y-3">
            <Grid
                container
                className="w-screen h-[70vh]"
                justifyContent="space-evenly"
            >
                <Grid item xs="auto">
                    <SpaceEditionTools
                        cursorPosition={cursorPos.get}
                        cellsSize={cellsSize}
                        showGrid={showGrid}
                        screenshot={() =>
                            canvasCntrl.current?.saveScene("cellular_automaton")
                        }
                        sliderMarks={sliderMarks.get}
                    />
                </Grid>

                <Grid
                    item
                    xs={7}
                    sm={8}
                    md={9}
                    lg={10}
                    className="flex items-center justify-center h-full"
                    ref={container}
                >
                    <Canvas
                        cellsState={cellsState}
                        cellsSize={cellsSize.get}
                        cursorPos={cursorPos}
                        showGrid={showGrid.get}
                        clickHandler={canvasOnClick}
                        canvas={canvas}
                        canvasCntrl={canvasCntrl.current}
                    />
                </Grid>

                <Grid item xs="auto">
                    <FlowControlTools
                        init={init_}
                        next={next_}
                        stop={stop_}
                        refreshRate={refreshRate}
                        status={status}
                    />
                </Grid>
            </Grid>

            <Info
                iterations={iterations.get}
                stopIterations={stopIterations}
                liveCells={liveCells}
            />

            <Settings tabs={tabs} />
        </Box>
    );
}

function Settings({
    tabs,
}: {
    tabs: {
        title: string;
        content: JSX.Element;
    }[];
}) {
    //
    const show = useStateObj(false);

    return (
        <Box className="space-y-2">
            <Box className="w-full flex justify-center">
                <TooltipButton
                    tooltipLabel="Configuration"
                    onClick={() => {
                        show.set(!show.get);
                    }}
                    className="w-[10rem]"
                    content={
                        <Box className="w-full">
                            <FontAwesomeIcon
                                icon={faGears}
                                size="2x"
                                className="float-none"
                            />
                            <FontAwesomeIcon
                                icon={show.get ? faChevronUp : faChevronDown}
                                size="2x"
                                className="float-right"
                            />
                        </Box>
                    }
                />
            </Box>
            {show.get && <SettingsTabs tabs={tabs} />}
        </Box>
    );
}

function SettingsTabs({
    tabs,
}: {
    tabs: {
        title: string;
        content: JSX.Element;
    }[];
}) {
    useEffect(() => {
        window.scroll(0, document.body.scrollHeight);
    });

    return (
        <Box className="pb-6">
            <CustomTabs tabs={tabs} />
        </Box>
    );
}
