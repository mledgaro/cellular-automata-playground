import React, {
    MutableRefObject,
    createContext,
    useContext,
    useEffect,
    useRef,
} from "react";

import {
    faBroom,
    faCameraRetro,
    faForwardStep,
    faGaugeHigh,
    faMagnifyingGlass,
    faPause,
    faPlay,
    faStop,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Grid } from "@mui/material";

import { StateHookObj, useAppSelector, useStateObj } from "src/app/hooks";

import Button from "src/components/Button";
import CustomSlider from "src/components/Slider";

import { selectCellsNbhds } from "src/app/slices/cellsNbhds";
import { selectRules } from "src/app/slices/rules";
import { selectInitState } from "src/app/slices/initState";

import CellularAutomaton from "src/ts/CellularAutomaton";
import CanvasController from "src/ts/CanvasController";

type RunningStatusType = "stopped" | "paused" | "running";

const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 600 };
const cellSizeVal = { minVal: 1, maxVal: 20, defaultVal: 8 };

const AutomatonCtx = createContext<CellularAutomaton | undefined>(undefined);
const CanvasCntrlCtx = createContext<CanvasController | undefined>(undefined);
const RunningStatusCtx = createContext<
    StateHookObj<RunningStatusType> | undefined
>(undefined);
const TimerCtx = createContext<
    MutableRefObject<NodeJS.Timer | undefined> | undefined
>(undefined);
const RefreshRateCtx = createContext<StateHookObj<number> | undefined>(
    undefined
);
const CellSizeCtx = createContext<StateHookObj<number> | undefined>(undefined);

