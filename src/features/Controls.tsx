import React, {
    MutableRefObject,
    createContext,
    useContext,
    useEffect,
    useRef,
} from "react";

import {
    faCameraRetro,
    faForwardStep,
    faGaugeHigh,
    faMagnifyingGlass,
    faPause,
    faPlay,
    faStop,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Fade, Grid } from "@mui/material";

import { StateObjHook, useAppSelector, useStateObj } from "src/app/hooks";

import Button, { StyledTooltip } from "src/components/Button";
import { StyledSlider } from "src/components/Slider";

import { selectCellsNbhds } from "src/app/slices/cellsNbhds";
import { selectRules } from "src/app/slices/rules";
import { selectInitState } from "src/app/slices/initState";

import CellularAutomaton1D from "src/ts/CellularAutomaton1D";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatusHook, useStatus } from "src/app/hooks/status";

const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 600 };
const cellSizeVal = { minVal: 1, maxVal: 20, defaultVal: 8 };

const AutomatonCtx = createContext<CellularAutomaton1D | undefined>(undefined);
const StatusCtx = createContext<StatusHook | undefined>(undefined);
const TimerCtx = createContext<
    MutableRefObject<NodeJS.Timer | undefined> | undefined
>(undefined);
const RefreshRateCtx = createContext<StateObjHook<number> | undefined>(
    undefined
);
const CellSizeCtx = createContext<StateObjHook<number> | undefined>(undefined);

export default function Controls({
    automaton,
}: {
    automaton: CellularAutomaton1D | undefined;
}) {
    //
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);

    const status = useStatus();
    const refreshRate = useStateObj<number>(refreshRateVal.defaultVal);
    const cellSize = useStateObj<number>(cellSizeVal.defaultVal);

    const timer = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (status.running) {
            clearInterval(timer.current);
            automaton?.repaint();
            timer.current = setInterval(() => {
                automaton?.nextState(cellsNbhds, rules);
            }, 1000 - refreshRate.get);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshRate, rules]);

    useEffect(() => {
        if (automaton) {
            automaton!.cellSize = cellSize.get;
        }
        automaton?.repaint();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    return (
        <AutomatonCtx.Provider value={automaton}>
            <StatusCtx.Provider value={status}>
                <TimerCtx.Provider value={timer}>
                    <RefreshRateCtx.Provider value={refreshRate}>
                        <CellSizeCtx.Provider value={cellSize}>
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="space-evenly"
                                className=""
                            >
                                <Grid item md="auto">
                                    <Box className="w-fit mx-auto space-x-2">
                                        <RunBtn />
                                        <NextBtn />
                                        <PauseBtn />
                                        <StopBtn />
                                        <ScreenshotBtn />
                                    </Box>
                                </Grid>
                                <Grid item md={3}>
                                    <SpeedSlider />
                                </Grid>
                                <Grid item md={3}>
                                    <ZoomSlider />
                                </Grid>
                            </Grid>
                        </CellSizeCtx.Provider>
                    </RefreshRateCtx.Provider>
                </TimerCtx.Provider>
            </StatusCtx.Provider>
        </AutomatonCtx.Provider>
    );
}

function RunBtn() {
    //
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);
    const initState = useAppSelector(selectInitState);

    const status = useContext(StatusCtx);
    const automaton = useContext(AutomatonCtx);
    const timer = useContext(TimerCtx);
    const refreshRate = useContext(RefreshRateCtx);

    return (
        <Button
            tooltipLabel="Run"
            icon={faPlay}
            size="xl"
            onClick={() => {
                if (!status!.running) {
                    if (status!.stopped) {
                        automaton!.initState = initState;
                    }
                    timer!.current = setInterval(
                        () => automaton!.nextState(cellsNbhds, rules),
                        1000 - refreshRate!.get
                    );
                    status?.run();
                }
            }}
            disabled={status?.running}
        />
    );
}

function NextBtn() {
    //
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);
    const initState = useAppSelector(selectInitState);

    const status = useContext(StatusCtx);
    const automaton = useContext(AutomatonCtx);

    return (
        <Button
            tooltipLabel="Next"
            icon={faForwardStep}
            size="xl"
            onClick={() => {
                if (status!.stopped) {
                    automaton!.initState = initState;
                    status!.pause();
                } else if (status!.paused) {
                    automaton!.nextState(cellsNbhds, rules);
                }
            }}
            disabled={status!.running}
        />
    );
}

function PauseBtn() {
    //
    const status = useContext(StatusCtx);
    const timer = useContext(TimerCtx);

    return (
        <Button
            tooltipLabel="Pause"
            icon={faPause}
            size="xl"
            onClick={() => {
                clearInterval(timer!.current);
                status!.pause();
            }}
            disabled={!status!.running}
        />
    );
}

function StopBtn() {
    //
    const status = useContext(StatusCtx);
    const automaton = useContext(AutomatonCtx);
    const timer = useContext(TimerCtx);

    return (
        <Button
            tooltipLabel="Stop"
            icon={faStop}
            size="xl"
            onClick={() => {
                clearInterval(timer!.current);
                automaton?.clear();
                status!.stop();
            }}
            disabled={status!.stopped}
        />
    );
}

function ScreenshotBtn() {
    //
    const status = useContext(StatusCtx);
    const automaton = useContext(AutomatonCtx);

    return (
        <Button
            tooltipLabel="Screenshot"
            icon={faCameraRetro}
            size="xl"
            onClick={() => automaton?.saveScene("cellular_automaton")}
            disabled={status!.stopped}
        />
    );
}

function SpeedSlider() {
    //
    const state = useContext(RefreshRateCtx);

    return (
        <Grid
            container
            className="cap-component-container"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs="auto">
                <StyledTooltip
                    title="Speed"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 700 }}
                    followCursor
                    arrow
                >
                    <FontAwesomeIcon
                        icon={faGaugeHigh}
                        size="2x"
                        className="ms-2 my-2"
                    />
                </StyledTooltip>
            </Grid>

            <Grid item xs>
                <StyledSlider
                    defaultValue={refreshRateVal.defaultVal}
                    min={refreshRateVal.minVal}
                    max={refreshRateVal.maxVal}
                    value={state!.get}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => state!.set(value as number)}
                    valueLabelDisplay="off"
                />
            </Grid>
        </Grid>
    );
}

function ZoomSlider() {
    //
    const state = useContext(CellSizeCtx);

    return (
        <Grid
            container
            className="cap-component-container"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs="auto">
                <StyledTooltip
                    title="Zoom"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 700 }}
                    followCursor
                    arrow
                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size="2x"
                        className="ms-2 my-2"
                    />
                </StyledTooltip>
            </Grid>

            <Grid item xs>
                <StyledSlider
                    defaultValue={cellSizeVal.defaultVal}
                    min={cellSizeVal.minVal}
                    max={cellSizeVal.maxVal}
                    value={state!.get}
                    onChange={(
                        event: Event,
                        value: number | number[],
                        activeThumb: number
                    ) => state!.set(value as number)}
                    valueLabelDisplay="off"
                />
            </Grid>
        </Grid>
    );
}
