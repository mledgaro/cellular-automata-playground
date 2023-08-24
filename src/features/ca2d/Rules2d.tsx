//
import React from "react";
import {
    faSquare as faSquareRegular,
    faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { faSquare as faSquareSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Stack } from "@mui/material";
import { Rule2dState, Rules2dHook } from "src/app/hooks/rules2d";

const cellClasses = "text-center text-xl select-none";

export default function Rules2d({ state }: { state: Rules2dHook }) {
    //
    return (
        <Box className="cap-component-container flex max-w-[90%] w-fit mx-auto px-2 space-x-3">
            <Stack className="inline-block w-fit min-w-fit test-border-">
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
        value === undefined
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
