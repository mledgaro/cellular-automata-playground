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
    faCubes,
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
    cells,
    init,
    next,
    toggle,
}: {
    cells: boolean[] | boolean[][];
    toggle: (
        canvasCntrl: CanvasCntrl | undefined,
        r: number,
        c: number
    ) => void;
    init: (canvasCntrl: CanvasCntrl | undefined) => void;
    next: (canvasCntrl: CanvasCntrl | undefined) => boolean[][];
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
        if (status.stopped) {
            let r, c;
            r = Math.floor(
                (evt.clientY -
                    (canvas.current?.offsetTop ?? 0) +
                    scroll.current!.scrollTop +
                    window.scrollY) /
                    cellSize.get
            );
            c = Math.floor(
                (evt.clientX -
                    (canvas.current?.offsetLeft ?? 0) +
                    scroll.current!.scrollLeft +
                    window.scrollX) /
                    cellSize.get
            );
            toggle(canvasCntrl?.current, r, c);
            console.log("toggle at ", r, c);
        }
    };

    const next_ = () => {
        const st = next(canvasCntrl.current);
        iterCount.set(iterCount.get + 1);
        liveCellsCount.set(
            st.reduce(
                (acc, curr) =>
                    acc +
                    curr.reduce((acc_, curr_) => acc_ + (curr_ ? 1 : 0), 0),
                0
            ) ?? 0
        );
    };

    // initialize
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

    // every render
    useEffect(() => {
        if (status.running) {
            window.setTimeout(next_, 1000 - refreshRate.get);
        }
    });

    // state change
    useEffect(() => {
        // if (typeof cells[0] === "boolean") {
        //     canvasCntrl.current?.paintRow(0, cells as boolean[]);
        // } else {
        // canvasCntrl.current?.paintScene(cells as boolean[][]);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log("cells changed");
    }, [cells]);

    // status change
    useEffect(() => {
        if (status.prev.stopped) {
            init(canvasCntrl.current);
            iterCount.set(0);
        } else if (status.stopped) {
            canvasCntrl.current!.clear();
            iterCount.set(0);
            liveCellsCount.set(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.get]);

    // zoom change
    useEffect(() => {
        if (canvasCntrl.current) {
            canvasCntrl.current!.cellSize = cellSize.get;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    return (
        <StatusCtx.Provider value={status}>
            <Box className="space-y-1.5">
                <Box
                    ref={scroll}
                    className="max-w-[95vw] max-h-[65vh] w-fit mx-auto overflow-auto"
                    onClick={toggleHandler}
                >
                    <canvas ref={canvas} />
                </Box>
                <Box className="flex justify-center">
                    <Button
                        tooltipLabel=""
                        icon={faCubes}
                        size="2x"
                        onClick={() => {
                            canvasCntrl.current!.clear();
                            canvasCntrl.current!.paintScene(
                                cells as boolean[][]
                            );
                            console.log("test");
                        }}
                    />
                </Box>
                <Info
                    iterCount={iterCount.get}
                    liveCellsCount={liveCellsCount.get}
                />
                <Controls
                    speedState={refreshRate}
                    zoomState={cellSize}
                    next={next_}
                    screenshot={() =>
                        canvasCntrl.current?.saveScene("cellular_automaton")
                    }
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
