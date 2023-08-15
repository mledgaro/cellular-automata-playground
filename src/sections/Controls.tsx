import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import CellularAutomaton from "src/ts/CellularAutomaton";
import {
    decrementRefreshTime,
    incrementRefreshTime,
    numValues as refreshTimeNumValues,
    setRefreshTime,
} from "src/app/slices/refreshTime";
import {
    numValues as cellSizeNumValues,
    decrementCellSize,
    incrementCellSize,
    setCellSize,
} from "src/app/slices/cellSize";
import { values as refreshTimeValues } from "src/app/slices/refreshTime";
import { values as cellSizeValues } from "src/app/slices/cellSize";
import CanvasController from "src/ts/CanvasController";
import { setRunningStatus } from "src/app/slices/runningStatus";
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
import Button from "src/components/Button";
import LevelSelector from "src/components/deprecated/LevelSelector";
import CustomSlider from "src/components/Slider";

export default function Controls({}: // automaton,
// canvasCntrl,
// timer,
{
    // automaton: CellularAutomaton;
    // canvasCntrl: CanvasController;
    // timer: NodeJS.Timer;
}) {
    const runningStatus = useAppSelector((state) => state.runningStatus.value);
    const refreshTime = useAppSelector(
        (state) => refreshTimeValues[state.refreshTime.value]
    );
    const cellsNbhds = useAppSelector((state) => state.cellsNbhds.value);
    const initState = useAppSelector((state) => state.initState.value);
    const rules = useAppSelector((state) => state.rules.value);

    const dispatch = useAppDispatch();

    // const init = () => {
    //     if (runningStatus === "stopped") {
    //         automaton.state = initState;
    //         canvasCntrl?.paintNextRow(automaton.state);
    //         return true;
    //     }
    //     return false;
    // };

    // const nextState = () => {
    //     automaton.nextState(cellsNbhds, rules);
    //     canvasCntrl?.paintNextRow(automaton.state);
    // };

    // useEffect(() => {
    //     if (runningStatus === "running") {
    //         // clearInterval(timer);
    //         // timer = setInterval(nextState, refreshTime);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [refreshTime, rules]);

    return (
        <Grid container className="">
            <Grid item md={3}>
                <Box className="w-fit mx-auto space-x-2">
                    <RunBtn />
                    <NextBtn />
                    <PauseBtn />
                    <StopBtn />
                </Box>
            </Grid>

            <Grid item md={3}>
                <SpeedSelector />
            </Grid>
            <Grid item md={3}>
                <ZoomSelector
                // canvasCntrl={canvasCntrl}
                />
            </Grid>
            <Grid item md={3}>
                <Box className="w-fit mx-auto space-x-2">
                    <ClearBtn />
                    <ScreenshotBtn />
                </Box>
            </Grid>
        </Grid>
    );
}

function RunBtn() {
    const runningStatus = useAppSelector((state) => state.runningStatus.value);
    return (
        <Button
            tooltipLabel="Run"
            icon={faPlay}
            size="xl"
            // onClick={() => {
            //     init();
            //     dispatch(setRunningStatus("running"));
            //     // timer = setInterval(nextState, refreshTime);
            // }}
            disabled={runningStatus === "running"}
        />
    );
}

function NextBtn() {
    const runningStatus = useAppSelector((state) => state.runningStatus.value);
    return (
        <Button
            tooltipLabel="Next"
            icon={faForwardStep}
            size="xl"
            // onClick={() => {
            //     if (!init()) {
            //         nextState();
            //     }
            //     if (runningStatus === "stopped") {
            //         dispatch(setRunningStatus("paused"));
            //     }
            // }}
            disabled={runningStatus === "running"}
        />
    );
}

function PauseBtn() {
    const runningStatus = useAppSelector((state) => state.runningStatus.value);
    return (
        <Button
            tooltipLabel="Pause"
            icon={faPause}
            size="xl"
            // onClick={() => {
            //     // clearInterval(timer);
            //     dispatch(setRunningStatus("paused"));
            // }}
            disabled={runningStatus !== "running"}
        />
    );
}

function StopBtn() {
    const runningStatus = useAppSelector((state) => state.runningStatus.value);
    return (
        <Button
            tooltipLabel="Stop"
            icon={faStop}
            size="xl"
            // onClick={() => {
            //     // clearInterval(timer);
            //     canvasCntrl.restart();
            //     dispatch(setRunningStatus("stopped"));
            // }}
            disabled={runningStatus === "stopped"}
        />
    );
}

function ClearBtn() {
    return (
        <Button
            tooltipLabel="Clear"
            icon={faBroom}
            size="xl"
            // onClick={() => canvasCntrl?.restart()}
        />
    );
}

function ScreenshotBtn() {
    return (
        <Button
            tooltipLabel="Screenshot"
            icon={faCameraRetro}
            size="xl"
            // onClick={() => canvasCntrl?.saveScene("cellular_automaton")}
        />
    );
}

function SpeedSelector() {
    //

    const refreshTimeIndex = useAppSelector((state) => state.refreshTime.value);

    const dispatch = useAppDispatch();

    return (
        <CustomSlider
            className="w-[80%] mx-auto"
            label="Speed"
            // icon={faGaugeHigh}
            minVal={0}
            maxVal={refreshTimeNumValues}
            defaultVal={2}
            step={1}
            value={refreshTimeIndex}
            marks={true}
            onChange={(val: number) => dispatch(setRefreshTime(val))}
        />
    );
}

function ZoomSelector() {
    // { canvasCntrl }: { canvasCntrl: CanvasController }
    //

    const cellSizeIndex = useAppSelector((state) => state.cellSize.value);
    const runningStatus = useAppSelector((state) => state.runningStatus.value);

    const dispatch = useAppDispatch();

    const cellSize = cellSizeValues[cellSizeIndex];

    // useEffect(() => {
    //     //
    //     // canvasCntrl!.cellSize = cellSize;
    //     canvasCntrl?.setCellSize(cellSize);
    //     if (runningStatus !== "running") {
    //         canvasCntrl?.restart();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [cellSize]);

    return (
        <CustomSlider
            className="w-[80%] mx-auto"
            label="Zoom"
            // icon={faMagnifyingGlass}
            minVal={0}
            maxVal={cellSizeNumValues}
            defaultVal={2}
            step={1}
            value={cellSizeIndex}
            marks={true}
            onChange={(val: number) => dispatch(setCellSize(val))}
        />
    );
}
