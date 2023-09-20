import {
    faForward,
    faForwardStep,
    faPause,
    faPlay,
    faStop,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector, useStateObj } from "src/app/hooks";
import {
    flowStatusPause,
    flowStatusRun,
    flowStatusStop,
    selectFlowStatus,
} from "src/app/slices/mainFrame/flowStatus";
import {
    incrementIterations,
    restartIterations,
    selectIterations,
    selectLimitIterations,
    setLimitIterations,
} from "src/app/slices/mainFrame/iterations";
import { IconButton } from "src/components/Button";
import { VerticalSlider } from "src/components/Slider";

const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 500 };

export default function FlowControlTools({
    init,
    next,
    stop,
}: {
    init: () => void;
    next: () => void;
    stop: () => void;
}) {
    //
    const status = useAppSelector(selectFlowStatus);
    const iterations = useAppSelector(selectIterations);
    const limitIterations = useAppSelector(selectLimitIterations);
    const dispatch = useAppDispatch();

    const refreshRate = useStateObj(refreshRateVal.defaultVal);

    const init_ = () => {
        init();
        dispatch(restartIterations());
    };

    const next_ = () => {
        next();
        dispatch(incrementIterations());
    };

    // every render
    useEffect(() => {
        if (status === "running") {
            window.setTimeout(next_, 1000 - refreshRate.get);

            if (iterations === limitIterations - 1) {
                dispatch(flowStatusPause());
                dispatch(setLimitIterations(0));
            }
        }
    });

    return (
        <Box className="flex flex-col h-full items-center justify-center space-y-2 px-3">
            <RunBtn init={init_} />

            <NextBtn init={init_} next={next_} />

            <StopBtn stop={stop} />

            <VerticalSlider
                icon={faForward}
                tooltipLabel="Speed"
                state={refreshRate}
                min={refreshRateVal.minVal}
                max={refreshRateVal.maxVal}
            />
        </Box>
    );
}

function RunBtn({ init }: { init: () => void }) {
    //
    const status = useAppSelector(selectFlowStatus);
    const dispatch = useAppDispatch();

    return (
        <IconButton
            tooltipLabel={status === "running" ? "Pause" : "Run"}
            icon={status === "running" ? faPause : faPlay}
            iconSize="xl"
            onClick={() => {
                switch (status) {
                    case "stopped":
                        init();
                        dispatch(flowStatusRun());
                        break;
                    case "paused":
                        dispatch(flowStatusRun());
                        break;
                    case "running":
                        dispatch(flowStatusPause());
                        break;
                }
            }}
        />
    );
}

function NextBtn({ init, next }: { init: () => void; next: () => void }) {
    //
    const status = useAppSelector(selectFlowStatus);
    const dispatch = useAppDispatch();

    return (
        <IconButton
            tooltipLabel="Next"
            icon={faForwardStep}
            iconSize="xl"
            onClick={() => {
                switch (status) {
                    case "stopped":
                        init();
                        next();
                        dispatch(flowStatusPause());
                        break;
                    case "paused":
                        next();
                        break;
                    case "running":
                        break;
                }
            }}
            disabled={status === "running"}
        />
    );
}

function StopBtn({ stop }: { stop: () => void }) {
    //
    const status = useAppSelector(selectFlowStatus);
    const dispatch = useAppDispatch();

    return (
        <IconButton
            tooltipLabel="Stop"
            icon={faStop}
            iconSize="xl"
            onClick={() => {
                switch (status) {
                    case "stopped":
                        break;
                    case "paused":
                    case "running":
                        stop();
                        dispatch(restartIterations());
                        dispatch(flowStatusStop());
                        break;
                }
            }}
            disabled={status === "stopped"}
        />
    );
}
