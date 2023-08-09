//

import React, { useEffect } from "react";

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
import Button from "../components/Button";
import LevelSelector from "../components/LevelSelector";
import Group from "src/components/Group";
import CanvasController from "src/ts/CanvasController";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setRunningStatus } from "src/app/slices/runningStatus";
import { decrementCellSize, incrementCellSize } from "src/app/slices/cellSize";
import {
    decrementRefreshTime,
    incrementRefreshTime,
} from "src/app/slices/refreshTime";
import CellularAutomaton from "src/ts/CellularAutomaton";
import { numValues as refreshTimeNumValues } from "src/app/slices/refreshTime";
import { numValues as cellSizeNumValues } from "src/app/slices/cellSize";
import { values as refreshTimeValues } from "src/app/slices/refreshTime";
import { values as cellSizeValues } from "src/app/slices/cellSize";

const canvasId = "cap-canvas";
const bufferSize = 64;
const automaton = new CellularAutomaton();
let canvasCntrl: CanvasController;
let runInterval: NodeJS.Timer;

export default function Canvas() {
    //

    const numCells = useAppSelector((state) => state.numCells.value);

    // const canvasCntrl = useRef<CanvasController>();

    useEffect(() => {
        canvasCntrl = new CanvasController(canvasId, bufferSize, numCells);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div id="canvas-container">
                <canvas id={canvasId} />
            </div>

            <div className="row my-3">
                {/* <!-- Flow --> */}
                <div className="col-lg">
                    <FlowCtrls />
                </div>

                {/* <!-- Speed --> */}
                <div className="col-lg">
                    <SpeedSelector />
                </div>

                {/* <!-- Zoom --> */}
                <div className="col-lg">
                    <ZoomSelector />
                </div>

                {/* <!-- Canvas --> */}
                <div className="col-lg">
                    <CanvasCtrls />
                </div>
            </div>
        </div>
    );
}

function FlowCtrls() {
    //

    const runningStatus = useAppSelector((state) => state.runningStatus.value);
    const refreshTime = useAppSelector(
        (state) => refreshTimeValues[state.refreshTime.value]
    );
    const cellsNbhds = useAppSelector((state) => state.cellsNbhds.value);
    const initState = useAppSelector((state) => state.initState.value);
    const rules = useAppSelector((state) => state.rules.value);

    const dispatch = useAppDispatch();

    const init = () => {
        if (runningStatus === "stopped") {
            automaton.state = initState;
            canvasCntrl?.paintNextRow(automaton.state);
            return true;
        }
        return false;
    };

    const nextState = () => {
        automaton.nextState(cellsNbhds, rules);
        canvasCntrl?.paintNextRow(automaton.state);
    };

    const next = () => {
        if (!init()) {
            nextState();
        }
        if (runningStatus === "stopped") {
            dispatch(setRunningStatus("paused"));
        }
    };

    const run = () => {
        init();
        dispatch(setRunningStatus("running"));
        runInterval = setInterval(nextState, refreshTime);
    };

    const pause = () => {
        clearInterval(runInterval);
        dispatch(setRunningStatus("paused"));
    };

    const stop = () => {
        clearInterval(runInterval);
        canvasCntrl.restart();
        dispatch(setRunningStatus("stopped"));
    };

    useEffect(() => {
        if (runningStatus === "running") {
            clearInterval(runInterval);
            runInterval = setInterval(nextState, refreshTime);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshTime, rules]);

    return (
        <Group
            elements={[
                <Button
                    tooltipLabel="Next"
                    icon={faForwardStep}
                    onClick={next}
                    enabled={runningStatus !== "running"}
                />,
                <Button
                    tooltipLabel="Run"
                    icon={faPlay}
                    onClick={run}
                    enabled={runningStatus !== "running"}
                />,
                <Button
                    tooltipLabel="Pause"
                    icon={faPause}
                    onClick={pause}
                    enabled={runningStatus === "running"}
                />,
                <Button
                    tooltipLabel="Stop"
                    icon={faStop}
                    onClick={stop}
                    enabled={runningStatus !== "stopped"}
                />,
            ]}
        />
    );
}

function SpeedSelector() {
    //

    const refreshTimeIndex = useAppSelector((state) => state.refreshTime.value);

    const dispatch = useAppDispatch();

    return (
        <LevelSelector
            tooltipLabel="Speed"
            icon={faGaugeHigh}
            index={refreshTimeIndex}
            numLevels={refreshTimeNumValues}
            increment={() => dispatch(incrementRefreshTime())}
            decrement={() => dispatch(decrementRefreshTime())}
        />
    );
}

function ZoomSelector() {
    //

    const cellSizeIndex = useAppSelector((state) => state.cellSize.value);
    const runningStatus = useAppSelector((state) => state.runningStatus.value);

    const dispatch = useAppDispatch();

    const cellSize = cellSizeValues[cellSizeIndex];

    useEffect(() => {
        //
        // canvasCntrl!.cellSize = cellSize;
        canvasCntrl?.setCellSize(cellSize);
        if (runningStatus !== "running") {
            canvasCntrl?.restart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    return (
        <LevelSelector
            tooltipLabel="Zoom"
            icon={faMagnifyingGlass}
            index={cellSizeIndex}
            numLevels={cellSizeNumValues}
            increment={() => dispatch(incrementCellSize())}
            decrement={() => dispatch(decrementCellSize())}
        />
    );
}

function CanvasCtrls() {
    //

    return (
        <Group
            elements={[
                <Button
                    tooltipLabel="Clear"
                    icon={faBroom}
                    onClick={() => canvasCntrl?.restart()}
                />,
                <Button
                    tooltipLabel="Screenshot"
                    icon={faCameraRetro}
                    onClick={() => canvasCntrl?.saveScene("cellular_automaton")}
                />,
            ]}
        />
    );
}
