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
import CanvasCntrl from "src/ts/CanvasCntrl";
import { dataStore } from "src/app/store";
import { useAppDispatch } from "src/app/hooks";
import { setRunningStatus } from "src/features/runningStatus";
import { decrementCellSize, incrementCellSize } from "src/features/cellSize";
import {
    decrementRefreshTime,
    incrementRefreshTime,
} from "src/features/refreshTime";
import CellularAutomaton from "src/ts/CellularAutomaton";
import { numValues as refreshTimeNumValues } from "src/features/refreshTime";
import { numValues as cellSizeNumValues } from "src/features/cellSize";

const canvasId = "cap-canvas";
const automaton = new CellularAutomaton();

let controller: CanvasCntrl;
let runInterval: NodeJS.Timer;

export default function Canvas() {
    //

    const numCells = dataStore.numCells;

    useEffect(() => {
        controller = new CanvasCntrl(canvasId, 64, numCells);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div id="canvas-container" className="">
                <canvas id={canvasId} className="" />
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

    const runningStatus = dataStore.runningStatus;
    const refreshTime = dataStore.refreshTime;
    const cellsNbhds = dataStore.cellsNbhds.arr;
    const initState = dataStore.initState.arr;
    const rules = dataStore.rules.arr;

    const dispatch = useAppDispatch();

    const nextState = () => {
        if (runningStatus === "stopped") {
            automaton.state = initState;
        } else {
            automaton.nextState(cellsNbhds, rules);
        }
        // genCount.current++;
        controller.paintRow(automaton.state);
    };

    const next = () => {
        dispatch(setRunningStatus("paused"));
        nextState();
    };

    const run = () => {
        dispatch(setRunningStatus("running"));
        runInterval = setInterval(nextState, refreshTime);
    };

    const pause = () => {
        dispatch(setRunningStatus("paused"));
        clearInterval(runInterval);
    };

    const stop = () => {
        dispatch(setRunningStatus("stopped"));
        clearInterval(runInterval);
        controller.restart();
    };

    useEffect(() => {
        if (runningStatus === "running") {
            clearInterval(runInterval);
            runInterval = setInterval(nextState, refreshTime);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshTime]);

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

    const refreshTimeIndex = dataStore.refreshTimeIndex;

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

    const cellSize = dataStore.cellSize;
    const cellSizeIndex = dataStore.cellSizeIndex;
    const runningStatus = dataStore.runningStatus;

    const dispatch = useAppDispatch();

    useEffect(() => {
        controller.cellSize = cellSize;

        if (runningStatus !== "running") {
            controller.restart();
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
                    onClick={() => controller.restart()}
                />,
                <Button
                    tooltipLabel="Screenshot"
                    icon={faCameraRetro}
                    onClick={() => controller.saveScene("cellular_automaton")}
                />,
            ]}
        />
    );
}
