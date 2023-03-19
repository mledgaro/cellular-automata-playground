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

import { APICtx, APICtxType, NumCellsCtx } from "src/App";
import Group from "src/components/Group";
import CanvasCntrl from "src/ts/CanvasCntrl";
import {
    EnumReducerType,
    useEnumReducer,
    useStateObj,
} from "src/ts/CustomHooks";

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
const RunningStatusCtx = createContext<RunningStatus>("stopped");
const SpeedLvlCtx = createContext<EnumReducerType | null>(null);
const ZoomLvlCtx = createContext<EnumReducerType | null>(null);

type RunningStatus = "stopped" | "paused" | "running";

export default function Canvas() {
    //

    const api = useContext<APICtxType | null>(APICtx)!;
    const numCells = useContext(NumCellsCtx);

    const cntrl = useRef<CanvasCntrl>();
    const genCount = useRef(0);
    const runInterval = useRef<NodeJS.Timer>();

    const runningStatus = useStateObj("stopped");
    const speedLvl = useEnumReducer([800, 600, 400, 200, 1], 2);
    const zoomLvl = useEnumReducer([4, 6, 8, 12, 16], 2);

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
    }, []);

    useEffect(() => {
        cntrl.current!.cellSize = zoomLvl.get;
    }, [zoomLvl.get]);

    useEffect(() => {
        if (runningStatus.get === "running") {
            clearInterval(runInterval.current);
            runInterval.current = setInterval(nextState, speedLvl.get);
        }
    }, [speedLvl.get]);

    useEffect(() => {
        if (runningStatus.get !== "running") {
            cntrl.current?.restart();
        }
    }, [zoomLvl.get]);

    const canvasAPICtx = {
        next: () => {
            runningStatus.set("paused");
            nextState();
        },
        run: () => {
            runningStatus.set("running");
            runInterval.current = setInterval(nextState, speedLvl.get);
        },
        pause: () => {
            runningStatus.set("paused");
            clearInterval(runInterval.current);
        },
        stop: () => {
            runningStatus.set("stopped");
            clearInterval(runInterval.current);
            clear();
        },
        clear: clear,
        saveScene: () => cntrl.current?.saveScene("cellular_automaton"),
    };

    return (
        <CanvasAPICtx.Provider value={canvasAPICtx}>
            <RunningStatusCtx.Provider value={runningStatus.get}>
                <ZoomLvlCtx.Provider value={zoomLvl}>
                    <SpeedLvlCtx.Provider value={speedLvl}>
                        {/*  */}

                        <div>
                            <div id="canvas-container" className="">
                                <canvas id={canvasId} className="" />
                            </div>

                            <Controls />
                        </div>
                    </SpeedLvlCtx.Provider>
                </ZoomLvlCtx.Provider>
            </RunningStatusCtx.Provider>
        </CanvasAPICtx.Provider>
    );
}

function FlowCtrls() {
    //

    const canvasApi = useContext(CanvasAPICtx)!;
    const runningStatus = useContext(RunningStatusCtx)!;

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

    const zoom = useContext(ZoomLvlCtx)!;
    const speed = useContext(SpeedLvlCtx)!;

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
                    enumReducer={speed}
                />
            </div>

            {/* <!-- Zoom --> */}
            <div className="col-lg">
                <LevelSelector
                    tooltipLabel="Zoom"
                    icon={faMagnifyingGlass}
                    enumReducer={zoom}
                />
            </div>

            {/* <!-- Canvas --> */}
            <div className="col-lg">
                <CanvasCtrls />
            </div>
        </div>
    );
}
