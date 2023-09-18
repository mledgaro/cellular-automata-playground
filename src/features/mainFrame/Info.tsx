import React, { useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import {
    faClose,
    faHeart,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector, useStateObj } from "src/app/hooks";

import InputNumber from "src/components/InputNumber";
import FloatingMenuButton from "src/components/FloatingMenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createArray } from "src/ts/Utils";
import {
    selectIterations,
    selectLimitIterations,
    setLimitIterations,
} from "src/app/slices/mainFrame/iterations";
import { selectFlowStatus } from "src/app/slices/mainFrame/flowStatus";

export default function Info({
    liveCells,
    historySize,
}: {
    liveCells: number;
    historySize: number;
}) {
    //

    return (
        <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item md={3} className="flex justify-center">
                <Iterations />
            </Grid>

            <Grid item md={3} className="flex justify-center">
                <LiveCells currentValue={liveCells} historySize={historySize} />
            </Grid>
        </Grid>
    );
}

function Iterations() {
    //
    const iterations = useAppSelector(selectIterations);
    const limitIterations = useAppSelector(selectLimitIterations);
    const dispatch = useAppDispatch();

    const limitIterations_ = useStateObj(0);

    return (
        <Box className="flex flex-row space-x-2 items-center select-none">
            <Box>
                <FloatingMenuButton
                    icon={faStopwatch}
                    iconOnShow={faClose}
                    iconSize="xl"
                    orientation="row"
                    content={
                        <InputNumber
                            state={limitIterations_}
                            min={0}
                            max={10_000}
                            step={10}
                            label="Pause at"
                        />
                    }
                    boxProps="bottom-0 left-0 w-[10rem] translate-x-[1rem] -translate-y-[3rem]"
                    onClose={() =>
                        dispatch(setLimitIterations(limitIterations_.get))
                    }
                />
            </Box>
            <Box className="text-tertiary text-xl">
                {iterations +
                    (limitIterations > 0 ? ` / ${limitIterations}` : "")}
            </Box>
        </Box>
    );
}

function LiveCells({
    currentValue,
    historySize,
}: {
    currentValue: number;
    historySize: number;
}) {
    //
    const status = useAppSelector(selectFlowStatus);

    const canvas = useRef<HTMLCanvasElement>(null);
    const formatter = useRef(new Intl.NumberFormat());
    const counter = useRef(0);
    const maxValue = useRef(0);
    const history = useRef(createArray(historySize, 0.01));

    const update = status !== "stopped";

    useEffect(() => {
        if (update) {
            if (currentValue > maxValue.current) {
                maxValue.current = currentValue;
            }

            if (counter.current < historySize) {
                history.current[counter.current] = currentValue;
            } else {
                history.current.shift();
                history.current.push(currentValue);
            }
            counter.current++;

            const gr = canvas.current?.getContext("2d");
            const w = canvas.current?.width ?? 0;
            const h = canvas.current?.height ?? 0;

            gr!.fillStyle = "#323031";
            gr!.fillRect(0, 0, w, h);

            gr!.lineWidth = 1;
            gr!.strokeStyle = "#bbb5bd";
            gr!.beginPath();

            history.current.forEach((val, i) => {
                gr!.moveTo(i, h);
                gr!.lineTo(i, h * (1 - val / maxValue.current));
                gr!.stroke();
            });
        }
    });

    useEffect(() => {
        counter.current = 0;
        maxValue.current = 0;
        history.current = createArray(historySize, 0.01);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historySize, update]);

    return (
        <Box className="flex flex-row items-center space-x-2.5">
            <FontAwesomeIcon
                icon={faHeart}
                size="2xl"
                className="text-primary"
            />
            <Box className="text-xl text-center text-tertiary w-[5rem]">
                {formatter.current.format(currentValue)}
            </Box>
            <canvas ref={canvas} width={history.current.length} height={50} />
        </Box>
    );
}
