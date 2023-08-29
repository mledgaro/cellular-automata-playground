//
import {
    faSquareCheck,
    faSquareMinus,
    faSquarePlus,
    faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare as faSquareRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nbhd2dHook } from "src/app/hooks/nbhd2d";
import { Box, Button, ButtonProps, styled } from "@mui/material";
import { ResizeBtn } from "src/components/Button";

export default function Nbhd2dEditor({
    state,
    editable,
}: {
    state: Nbhd2dHook;
    editable: boolean;
}) {
    //
    const toggle = editable
        ? (r: number, c: number) => state.toggle({ r: r, c: c })
        : (r: number, c: number) => {};

    let onClick: () => void;

    return (
        <Box className="cap-component-container p-2 flex flex-row space-x-3">
            {/* start col */}
            {editable && <ResizeButtons nbhd={state} atStart col />}
            {/* nbhd */}
            <Box className="space-y-3">
                {/* start row */}
                {editable && <ResizeButtons nbhd={state} atStart />}
                <Box className="space-y-1-">
                    {state.nbhd.map((row, r) => {
                        return (
                            <Box className="space-x-1">
                                {row.map((cell, c) => {
                                    onClick = () => toggle(r, c);
                                    return state.mainCell.r === r &&
                                        state.mainCell.c === c ? (
                                        <FontAwesomeIcon
                                            icon={faSquareCheck}
                                            size="xl"
                                        />
                                    ) : state.nbhd[r][c] ? (
                                        <FontAwesomeIcon
                                            icon={faSquareRegular}
                                            size="xl"
                                            onClick={onClick}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faSquareXmark}
                                            size="xl"
                                            className="text-french-gray"
                                            onClick={onClick}
                                        />
                                    );
                                })}
                            </Box>
                        );
                    })}
                </Box>
                {/* end row */}
                {editable && <ResizeButtons nbhd={state} />}
            </Box>
            {/* end col */}
            {editable && <ResizeButtons nbhd={state} col />}
        </Box>
    );
}

function ResizeButtons({
    nbhd,
    col = false,
    atStart = false,
}: {
    nbhd: Nbhd2dHook;
    col?: boolean;
    atStart?: boolean;
}) {
    const classes = col ? "flex-col space-y-1" : "space-x-1";
    const onclick = col
        ? (remove: boolean) => nbhd.addColumn(atStart, remove)
        : (remove: boolean) => nbhd.addRow(atStart, remove);
    const limit = atStart
        ? 0
        : (col ? nbhd.nbhd[0].length : nbhd.nbhd.length) - 1;
    const disableRemove = col
        ? nbhd.mainCell.c === limit || nbhd.nbhd[0].length === 2
        : nbhd.mainCell.r === limit || nbhd.nbhd.length === 2;
    const disableAdd = col
        ? nbhd.nbhd[0].length === 10
        : nbhd.nbhd.length === 10;

    return (
        <Box className={"flex justify-center " + classes}>
            <ResizeBtn
                variant="contained"
                onClick={() => onclick(true)}
                disabled={disableRemove}
            >
                <FontAwesomeIcon icon={faSquareMinus} />
            </ResizeBtn>
            <ResizeBtn
                variant="contained"
                onClick={() => onclick(false)}
                disabled={disableAdd}
            >
                <FontAwesomeIcon icon={faSquarePlus} />
            </ResizeBtn>
        </Box>
    );
}
