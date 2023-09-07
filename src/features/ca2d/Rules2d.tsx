//
import React from "react";
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
import { Rule2dState, Rules2dHook } from "src/app/hooks/rules2d";
import Button from "src/components/Button";

const cellClasses = "text-center text-xl select-none";

export default function Rules2d({ state }: { state: Rules2dHook }) {
    //
    return (
        <Box className="space-y-1.5">
            <Box className="cap-component-container flex max-w-[90%] w-fit mx-auto px-2 space-x-3">
                <Stack className="inline-block w-fit min-w-fit text-tertiary font-bold">
                    <Box className={cellClasses}>Neighbors</Box>
                    <Box className={cellClasses}>Next state</Box>
                </Stack>
                <Box className="inline-block flex flex-nowrap w-auto overflow-x-auto space-x-3">
                    {state.get.map((st, idx) => (
                        <Rule
                            idx={idx}
                            value={st}
                            toggle={() => state.toggle(idx)}
                        />
                    ))}
                </Box>
            </Box>
            <Controls rules={state} />
        </Box>
    );
}

function Rule({
    idx,
    value,
    toggle,
}: {
    idx: number;
    value: Rule2dState;
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

function Controls({ rules }: { rules: Rules2dHook }) {
    return (
        <Box className="w-fit mx-auto space-x-1">
            <Button
                tooltipLabel="All keep"
                icon={faSquareMinus}
                size="xl"
                onClick={rules.allKeep}
            />
            <Button
                tooltipLabel="All dead"
                icon={faSquareRegular}
                size="xl"
                onClick={rules.allDead}
            />
            <Button
                tooltipLabel="All alive"
                icon={faSquareSolid}
                size="xl"
                onClick={rules.allAlive}
            />
            <Button
                tooltipLabel="Random"
                icon={faShuffle}
                size="xl"
                onClick={rules.random}
            />
        </Box>
    );
}
