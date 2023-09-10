import {
    faForward,
    faForwardStep,
    faGaugeHigh,
    faPause,
    faPlay,
    faStop,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import React, { createContext, useContext, useEffect } from "react";
import { StateObjHook } from "src/app/hooks";
import { StatusHook } from "src/app/hooks/status";
import { IconButton } from "src/components/Button";
import { IconSlider, VerticalSlider } from "src/components/Slider";

const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 600 };

const StatusCtx = createContext<StatusHook | undefined>(undefined);

export default function FlowControlTools({
    init,
    next,
    stop,
    refreshRate,
    status,
}: {
    init: () => void;
    next: () => void;
    stop: () => void;
    refreshRate: StateObjHook<number>;
    status: StatusHook;
}) {
    // every render
    useEffect(() => {
        if (status.running) {
            window.setTimeout(next, 1000 - refreshRate.get);
        }
    });

    // status change
    useEffect(() => {
        if (status.prev.stopped && !status.stopped) {
            init();
        } else if (status.stopped) {
            stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.get]);

    return (
        <Box className="flex flex-col h-full items-center justify-center space-y-2">
            <StatusCtx.Provider value={status}>
                <RunBtn />
                <NextBtn clickHandler={next} />
                <StopBtn />
            </StatusCtx.Provider>
            <VerticalSlider
                icon={faForward}
                tooltipLabel="Speed"
                state={refreshRate}
                defaultValue={refreshRateVal.defaultVal}
                min={refreshRateVal.minVal}
                max={refreshRateVal.maxVal}
            />
        </Box>
    );
}

function RunBtn() {
    //
    const status = useContext(StatusCtx);

    return (
        <IconButton
            tooltipLabel={status?.running ? "Pause" : "Run"}
            icon={status?.running ? faPause : faPlay}
            iconSize="xl"
            onClick={() => {
                if (!status!.running) {
                    status?.run();
                } else {
                    status?.pause();
                }
            }}
        />
    );
}

function NextBtn({ clickHandler }: { clickHandler: () => void }) {
    //
    const status = useContext(StatusCtx);

    return (
        <IconButton
            tooltipLabel="Next"
            icon={faForwardStep}
            iconSize="xl"
            onClick={() => {
                if (status!.stopped) {
                    status!.pause();
                } else if (status!.paused) {
                    clickHandler();
                }
            }}
            disabled={status!.running}
        />
    );
}

function StopBtn() {
    //
    const status = useContext(StatusCtx);

    return (
        <IconButton
            tooltipLabel="Stop"
            icon={faStop}
            iconSize="xl"
            onClick={() => {
                status!.stop();
            }}
            disabled={status!.stopped}
        />
    );
}
