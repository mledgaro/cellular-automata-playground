//
import React, { useEffect } from "react";
import {
    faSquare as faSquareRegular,
    faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import {
    faShuffle,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Stack } from "@mui/material";
import { IconButton } from "src/components/Button";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    resizeRules2d,
    selectRules2d,
    setRules2dKeepAll,
    setRules2dRandom,
    setRules2dTurnOffAll,
    setRules2dTurnOnAll,
    toggleRule2d,
} from "src/app/slices/ca2d/rules2d";
import { selectNbhd2d } from "src/app/slices/ca2d/nbhd2d";
import { countTrue2d } from "src/ts/Utils";

const cellClasses = "text-center text-xl select-none";

export default function Rules2d() {
    //
    const rules = useAppSelector(selectRules2d);
    const nbhd = useAppSelector(selectNbhd2d);
    const dispatch = useAppDispatch();

    const toggle = (idx: number) => dispatch(toggleRule2d(idx));

    useEffect(() => {
        dispatch(resizeRules2d(countTrue2d(nbhd) + 1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box className="space-y-4">
            <Box className="flex max-w-[90%] w-fit mx-auto space-x-3">
                <Stack className="inline-block w-fit min-w-fit text-tertiary font-bold">
                    <Box className={cellClasses}>Neighbors</Box>
                    <Box className={cellClasses}>Next state</Box>
                </Stack>
                <Box className="inline-block text-primary flex flex-nowrap w-auto overflow-x-auto space-x-3">
                    {rules.map((st, idx) => (
                        <Rule
                            key={idx}
                            idx={idx}
                            value={st}
                            toggle={() => toggle(idx)}
                        />
                    ))}
                </Box>
            </Box>
            <Controls />
        </Box>
    );
}

function Rule({
    idx,
    value,
    toggle,
}: {
    idx: number;
    value: boolean | null;
    toggle: () => void;
}) {
    //
    let icon =
        value === null
            ? faSquareMinus
            : value
            ? faSquareSolid
            : faSquareRegular;

    return (
        <Stack className="inline-block" onClick={toggle}>
            <Box className={cellClasses}>{idx}</Box>
            <Box className={cellClasses}>
                <FontAwesomeIcon icon={icon} size="xl" />
            </Box>
        </Stack>
    );
}

function Controls() {
    //
    const dispatch = useAppDispatch();

    return (
        <Box className="w-fit mx-auto space-x-3">
            <IconButton
                tooltipLabel="All keep"
                icon={faSquareMinus}
                iconSize="xl"
                onClick={() => dispatch(setRules2dKeepAll())}
            />
            <IconButton
                tooltipLabel="All dead"
                icon={faSquareRegular}
                iconSize="xl"
                onClick={() => dispatch(setRules2dTurnOffAll())}
            />
            <IconButton
                tooltipLabel="All alive"
                icon={faSquareSolid}
                iconSize="xl"
                onClick={() => dispatch(setRules2dTurnOnAll())}
            />
            <IconButton
                tooltipLabel="Random"
                icon={faShuffle}
                iconSize="xl"
                onClick={() => dispatch(setRules2dRandom())}
            />
        </Box>
    );
}
