import React, { createContext, useContext, useEffect } from "react";

import { Box, Grid } from "@mui/material";
import {
    faForwardStep,
    faGaugeHigh,
    faMagnifyingGlass,
    faPause,
    faPlay,
    faStop,
} from "@fortawesome/free-solid-svg-icons";

import { StateObjHook, useStateObj } from "src/app/hooks";
import { StatusHook, useStatus } from "src/app/hooks/status";

import Button from "src/components/Button";
import { IconSlider } from "src/components/Slider";

const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 600 };
const cellSizeVal = { minVal: 1, maxVal: 20, defaultVal: 8 };

const StatusCtx = createContext<StatusHook | undefined>(undefined);

export default function Controllers({
    init,
    next,
    stop,
    zoom,
}: {
    init: () => void;
    next: () => void;
    stop: () => void;
    zoom: StateObjHook<number>;
}) {
    //
    const status = useStatus();
    const refreshRate = useStateObj(refreshRateVal.defaultVal);

    // every render
    useEffect(() => {
        if (status.running) {
            window.setTimeout(next, 1000 - refreshRate.get);
        }
    });

    // status change
    useEffect(() => {
        if (status.prev.stopped) {
            init();
        } else if (status.stopped) {
            stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status.get]);

    return (
        <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            columnSpacing={5}
        >
            <Grid item md="auto">
                <Box className="space-x-2">
                    <StatusCtx.Provider value={status}>
                        <RunBtn />
                        <NextBtn clickHandler={next} />
                        <StopBtn />
                    </StatusCtx.Provider>
                </Box>
            </Grid>
            <Grid item md={3}>
                <IconSlider
                    icon={faGaugeHigh}
                    tooltipLabel="Speed"
                    state={refreshRate}
                    defaultVal={refreshRateVal.defaultVal}
                    minVal={refreshRateVal.minVal}
                    maxVal={refreshRateVal.maxVal}
                />
            </Grid>
            <Grid item md={3}>
                <IconSlider
                    icon={faMagnifyingGlass}
                    tooltipLabel="Zoom"
                    state={zoom}
                    defaultVal={cellSizeVal.defaultVal}
                    minVal={cellSizeVal.minVal}
                    maxVal={cellSizeVal.maxVal}
                />
            </Grid>
        </Grid>
    );
}

function RunBtn() {
    //
    const status = useContext(StatusCtx);

    return (
        <Button
            tooltipLabel={status?.running ? "Pause" : "Run"}
            icon={status?.running ? faPause : faPlay}
            size="xl"
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
        <Button
            tooltipLabel="Next"
            icon={faForwardStep}
            size="xl"
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
        <Button
            tooltipLabel="Stop"
            icon={faStop}
            size="xl"
            onClick={() => {
                status!.stop();
            }}
            disabled={status!.stopped}
        />
    );
}
