import React, {
    UIEvent,
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
} from "@fortawesome/free-solid-svg-icons";

import { selectNumCells } from "src/app/slices/numCells";

import { StateObjHook, useAppSelector, useStateObj } from "src/app/hooks";
import { StatusHook, useStatus } from "src/app/hooks/status";

import Button from "src/components/Button";
import { IconSlider } from "src/components/Slider";

import CanvasCntrl from "src/ts/CanvasCntrl";

const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 600 };
const cellSizeVal = { minVal: 1, maxVal: 20, defaultVal: 8 };

const CanvasCntrlCtx = createContext<
    MutableRefObject<CanvasCntrl | undefined> | undefined
>(undefined);
const StatusCtx = createContext<StatusHook | undefined>(undefined);
const TimerCtx = createContext<MutableRefObject<number> | null>(null);
const RefreshRateCtx = createContext<StateObjHook<number> | undefined>(
    undefined
);
const CellSizeCtx = createContext<StateObjHook<number> | undefined>(undefined);

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
    const refreshRate = useStateObj<number>(refreshRateVal.defaultVal);
    const cellSize = useStateObj<number>(cellSizeVal.defaultVal);

    const timer = useRef<number>(0);
    const canvas = useRef<HTMLCanvasElement>(null);
    const scroll = useRef<HTMLDivElement>(null);
    const canvasCntrl = useRef<CanvasCntrl>();

    const onclick = (evt: MouseEvent) => {
        canvasCntrl.current?.toggleCellAtCoords(evt.clientX, evt.clientY);
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
            clearInterval(timer?.current);
            // canvasCntrl.current?.repaint();
            timer.current = window.setInterval(
                next,
                1000 - refreshRate.get,
                canvasCntrl.current
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshRate]);

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
                onClick={onclick}
                onScroll={() => {
                    canvasCntrl.current!.scrollX = scroll.current!.scrollLeft;
                    canvasCntrl.current!.scrollY = scroll.current!.scrollTop;
                }}
            >
                <canvas ref={canvas} />
            </Box>
            <CanvasCntrlCtx.Provider value={canvasCntrl}>
                <StatusCtx.Provider value={status}>
                    <TimerCtx.Provider value={timer}>
                        <RefreshRateCtx.Provider value={refreshRate}>
                            <CellSizeCtx.Provider value={cellSize}>
                                <Controls init={init} next={next} />
                            </CellSizeCtx.Provider>
                        </RefreshRateCtx.Provider>
                    </TimerCtx.Provider>
                </StatusCtx.Provider>
            </CanvasCntrlCtx.Provider>
        </Box>
    );
}

function Controls({
    init,
    next,
}: {
    init: (canvasCntrl: CanvasCntrl | undefined) => void;
    next: (canvasCntrl: CanvasCntrl | undefined) => void;
}) {
    const speed = useContext(RefreshRateCtx);
    const zoom = useContext(CellSizeCtx);
    return (
        <Grid
            container
            alignItems="center"
            justifyContent="space-evenly"
            className=""
        >
            <Grid item md="auto">
                <Box className="w-fit mx-auto space-x-2">
                    <RunBtn init={init} next={next} />
                    <NextBtn init={init} next={next} />
                    <StopBtn />
                    <ScreenshotBtn />
                </Box>
            </Grid>
            <Grid item md={3}>
                <IconSlider
                    icon={faGaugeHigh}
                    tooltipLabel="Speed"
                    state={speed}
                    defaultVal={refreshRateVal.defaultVal}
                    minVal={refreshRateVal.minVal}
                    maxVal={refreshRateVal.maxVal}
                />
            </Grid>
            <Grid item md={3}>
                <IconSlider
                    icon={faMagnifyingGlass}
                    tooltipLabel="Zoom"
                    state={zoom}
                    defaultVal={cellSizeVal.defaultVal}
                    minVal={cellSizeVal.minVal}
                    maxVal={cellSizeVal.maxVal}
                />
            </Grid>
        </Grid>
    );
}

function RunBtn({
    init,
    next,
}: {
    init: (canvasCntrl: CanvasCntrl | undefined) => void;
    next: (canvasCntrl: CanvasCntrl | undefined) => void;
}) {
    //
    const status = useContext(StatusCtx);
    const timer = useContext(TimerCtx);
    const refreshRate = useContext(RefreshRateCtx);
    const canvasCntrl = useContext(CanvasCntrlCtx);

    return (
        <Button
            tooltipLabel={status?.running ? "Pause" : "Run"}
            icon={status?.running ? faPause : faPlay}
            size="xl"
            onClick={() => {
                if (!status!.running) {
                    if (status!.stopped) {
                        init(canvasCntrl?.current);
                    }
                    timer!.current = window.setInterval(
                        next,
                        1000 - refreshRate!.get,
                        canvasCntrl?.current
                    );
                    status?.run();
                } else {
                    window.clearInterval(timer!.current);
                    status?.pause();
                }
            }}
        />
    );
}

function NextBtn({
    init,
    next,
}: {
    init: (canvasCntrl: CanvasCntrl | undefined) => void;
    next: (canvasCntrl: CanvasCntrl | undefined) => void;
}) {
    //
    const status = useContext(StatusCtx);
    const canvasCntrl = useContext(CanvasCntrlCtx);

    return (
        <Button
            tooltipLabel="Next"
            icon={faForwardStep}
            size="xl"
            onClick={() => {
                if (status!.stopped) {
                    init(canvasCntrl?.current);
                    status!.pause();
                } else if (status!.paused) {
                    next(canvasCntrl?.current);
                }
            }}
            disabled={status!.running}
        />
    );
}

function StopBtn() {
    //
    const status = useContext(StatusCtx);
    const timer = useContext(TimerCtx);
    const canvasCntrl = useContext(CanvasCntrlCtx);

    return (
        <Button
            tooltipLabel="Stop"
            icon={faStop}
            size="xl"
            onClick={() => {
                window.clearInterval(timer!.current);
                canvasCntrl?.current?.clear();
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
