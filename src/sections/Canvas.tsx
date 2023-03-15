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
import { APICtx } from "src/App";
import CanvasCntrl from "src/ts/CanvasCntrl";

type CanvasAPICtxType = {
    next: () => void;
    run: () => void;
    stop: () => void;
    clear: () => void;
    saveScene: () => void;
};

const canvasId = "cap-canvas";

const CanvasAPICtx = createContext<CanvasAPICtxType | null>(null);

export default function Canvas() {
    //

    const cntrl = useRef<CanvasCntrl>();
    const genCount = useRef(0);
    const runInterval = useRef<NodeJS.Timer>();

    const api = useContext(APICtx)!;

    const width = useMemo(
        () => Math.floor(window.innerWidth * 0.95),
        [window.innerWidth]
    );
    const height = useMemo(
        () => Math.floor(window.innerHeight * 0.7),
        [window.innerHeight]
    );

    useEffect(() => {
        cntrl.current = new CanvasCntrl(canvasId, width, height);
        console.log("canvas cntrl rows: " + cntrl.current.rows);
        console.log("canvas cntrl cols: " + cntrl.current.columns);
    }, []);

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

    const canvasAPICtx = {
        next: nextState,
        run: () => {
            runInterval.current = setInterval(nextState, 500);
        },
        stop: () => clearInterval(runInterval.current),
        clear: () => {
            genCount.current = 0;
            cntrl.current?.clear();
        },
        saveScene: () => cntrl.current?.saveScene("cellular_automaton"),
    };

    return (
        <CanvasAPICtx.Provider value={canvasAPICtx}>
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
        </CanvasAPICtx.Provider>
    );
}

function FlowCtrls() {
    //

    const canvasApi = useContext(CanvasAPICtx)!;

    return (
        <div className={inputGroupClasses("md", "center", "")}>
            {/*  */}

            <Button
                tooltipLabel="Next"
                icon={faForwardStep}
                onClick={canvasApi.next}
            />

            <Button tooltipLabel="Run" icon={faPlay} onClick={canvasApi.run} />

            <Button
                tooltipLabel="Pause"
                icon={faPause}
                // onClick={canvasApi.pause}
            />

            <Button
                tooltipLabel="Stop"
                icon={faStop}
                onClick={canvasApi.stop}
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

    return (
        <div className="row my-3">
            {/* <!-- Flow --> */}
            <div className="col-lg">
                <FlowCtrls />
            </div>

            {/* <!-- Speed --> */}
            <div className="col-lg">
                <LevelSelector
                    numLevels={5}
                    tooltipLabel="Speed"
                    icon={faGaugeHigh}
                    alignment="center"
                />
            </div>

            {/* <!-- Zoom --> */}
            <div className="col-lg">
                <LevelSelector
                    numLevels={5}
                    tooltipLabel="Zoom"
                    icon={faMagnifyingGlass}
                    alignment="center"
                />
            </div>

            {/* <!-- Canvas --> */}
            <div className="col-lg">
                <CanvasCtrls />
            </div>
        </div>
    );
}
