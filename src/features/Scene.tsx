import React, {
    MouseEvent,
    createContext,
    useContext,
    useEffect,
    useRef,
} from "react";

import { Box, Fade, Grid } from "@mui/material";
import {
    faCameraRetro,
    faForwardStep,
    faGaugeHigh,
    faHeart,
    faMagnifyingGlass,
    faPause,
    faPlay,
    faStop,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

import { selectNumCells } from "src/app/slices/numCells";

import { StateObjHook, useAppSelector, useStateObj } from "src/app/hooks";
import { StatusHook, useStatus } from "src/app/hooks/status";

import Button, { StyledTooltip } from "src/components/Button";
import { IconSlider } from "src/components/Slider";

import CanvasCntrl from "src/ts/CanvasCntrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 600 };
const cellSizeVal = { minVal: 1, maxVal: 20, defaultVal: 8 };

const StatusCtx = createContext<StatusHook | undefined>(undefined);

const bufferSize = 64;

export default function Scene({
    init,
    next,
    state,
}: {
    init: (canvasCntrl: CanvasCntrl | undefined) => void;
    next: (canvasCntrl: CanvasCntrl | undefined) => void;
    state?: boolean[][];
}) {
    //
    const numCells = useAppSelector(selectNumCells);

    const status = useStatus();

    const refreshRate = useStateObj(refreshRateVal.defaultVal);
    const cellSize = useStateObj(cellSizeVal.defaultVal);

    const iterCount = useStateObj(0);
    const liveCellsCount = useStateObj(0);

    const canvas = useRef<HTMLCanvasElement>(null);
    const scroll = useRef<HTMLDivElement>(null);
    const canvasCntrl = useRef<CanvasCntrl>();

    const toggleHandler = (evt: MouseEvent) => {
        canvasCntrl.current?.toggleCellAtCoords(evt.clientX, evt.clientY);
    };

    const scrollHandler = () => {
        canvasCntrl.current!.scrollX = scroll.current!.scrollLeft;
        canvasCntrl.current!.scrollY = scroll.current!.scrollTop;
    };

    const next_ = () => {
        next(canvasCntrl?.current);
        iterCount.set(iterCount.get + 1);
        liveCellsCount.set(
            canvasCntrl?.current?.buffer.reduce(
                (acc, curr) =>
                    acc +
                    curr.reduce((acc_, curr_) => acc_ + (curr_ ? 1 : 0), 0),
                0
            ) ?? 0
        );
    };

    useEffect(() => {
        canvasCntrl.current = new CanvasCntrl(
            canvas.current,
            bufferSize,
            numCells,
            // 512,
            // 512,
            cellSize.get
        );
        canvasCntrl.current.clear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (status.running) {
            window.setTimeout(next_, 1000 - refreshRate.get);
        }
    });

    useEffect(() => {
        canvasCntrl.current?.paintScene(state ?? []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    useEffect(() => {
        if (status.prev.stopped) {
            init(canvasCntrl?.current);
            // iterCount?.set(0);
        } else if (status.stopped) {
            canvasCntrl?.current?.clear();
            iterCount.set(0);
            liveCellsCount.set(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.get]);

    useEffect(() => {
        if (canvasCntrl.current) {
            canvasCntrl.current!.cellSize = cellSize.get;
        }
        canvasCntrl.current?.repaint();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    return (
        <StatusCtx.Provider value={status}>
            <Box className="space-y-1.5">
                <Box
                    ref={scroll}
                    className="max-w-[95vw] max-h-[65vh] w-fit mx-auto overflow-auto"
                    onClick={toggleHandler}
                    onScroll={scrollHandler}
                >
                    <canvas ref={canvas} />
                </Box>

                <Controls
                    speedState={refreshRate}
                    zoomState={cellSize}
                    next={next_}
                    screenshot={() =>
                        canvasCntrl?.current?.saveScene("cellular_automaton")
                    }
                />
                <Info
                    iterCount={iterCount.get}
                    liveCellsCount={liveCellsCount.get}
                />
            </Box>
        </StatusCtx.Provider>
    );
}

function Controls({
    speedState,
    zoomState,
    next,
    screenshot,
}: {
    speedState: StateObjHook<number>;
    zoomState: StateObjHook<number>;
    next: () => void;
    screenshot: () => void;
}) {
    //
    return (
        <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            columnSpacing={2}
        >
            <Grid item md="auto">
                <Box className="space-x-2">
                    <RunBtn />
                    <NextBtn clickHandler={next} />
                    <StopBtn />
                    <ScreenshotBtn clickHandler={screenshot} />
                </Box>
            </Grid>
            <Grid item md={3}>
                <IconSlider
                    icon={faGaugeHigh}
                    tooltipLabel="Speed"
                    state={speedState}
                    defaultVal={refreshRateVal.defaultVal}
                    minVal={refreshRateVal.minVal}
                    maxVal={refreshRateVal.maxVal}
                />
            </Grid>
            <Grid item md={3}>
                <IconSlider
                    icon={faMagnifyingGlass}
                    tooltipLabel="Zoom"
                    state={zoomState}
                    defaultVal={cellSizeVal.defaultVal}
                    minVal={cellSizeVal.minVal}
                    maxVal={cellSizeVal.maxVal}
                />
            </Grid>
        </Grid>
    );
}

function RunBtn() {
    //
    const status = useContext(StatusCtx);

    return (
        <Button
            tooltipLabel={status?.running ? "Pause" : "Run"}
            icon={status?.running ? faPause : faPlay}
            size="xl"
            onClick={() => {
                if (!status!.running) {
                    status?.run();
                } else {
                    status?.pause();
                }
            }}
        />
    );
}

function NextBtn({ clickHandler }: { clickHandler: () => void }) {
    //
    const status = useContext(StatusCtx);

    return (
        <Button
            tooltipLabel="Next"
            icon={faForwardStep}
            size="xl"
            onClick={() => {
                if (status!.stopped) {
                    status!.pause();
                } else if (status!.paused) {
                    clickHandler();
                }
            }}
            disabled={status!.running}
        />
    );
}

function StopBtn() {
    //
    const status = useContext(StatusCtx);

    return (
        <Button
            tooltipLabel="Stop"
            icon={faStop}
            size="xl"
            onClick={() => {
                status!.stop();
            }}
            disabled={status!.stopped}
        />
    );
}

function ScreenshotBtn({ clickHandler }: { clickHandler: () => void }) {
    //
    const status = useContext(StatusCtx);

    return (
        <Button
            tooltipLabel="Screenshot"
            icon={faCameraRetro}
            size="xl"
            onClick={clickHandler}
            disabled={!status!.paused}
        />
    );
}

function Info({
    iterCount,
    liveCellsCount,
}: {
    iterCount: number;
    liveCellsCount: number;
}) {
    //
    return (
        <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            columnSpacing={3}
        >
            <Grid item md={2}>
                <StyledTooltip
                    title="Iterations count"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 500 }}
                    followCursor
                    arrow
                >
                    <Box className="flex flex-row space-x-2 cap-component-container text-2xl w-fit py-2 px-3 mx-auto">
                        <Box>
                            <FontAwesomeIcon icon={faStopwatch} />
                        </Box>
                        <Box>{iterCount}</Box>
                    </Box>
                </StyledTooltip>
            </Grid>
            <Grid item md={2}>
                <StyledTooltip
                    title="Live cell count"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 500 }}
                    followCursor
                    arrow
                >
                    <Box className="flex flex-row space-x-2 cap-component-container text-2xl w-fit py-2 px-3 mx-auto">
                        <Box>
                            <FontAwesomeIcon icon={faHeart} />
                        </Box>
                        <Box>{liveCellsCount}</Box>
                    </Box>
                </StyledTooltip>
            </Grid>
        </Grid>
    );
}
