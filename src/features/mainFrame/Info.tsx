import React, { useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import { faHeart, faStopwatch } from "@fortawesome/free-solid-svg-icons";

import { StateObjHook, useStateObj } from "src/app/hooks";

import InputNumber from "src/components/InputNumber";
import { FloatMenu } from "src/components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createArray, setArrayItem } from "src/ts/Utils";

export default function Info({
    iterations,
    stopIterations,
    liveCells,
    historySize,
    update,
}: {
    iterations: number;
    stopIterations: StateObjHook<number>;
    liveCells: number;
    historySize: number;
    update: boolean;
}) {
    //

    return (
        <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item md={3} className="flex justify-center">
                <Iterations
                    iterations={iterations}
                    stopIterations={stopIterations}
                />
            </Grid>

            <Grid item md={3} className="flex justify-center">
                {/* <Label
                    icon={faHeart}
                    tooltipLabel="Live cells"
                    content={liveCells.toString()}
                    textSize="xl"
                    iconSize="2xl"
                /> */}
                <LiveCells
                    currentValue={liveCells}
                    historySize={historySize}
                    update={update}
                />
            </Grid>
        </Grid>
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

function LiveCells({
    currentValue,
    historySize,
    update,
}: {
    currentValue: number;
    historySize: number;
    update: boolean;
}) {
    //
    const canvas = useRef<HTMLCanvasElement>(null);
    const formatter = useRef(new Intl.NumberFormat());
    const counter = useRef(0);
    const maxValue = useRef(0);
    const history = useStateObj(createArray(historySize, 0));

    useEffect(() => {
        counter.current = 0;
        maxValue.current = 0;
        history.set(createArray(historySize, 0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historySize, update]);

    useEffect(() => {
        //
        if (update) {
            if (currentValue > maxValue.current) {
                maxValue.current = currentValue;
            }

            if (counter.current < historySize) {
                history.set(
                    setArrayItem(history.get, counter.current, currentValue)
                );
            } else {
                history.set(history.get.slice(1).concat([currentValue]));
            }
            counter.current++;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValue]);

    useEffect(() => {
        const gr = canvas.current?.getContext("2d");
        const w = canvas.current?.width ?? 0;
        const h = canvas.current?.height ?? 0;

        gr!.fillStyle = "#323031";
        gr!.fillRect(0, 0, w, h);

        gr!.lineWidth = 1;
        // gr!.strokeStyle = "#ffd166";
        gr!.strokeStyle = "#bbb5bd";
        gr!.beginPath();

        history.get.forEach((val, i) => {
            gr!.moveTo(i, h);
            gr!.lineTo(i, h * (1 - val / maxValue.current));
            gr!.stroke();
        });
    }, [history.get]);

    return (
        <Box className="flex flex-row items-center space-x-2.5 cap-component-container p-2">
            <FontAwesomeIcon
                icon={faHeart}
                size="2xl"
                className="text-primary"
            />
            <Box className="text-xl text-center text-tertiary w-[5rem]">
                {formatter.current.format(currentValue)}
            </Box>
            <canvas ref={canvas} width={history.get.length} height={50} />
        </Box>
    );
}