export default function Controls({
    automaton,
    canvasCntrl,
}: {
    automaton: CellularAutomaton;
    canvasCntrl: CanvasController | undefined;
}) {
    //
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);

    const runningStatus = useStateObj<RunningStatusType>("stopped");
    const refreshRate = useStateObj<number>(refreshRateVal.defaultVal);
    const cellSize = useStateObj<number>(cellSizeVal.defaultVal);

    const timer = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (runningStatus.get === "running") {
            clearInterval(timer.current);
            timer.current = setInterval(() => {
                automaton!.nextState(cellsNbhds, rules);
                canvasCntrl!.paintNextRow(automaton!.state);
            }, 1000 - refreshRate.get);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshRate, rules]);

    useEffect(() => {
        // canvasCntrl!.cellSize = cellSize.get;
        // canvasCntrl!.setCellSize(cellSize.get);
        if (runningStatus!.get !== "running") {
            canvasCntrl?.restart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    return (
        <CanvasCntrlCtx.Provider value={canvasCntrl}>
            <AutomatonCtx.Provider value={automaton}>
                <RunningStatusCtx.Provider value={runningStatus}>
                    <TimerCtx.Provider value={timer}>
                        <RefreshRateCtx.Provider value={refreshRate}>
                            <CellSizeCtx.Provider value={cellSize}>
                                <Grid
                                    container
                                    alignItems="center"
                                    className=""
                                >
                                    <Grid item md>
                                        <Box className="w-fit mx-auto space-x-2">
                                            <RunBtn />
                                            <NextBtn />
                                            <PauseBtn />
                                            <StopBtn />
                                        </Box>
                                    </Grid>

                                    <Grid item md>
                                        <SpeedSlider />
                                    </Grid>
                                    <Grid item md>
                                        <ZoomSlider />
                                    </Grid>
                                    <Grid item md>
                                        <Box className="w-fit mx-auto space-x-2">
                                            <ClearBtn />
                                            <ScreenshotBtn />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CellSizeCtx.Provider>
                        </RefreshRateCtx.Provider>
                    </TimerCtx.Provider>
                </RunningStatusCtx.Provider>
            </AutomatonCtx.Provider>
        </CanvasCntrlCtx.Provider>
    );
}

function RunBtn() {
    //
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);
    const initState = useAppSelector(selectInitState);

    const runningStatus = useContext(RunningStatusCtx);
    const automaton = useContext(AutomatonCtx);
    const canvasCntrl = useContext(CanvasCntrlCtx);
    const timer = useContext(TimerCtx);
    const refreshRate = useContext(RefreshRateCtx);

    return (
        <Button
            tooltipLabel="Run"
            icon={faPlay}
            size="xl"
            onClick={() => {
                if (runningStatus!.get === "stopped") {
                    automaton!.state = initState;
                    canvasCntrl!.paintNextRow(automaton!.state);
                }
                runningStatus!.set("running");
                timer!.current = setInterval(() => {
                    automaton!.nextState(cellsNbhds, rules);
                    canvasCntrl!.paintNextRow(automaton!.state);
                }, 1000 - refreshRate!.get);
            }}
            disabled={runningStatus!.get === "running"}
        />
    );
}

function NextBtn() {
    //
    const cellsNbhds = useAppSelector(selectCellsNbhds);
    const rules = useAppSelector(selectRules);

    const runningStatus = useContext(RunningStatusCtx);
    const automaton = useContext(AutomatonCtx);
    const canvasCntrl = useContext(CanvasCntrlCtx);

    return (
        <Button
            tooltipLabel="Next"
            icon={faForwardStep}
            size="xl"
            onClick={() => {
                if (runningStatus!.get !== "stopped") {
                    automaton!.nextState(cellsNbhds, rules);
                    canvasCntrl!.paintNextRow(automaton!.state);
                } else {
                    runningStatus!.set("paused");
                }
            }}
            disabled={runningStatus!.get === "running"}
        />
    );
}

function PauseBtn() {
    //
    const runningStatus = useContext(RunningStatusCtx);
    const timer = useContext(TimerCtx);

    return (
        <Button
            tooltipLabel="Pause"
            icon={faPause}
            size="xl"
            onClick={() => {
                clearInterval(timer!.current);
                runningStatus!.set("paused");
            }}
            disabled={runningStatus!.get !== "running"}
        />
    );
}

function StopBtn() {
    //
    const runningStatus = useContext(RunningStatusCtx);
    const canvasCntrl = useContext(CanvasCntrlCtx);
    const timer = useContext(TimerCtx);

    return (
        <Button
            tooltipLabel="Stop"
            icon={faStop}
            size="xl"
            onClick={() => {
                clearInterval(timer!.current);
                canvasCntrl!.restart();
                runningStatus!.set("stopped");
            }}
            disabled={runningStatus!.get === "stopped"}
        />
    );
}

function ClearBtn() {
    //
    const canvasCntrl = useContext(CanvasCntrlCtx);

    return (
        <Button
            tooltipLabel="Clear"
            icon={faBroom}
            size="xl"
            onClick={() => canvasCntrl!.restart()}
        />
    );
}

function ScreenshotBtn() {
    //
    const canvasCntrl = useContext(CanvasCntrlCtx);

    return (
        <Button
            tooltipLabel="Screenshot"
            icon={faCameraRetro}
            size="xl"
            onClick={() => canvasCntrl!.saveScene("cellular_automaton")}
        />
    );
}

function SpeedSlider() {
    //
    const state = useContext(RefreshRateCtx);

    return (
        <CustomSlider
            className="w-[80%] mx-auto"
            label="Speed"
            // icon={faGaugeHigh}
            minVal={refreshRateVal.minVal}
            maxVal={refreshRateVal.maxVal}
            defaultVal={refreshRateVal.defaultVal}
            valueLabelDisplay="off"
            value={state!.get}
            onChange={state!.set}
        />
    );
}

function ZoomSlider() {
    //
    const state = useContext(CellSizeCtx);

    return (
        <CustomSlider
            className="w-[80%] mx-auto"
            label="Zoom"
            // icon={faMagnifyingGlass}
            minVal={cellSizeVal.minVal}
            maxVal={cellSizeVal.maxVal}
            defaultVal={cellSizeVal.defaultVal}
            valueLabelDisplay="off"
            value={state!.get}
            onChange={state!.set}
        />
    );
}
