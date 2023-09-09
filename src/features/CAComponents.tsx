//
import React, { useEffect } from "react";

import { StateObjHook, useStateObj } from "src/app/hooks";

import { Box, Grid } from "@mui/material";
import CustomTabs from "src/components/Tabs";
import Canvas from "src/features/Canvas";
import Controllers from "src/features/Controllers";
import {
    faGaugeHigh,
    faGears,
    faHeart,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "src/components/Button";
import { IconSlider } from "src/components/Slider";
import Label from "src/components/Label";
import InputNumber from "src/components/InputNumber";
import { FloatMenu } from "src/components/Menu";
import { useStatus } from "src/app/hooks/status";
const refreshRateVal = { minVal: 200, maxVal: 999, defaultVal: 600 };

export default function CAComponents({
    init,
    next,
    stop,
    cellsState,
    canvasOnClick,
    tabs,
    liveCells,
}: {
    init: () => void;
    next: (iteration: number) => void;
    stop: () => void;
    cellsState: boolean[][];
    canvasOnClick: (r: number, c: number) => void;
    tabs: { title: string; content: JSX.Element }[];
    liveCells: number;
}) {
    //
    const iterations = useStateObj(0);
    const config = useStateObj(false);
    const refreshRate = useStateObj(refreshRateVal.defaultVal);
    const stopIterations = useStateObj(0);
    const status = useStatus();

    const init_ = () => {
        init();
        iterations.set(0);
    };

    const next_ = () => {
        next(iterations.get);
        iterations.set(iterations.get + 1);
    };

    const stop_ = () => {
        stop();
        iterations.set(0);
    };

    useEffect(() => {
        if (status.running && iterations.get === stopIterations.get - 1) {
            status.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [iterations.get]);

    return (
        <Box className="space-y-6 my-5">
            <Canvas cellsState={cellsState} clickHandler={canvasOnClick} />

            <Grid container justifyContent="space-evenly">
                <Grid item md="auto">
                    <Controllers
                        init={init_}
                        next={next_}
                        stop={stop_}
                        refreshRate={refreshRate.get}
                        status={status}
                    />
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

                <Grid item md={2} className="flex justify-center">
                    <Iterations
                        iterations={iterations.get}
                        stopIterations={stopIterations}
                    />
                </Grid>

                <Grid item md={2} className="flex justify-center">
                    <Label
                        icon={faHeart}
                        tooltipLabel="Live cells"
                        content={liveCells.toString()}
                    />
                </Grid>

                <Grid item md="auto">
                    <IconButton
                        tooltipLabel={"Configuration"}
                        icon={faGears}
                        iconSize="2x"
                        onClick={() => config.set(!config.get)}
                    />
                </Grid>
            </Grid>

            {config.get && <CustomTabs tabs={tabs} />}
        </Box>
    );
}

function Iterations({
    iterations,
    stopIterations,
}: {
    iterations: number;
    stopIterations: StateObjHook<number>;
}) {
    return (
        <Box className="flex flex-row space-x-2 items-center cap-component-container py-2 px-3 select-none">
            <Box>
                <FloatMenu
                    icon={faStopwatch}
                    iconSize="xl"
                    content={
                        <InputNumber
                            state={stopIterations}
                            min={0}
                            max={100_000}
                            label="Pause at"
                        />
                    }
                    boxProps="bottom-0 left-0 w-[8rem] translate-x-[1rem] -translate-y-[3rem]"
                />
            </Box>
            <Box className="text-tertiary text-xl">
                {iterations +
                    (stopIterations.get > 0 ? ` / ${stopIterations.get}` : "")}
            </Box>
        </Box>
    );
}
