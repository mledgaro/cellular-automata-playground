//
import {
    faSquareCheck,
    faMinus,
    faPlus,
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
    const setMain = editable
        ? (r: number, c: number) => state.setMainCell(r, c)
        : (r: number, c: number) => {};

    let onClick: () => void;
    let onDblClick: () => void;

    return (
        <Box className="cap-component-container p-2 flex flex-row space-x-3">
            {/* nbhd */}
            <Box className="space-y-3">
                <Box className="space-y-1-">
                    {state.nbhd.map((row, r) => {
                        return (
                            <Box className="space-x-1">
                                {row.map((nbr, c) => {
                                    onClick = () => toggle(r, c);
                                    onDblClick = () => setMain(r, c);
                                    return state.mainCell.r === r &&
                                        state.mainCell.c === c ? (
                                        <FontAwesomeIcon
                                            icon={faSquareCheck}
                                            size="xl"
                                        />
                                    ) : nbr ? (
                                        <FontAwesomeIcon
                                            icon={faSquareRegular}
                                            size="xl"
                                            onClick={onClick}
                                            onDoubleClick={onDblClick}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faSquareXmark}
                                            size="xl"
                                            className="text-tertiary"
                                            onClick={onClick}
                                            onDoubleClick={onDblClick}
                                        />
                                    );
                                })}
                            </Box>
                        );
                    })}
                </Box>
                {editable && <ResizeButtons nbhd={state} />}
            </Box>
            {editable && <ResizeButtons nbhd={state} col />}
        </Box>
    );
}

function ResizeButtons({
    nbhd,
    col = false,
}: {
    nbhd: Nbhd2dHook;
    col?: boolean;
}) {
    const classes = col ? "flex-col space-y-1" : "space-x-1";
    const onclick = col
        ? (remove: boolean) => nbhd.addColumn(remove)
        : (remove: boolean) => nbhd.addRow(remove);
    const disableRemove = col
        ? nbhd.nbhd[0].length === 2
        : nbhd.nbhd.length === 2;
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
                <FontAwesomeIcon icon={faMinus} />
            </ResizeBtn>
            <ResizeBtn
                variant="contained"
                onClick={() => onclick(false)}
                disabled={disableAdd}
            >
                <FontAwesomeIcon icon={faPlus} />
            </ResizeBtn>
        </Box>
    );
}
