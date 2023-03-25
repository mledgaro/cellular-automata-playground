//

import React, {
    createContext,
    useCallback,
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
import Button from "../components/Button";
import LevelSelector from "../components/LevelSelector";

import { APICtx, APICtxType } from "src/App";
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

type CanvasAPICtxType = {
    next: () => void;
    run: () => void;
    pause: () => void;
    stop: () => void;
    clear: () => void;
    saveScene: () => void;
};

const canvasId = "cap-canvas";

const CanvasAPICtx = createContext<CanvasAPICtxType | null>(null);

export default function Canvas() {
    //

    const api = useContext<APICtxType | null>(APICtx)!;

    const cntrl = useRef<CanvasCntrl>();
    const genCount = useRef(0);
    const runInterval = useRef<NodeJS.Timer>();

    const numCells = dataStore.numCells();
    const runningStatus = dataStore.runningStatus();
    const cellSize = dataStore.cellSize();
    const refreshTime = dataStore.refreshTime();
    const dispatch = useAppDispatch();

    const nextState = useCallback(() => {
        let state;
        if (genCount.current === 0) {
            state = api.automaton.state.get();
        } else {
            state = api.automaton.state.next();
        }
        genCount.current++;
        cntrl.current?.paintRow(state);
    }, [api.automaton]);

    const clear = useCallback(() => {
        genCount.current = 0;
        cntrl.current?.restart();
    }, []);

    useEffect(() => {
        cntrl.current = new CanvasCntrl(canvasId, 64, numCells);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        cntrl.current!.cellSize = cellSize;
    }, [cellSize]);

    useEffect(() => {
        if (runningStatus === "running") {
            clearInterval(runInterval.current);
            runInterval.current = setInterval(nextState, refreshTime);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshTime]);

    useEffect(() => {
        if (runningStatus !== "running") {
            cntrl.current?.restart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    const canvasAPICtx = {
        next: () => {
            dispatch(setRunningStatus("paused"));
            nextState();
        },
        run: () => {
            dispatch(setRunningStatus("running"));
            runInterval.current = setInterval(nextState, refreshTime);
        },
        pause: () => {
            dispatch(setRunningStatus("paused"));
            clearInterval(runInterval.current);
        },
        stop: () => {
            dispatch(setRunningStatus("stopped"));
            clearInterval(runInterval.current);
            clear();
        },
        clear: clear,
        saveScene: () => cntrl.current?.saveScene("cellular_automaton"),
    };

    return (
        <CanvasAPICtx.Provider value={canvasAPICtx}>
            {/*  */}

            <div>
                <div id="canvas-container" className="">
                    <canvas id={canvasId} className="" />
                </div>

                <Controls />
            </div>
        </CanvasAPICtx.Provider>
    );
}

function FlowCtrls() {
    //

    const runningStatus = dataStore.runningStatus();
    const canvasApi = useContext(CanvasAPICtx)!;

    return (
        <Group
            elements={[
                <Button
                    tooltipLabel="Next"
                    icon={faForwardStep}
                    onClick={canvasApi.next}
                    enabled={runningStatus !== "running"}
                />,
                <Button
                    tooltipLabel="Run"
                    icon={faPlay}
                    onClick={canvasApi.run}
                    enabled={runningStatus !== "running"}
                />,
                <Button
                    tooltipLabel="Pause"
                    icon={faPause}
                    onClick={canvasApi.pause}
                    enabled={runningStatus === "running"}
                />,
                <Button
                    tooltipLabel="Stop"
                    icon={faStop}
                    onClick={canvasApi.stop}
                    enabled={runningStatus !== "stopped"}
                />,
            ]}
        />
    );
}

function CanvasCtrls() {
    //

    const canvasApi = useContext(CanvasAPICtx)!;

    return (
        <Group
            elements={[
                <Button
                    tooltipLabel="Clear"
                    icon={faBroom}
                    onClick={canvasApi.clear}
                />,
                <Button
                    tooltipLabel="Screenshot"
                    icon={faCameraRetro}
                    onClick={canvasApi.saveScene}
                />,
            ]}
        />
    );
}

function Controls() {
    //

    const refreshTimeIndex = dataStore.refreshTimeIndex();
    const refreshTimeLength = dataStore.refreshTimeLength();
    const cellSizeIndex = dataStore.cellSizeIndex();
    const cellSizeLength = dataStore.cellSizeLength();
    const dispatch = useAppDispatch();

    return (
        <div className="row my-3">
            {/* <!-- Flow --> */}
            <div className="col-lg">
                <FlowCtrls />
            </div>

            {/* <!-- Speed --> */}
            <div className="col-lg">
                <LevelSelector
                    tooltipLabel="Speed"
                    icon={faGaugeHigh}
                    index={refreshTimeIndex}
                    numLevels={refreshTimeLength}
                    increment={() => dispatch(incrementRefreshTime())}
                    decrement={() => dispatch(decrementRefreshTime())}
                />
            </div>

            {/* <!-- Zoom --> */}
            <div className="col-lg">
                <LevelSelector
                    tooltipLabel="Zoom"
                    icon={faMagnifyingGlass}
                    index={cellSizeIndex}
                    numLevels={cellSizeLength}
                    increment={() => dispatch(incrementCellSize())}
                    decrement={() => dispatch(decrementCellSize())}
                />
            </div>

            {/* <!-- Canvas --> */}
            <div className="col-lg">
                <CanvasCtrls />
            </div>
        </div>
    );
}
