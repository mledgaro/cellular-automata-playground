//

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from "react";

import {
    faForwardStep,
    faPlay,
    faStop,
    faGaugeHigh,
    faMagnifyingGlass,
    faBroom,
    faCameraRetro,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import LevelSelector from "../components/LevelSelector";

import { inputGroupClasses } from "../ts/Utils";
import { APICtx, APICtxType } from "src/App";
import CanvasCntrl from "src/ts/CanvasCntrl";
import {
    EnumReducerType,
    useBoolState,
    useEnumReducer,
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
const IsRunningCtx = createContext(false);
const SpeedLvlCtx = createContext<EnumReducerType | null>(null);
const ZoomLvlCtx = createContext<EnumReducerType | null>(null);

export default function Canvas() {
    //

    const api = useContext<APICtxType | null>(APICtx)!;

    const cntrl = useRef<CanvasCntrl>();
    const genCount = useRef(0);
    const runInterval = useRef<NodeJS.Timer>();

    const isRunning = useBoolState(false);
    const speedLvl = useEnumReducer([800, 600, 400, 200, 1], 2);
    const zoomLvl = useEnumReducer([4, 6, 8, 12, 16], 2);

    const width = Math.floor(window.innerWidth * 0.95);
    const height = Math.floor(window.innerHeight * 0.7);

    const nextState = useCallback(() => {
        if (genCount.current < (cntrl.current?.rows ?? 0)) {
            let state;
            if (genCount.current === 0) {
                state = api.automaton.state.get();
            } else {
                state = api.automaton.state.next();
            }
            cntrl.current?.paintRow(genCount.current++, state);
        }
    }, [api.automaton]);

    const pause = useCallback(() => {
        isRunning.setFalse();
        clearInterval(runInterval.current);
    }, [isRunning]);

    const clear = useCallback(() => {
        genCount.current = 0;
        cntrl.current?.clear();
    }, []);

    useEffect(() => {
        cntrl.current = new CanvasCntrl(canvasId, width, height);
    }, [width, height]);

    useEffect(() => {
        cntrl.current!.cellSize = zoomLvl.get;
    }, [zoomLvl.get]);

    useEffect(() => {
        if (isRunning.get) {
            clearInterval(runInterval.current);
            runInterval.current = setInterval(nextState, speedLvl.get);
        }
    }, [speedLvl.get]);

    useEffect(() => {
        if (!isRunning.get) {
            cntrl.current?.clear();
        }
    }, [zoomLvl.get]);

    const canvasAPICtx = {
        next: nextState,
        run: () => {
            isRunning.setTrue();
            runInterval.current = setInterval(nextState, speedLvl.get);
        },
        pause: pause,
        stop: () => {
            pause();
            clear();
        },
        clear: clear,
        saveScene: () => cntrl.current?.saveScene("cellular_automaton"),
    };

    return (
        <CanvasAPICtx.Provider value={canvasAPICtx}>
            <IsRunningCtx.Provider value={isRunning.get}>
                <ZoomLvlCtx.Provider value={zoomLvl}>
                    <SpeedLvlCtx.Provider value={speedLvl}>
                        {/*  */}

                        <div>
                            <div id="canvas-container" className="">
                                <canvas
                                    id={canvasId}
                                    className=""
                                    width={width}
                                    height={height}
                                />
                            </div>

                            <Controls />
                        </div>
                    </SpeedLvlCtx.Provider>
                </ZoomLvlCtx.Provider>
            </IsRunningCtx.Provider>
        </CanvasAPICtx.Provider>
    );
}

function FlowCtrls() {
    //

    const canvasApi = useContext(CanvasAPICtx)!;
    const isRunning = useContext(IsRunningCtx);

    return (
        <div className={inputGroupClasses("md", "center", "")}>
            {/*  */}

            <Button
                tooltipLabel="Next"
                icon={faForwardStep}
                onClick={canvasApi.next}
                enabled={!isRunning}
            />

            <Button
                tooltipLabel="Run"
                icon={faPlay}
                onClick={canvasApi.run}
                enabled={!isRunning}
            />

            <Button
                tooltipLabel="Pause"
                icon={faPause}
                onClick={canvasApi.pause}
                enabled={isRunning}
            />

            <Button
                tooltipLabel="Stop"
                icon={faStop}
                onClick={canvasApi.stop}
                enabled={isRunning}
            />
        </div>
    );
}

function CanvasCtrls() {
    //

    const canvasApi = useContext(CanvasAPICtx)!;

    return (
        <div className={inputGroupClasses("md", "center", "")}>
            {/*  */}

            <Button
                tooltipLabel="Clear"
                icon={faBroom}
                onClick={canvasApi.clear}
            />

            <Button
                tooltipLabel="Screenshot"
                icon={faCameraRetro}
                onClick={canvasApi.saveScene}
            />
        </div>
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
