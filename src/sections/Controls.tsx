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
import { Box } from "@mui/material";
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
    return (
        <Box className="space-y-2 mx-auto">
            <FlowControls
            // automaton={automaton}
            // canvasCntrl={canvasCntrl}
            // timer={timer}
            />
            <SpeedSelector />
            <ZoomSelector
            // canvasCntrl={canvasCntrl}
            />
            <CanvasCtrls
            // canvasCntrl={canvasCntrl}
            />
        </Box>
    );
}

function FlowControls({}: // automaton,
// canvasCntrl,
// timer,
{
    // automaton: CellularAutomaton;
    // canvasCntrl: CanvasController;
    // timer: NodeJS.Timer;
}) {
    //

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

    // const next = () => {
    //     if (!init()) {
    //         nextState();
    //     }
    //     if (runningStatus === "stopped") {
    //         dispatch(setRunningStatus("paused"));
    //     }
    // };

    // const run = () => {
    //     init();
    //     dispatch(setRunningStatus("running"));
    //     // timer = setInterval(nextState, refreshTime);
    // };

    // const pause = () => {
    //     // clearInterval(timer);
    //     dispatch(setRunningStatus("paused"));
    // };

    // const stop = () => {
    //     // clearInterval(timer);
    //     canvasCntrl.restart();
    //     dispatch(setRunningStatus("stopped"));
    // };

    // useEffect(() => {
    //     if (runningStatus === "running") {
    //         // clearInterval(timer);
    //         // timer = setInterval(nextState, refreshTime);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [refreshTime, rules]);

    return (
        <Box>
            <Button
                tooltipLabel="Next"
                icon={faForwardStep}
                size="xl"
                // onClick={next}
                disabled={runningStatus === "running"}
            />
            <Button
                tooltipLabel="Run"
                icon={faPlay}
                size="xl"
                // onClick={run}
                disabled={runningStatus === "running"}
            />
            <Button
                tooltipLabel="Pause"
                icon={faPause}
                size="xl"
                // onClick={pause}
                disabled={runningStatus !== "running"}
            />
            <Button
                tooltipLabel="Stop"
                icon={faStop}
                size="xl"
                // onClick={stop}
                disabled={runningStatus === "stopped"}
            />
        </Box>
    );
}

function SpeedSelector() {
    //

    const refreshTimeIndex = useAppSelector((state) => state.refreshTime.value);

    const dispatch = useAppDispatch();

    return (
        // <LevelSelector
        //     tooltipLabel="Speed"
        //     icon={faGaugeHigh}
        //     index={refreshTimeIndex}
        //     numLevels={refreshTimeNumValues}
        //     increment={() => dispatch(incrementRefreshTime())}
        //     decrement={() => dispatch(decrementRefreshTime())}
        // />
        <CustomSlider
            label="Speed"
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

    // return (
    //     <LevelSelector
    //         tooltipLabel="Zoom"
    //         icon={faMagnifyingGlass}
    //         index={cellSizeIndex}
    //         numLevels={cellSizeNumValues}
    //         increment={() => dispatch(incrementCellSize())}
    //         decrement={() => dispatch(decrementCellSize())}
    //     />
    // );

    return (
        <CustomSlider
            label="Zoom"
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

function CanvasCtrls() {
    // { canvasCntrl }: { canvasCntrl: CanvasController }
    //

    return (
        <Box>
            <Button
                tooltipLabel="Clear"
                icon={faBroom}
                size="xl"
                // onClick={() => canvasCntrl?.restart()}
            />
            <Button
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                size="xl"
                // onClick={() => canvasCntrl?.saveScene("cellular_automaton")}
            />
        </Box>
    );
}
