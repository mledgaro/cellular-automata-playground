//
import React from "react";
import CustomRadioGroup from "src/components/RadioGroup";
import { Box, Grid } from "@mui/material";
import { Nbhd2dHook } from "src/app/hooks/nbhd2d";
import { NbhdType2D } from "src/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { MiniButton } from "src/components/Button";
import {
    faMinus,
    faPlus,
    faSquareCheck,
    faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Nbhd2d({ state }: { state: Nbhd2dHook }) {
    //
    return (
        <Grid container className="section-container">
            {/* row */}
            <Grid item container alignItems="center" className="">
                {/* type */}
                <Grid item xs className="flex justify-center">
                    <CustomRadioGroup
                        className="h-fit"
                        label="Type"
                        options={[
                            { label: "Moore", value: "moore" },
                            { label: "Von Neumann", value: "vonneumann" },
                            { label: "Custom", value: "custom" },
                        ]}
                        defaultVal="moore"
                        value={state.type}
                        onChange={(val: string) =>
                            state.setType(val as NbhdType2D)
                        }
                    />
                </Grid>
                {/* main cell selector */}
                <Grid item xs className="flex justify-center">
                    <NbhdEditor
                        state={state}
                        editable={state.type === "custom"}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export function NbhdEditor({
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
                                            icon={faSquare}
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
            <MiniButton
                icon={faMinus}
                onClick={() => onclick(true)}
                disabled={disableRemove}
            />
            <MiniButton
                icon={faPlus}
                onClick={() => onclick(false)}
                disabled={disableAdd}
            />
        </Box>
    );
}
