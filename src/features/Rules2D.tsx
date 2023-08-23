//
import React from "react";
import {
    faSquare as faSquareRegular,
    faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { faSquare as faSquareSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NbhdType2D, neighborhood2dSize } from "../ts/Utils";
import { useStateObj } from "src/app/hooks";
import { Box, Stack } from "@mui/material";

export function Rules2D({
    nbhdType,
    nbhdWidth,
    nbhdHeight,
    mainCell,
}: {
    nbhdType: NbhdType2D;
    nbhdWidth: number;
    nbhdHeight: number;
    mainCell: { r: number; c: number };
}) {
    //
    let rules = [];
    let nbhdSize = neighborhood2dSize(
        nbhdWidth,
        nbhdHeight,
        mainCell,
        nbhdType
    );
    const cellClasses = "text-center text-xl select-none";

    for (let i = 0; i <= nbhdSize; i++) {
        rules.push(
            <Stack className="inline-block">
                <Box className={cellClasses}>{i}</Box>
                <Box className={cellClasses}>
                    <Rule2D />
                </Box>
            </Stack>
        );
    }

    return (
        <Box className="cap-component-container flex max-w-[90%] w-fit mx-auto px-2 space-x-3">
            <Stack className="inline-block w-fit min-w-fit test-border-">
                <Box className={cellClasses}>Neighbors</Box>
                <Box className={cellClasses}>Next state</Box>
            </Stack>
            <Box className="inline-block flex flex-nowrap w-auto overflow-x-auto space-x-3">
                {rules}
            </Box>
        </Box>
    );
}

function Rule2D() {
    //
    const state = useStateObj<number>(0);
    let icon;

    switch (state.get) {
        case 1:
            icon = faSquareRegular;
            break;
        case 2:
            icon = faSquareSolid;
            break;
        default:
            icon = faSquareMinus;
    }

    return (
        <FontAwesomeIcon
            icon={icon}
            size="xl"
            onClick={() => state.set(state.get === 2 ? 0 : state.get + 1)}
        />
    );
}
