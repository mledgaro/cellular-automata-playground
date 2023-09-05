//
import React from "react";

import { useStateObj } from "src/app/hooks";

import { Box, Grid } from "@mui/material";
import CustomTabs from "src/components/Tabs";
import { CellsStateHook } from "src/app/hooks/cellsState";
import Canvas from "src/features/Canvas";
import Card from "src/features/Card";
import Controllers from "src/features/Controllers";
import {
    faGaugeHigh,
    faGears,
    faHeart,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import Button from "src/components/Button";
import { IconSlider } from "src/components/Slider";
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
    cellsState: CellsStateHook;
    canvasOnClick: (r: number, c: number) => void;
    tabs: { title: string; content: JSX.Element }[];
    liveCells: number;
}) {
    //
    const iterations = useStateObj(0);
    const config = useStateObj(false);
    const refreshRate = useStateObj(refreshRateVal.defaultVal);

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

    return (
        <Box className="space-y-6 my-5">
            <Canvas cellsState={cellsState.get} clickHandler={canvasOnClick} />

            <Grid container justifyContent="space-evenly">
                <Grid item md="auto">
                    <Controllers
                        init={init_}
                        next={next_}
                        stop={stop_}
                        refreshRate={refreshRate.get}
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

                <Grid item md={2}>
                    <Card
                        icon={faStopwatch}
                        tooltipLabel="Iterations"
                        value={iterations.get}
                    />
                </Grid>

                <Grid item md={2}>
                    <Card
                        icon={faHeart}
                        tooltipLabel="Live cells"
                        value={liveCells}
                    />
                </Grid>

                <Grid item md="auto">
                    <Button
                        tooltipLabel={"Configuration"}
                        icon={faGears}
                        size="2x"
                        onClick={() => config.set(!config.get)}
                    />
                </Grid>
            </Grid>

            {config.get && <CustomTabs tabs={tabs} />}
        </Box>
    );
}
