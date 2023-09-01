import React, {
    MouseEvent,
    MutableRefObject,
    createContext,
    useContext,
    useEffect,
    useRef,
} from "react";

import { Box, Grid } from "@mui/material";
import {
    faCameraRetro,
    faForwardStep,
    faGaugeHigh,
    faMagnifyingGlass,
    faPause,
    faPlay,
    faStop,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

import { selectNumCells } from "src/app/slices/numCells";

import { StateObjHook, useAppSelector, useStateObj } from "src/app/hooks";
import { StatusHook, useStatus } from "src/app/hooks/status";

import Button from "src/components/Button";
import { IconSlider } from "src/components/Slider";

import CanvasCntrl from "src/ts/CanvasCntrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 600 };
const cellSizeVal = { minVal: 1, maxVal: 20, defaultVal: 8 };

const CanvasCntrlCtx = createContext<
    MutableRefObject<CanvasCntrl | undefined> | undefined
>(undefined);
const StatusCtx = createContext<StatusHook | undefined>(undefined);
const RefreshRateCtx = createContext<StateObjHook<number> | undefined>(
    undefined
);
const CellSizeCtx = createContext<StateObjHook<number> | undefined>(undefined);
const IterCountCtx = createContext<StateObjHook<number> | null>(null);

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
        // iterCount!.current++;
        iterCount?.set(iterCount.get + 1);
    };

    useEffect(() => {
        if (status.running) {
            window.setTimeout(next_, 1000 - refreshRate.get);
        }
    });

    useEffect(() => {
        if (status.prev.stopped) {
            init(canvasCntrl?.current);
            // iterCount?.set(0);
        } else if (status.stopped) {
            canvasCntrl?.current?.clear();
            iterCount?.set(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.get]);

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
        if (canvasCntrl.current) {
            canvasCntrl.current!.cellSize = cellSize.get;
        }
        canvasCntrl.current?.repaint();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    useEffect(() => {
        canvasCntrl.current?.paintScene(state ?? []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <Box className="space-y-2">
            <Box
                ref={scroll}
                className="max-w-[95vw] max-h-[65vh] w-fit mx-auto overflow-auto"
                onClick={toggleHandler}
                onScroll={scrollHandler}
            >
                <canvas ref={canvas} />
            </Box>
            <CanvasCntrlCtx.Provider value={canvasCntrl}>
                <StatusCtx.Provider value={status}>
                    <RefreshRateCtx.Provider value={refreshRate}>
                        <CellSizeCtx.Provider value={cellSize}>
                            <IterCountCtx.Provider value={iterCount}>
                                <Controls next={next_} />
                            </IterCountCtx.Provider>
                        </CellSizeCtx.Provider>
                    </RefreshRateCtx.Provider>
                </StatusCtx.Provider>
            </CanvasCntrlCtx.Provider>
        </Box>
    );
}

function Controls({ next }: { next: () => void }) {
    const speed = useContext(RefreshRateCtx);
    const zoom = useContext(CellSizeCtx);

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="space-evenly"
            className=""
            rowSpacing={2}
            columnSpacing={2}
        >
            <Grid item md={6}>
                <Box className="w-fit mx-auto space-x-2">
                    <RunBtn />
                    <NextBtn next={next} />
                    <StopBtn />
                    <ScreenshotBtn />
                </Box>
            </Grid>
            <Grid item md={6} alignItems="center">
                <Box className="flex flex-row space-x-2 cap-component-container text-2xl w-fit py-2 px-3 mx-auto">
                    <Box>
                        <FontAwesomeIcon icon={faStopwatch} />
                    </Box>
                    <IterCount />
                </Box>
            </Grid>
            <Grid item md={6}>
                <Box className="w-[70%] mx-auto">
                    <IconSlider
                        icon={faGaugeHigh}
                        tooltipLabel="Speed"
                        state={speed}
                        defaultVal={refreshRateVal.defaultVal}
                        minVal={refreshRateVal.minVal}
                        maxVal={refreshRateVal.maxVal}
                    />
                </Box>
            </Grid>
            <Grid item md={6}>
                <Box className="w-[70%] mx-auto">
                    <IconSlider
                        icon={faMagnifyingGlass}
                        tooltipLabel="Zoom"
                        state={zoom}
                        defaultVal={cellSizeVal.defaultVal}
                        minVal={cellSizeVal.minVal}
                        maxVal={cellSizeVal.maxVal}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

function IterCount() {
    const iterCount = useContext(IterCountCtx);
    return <Box>{iterCount?.get ?? 0}</Box>;
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

function NextBtn({ next }: { next: () => void }) {
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
                    next();
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

function ScreenshotBtn() {
    //
    const status = useContext(StatusCtx);
    const canvasCntrl = useContext(CanvasCntrlCtx);

    return (
        <Button
            tooltipLabel="Screenshot"
            icon={faCameraRetro}
            size="xl"
            onClick={() =>
                canvasCntrl?.current?.saveScene("cellular_automaton")
            }
            disabled={!status!.paused}
        />
    );
}
