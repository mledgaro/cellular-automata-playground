//
import React, { useEffect } from "react";
import CustomRadioGroup from "src/components/RadioGroup";
import { Box, Grid } from "@mui/material";
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
import { StateObjHook, useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    selectNbhdCenter2d,
    setNbhdCenter2d,
} from "src/app/slices/ca2d/nbhdCenter2d";
import {
    addColNbhd2d,
    addRowNbhd2d,
    removeColNbhd2d,
    removeRowNbhd2d,
    selectNbhd2d,
    setNbhd2dCustom,
    setNbhd2dMoore,
    setNbhd2dVonNeumann,
    toggleNbhd2dCell,
} from "src/app/slices/ca2d/nbhd2d";

export default function Nbhd2d({ type }: { type: StateObjHook<NbhdType2D> }) {
    //
    const dispatch = useAppDispatch();

    useEffect(() => {
        switch (type.get) {
            case "moore":
                dispatch(setNbhd2dMoore());
                break;
            case "vonneumann":
                dispatch(setNbhd2dVonNeumann());
                break;
            case "custom":
                dispatch(setNbhd2dCustom());
                break;
        }
        dispatch(setNbhdCenter2d({ r: 1, c: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type.get]);

    return (
        <Grid container className="">
            {/* row */}
            <Grid item container alignItems="center" className="">
                {/* type */}
                <Grid item xs className="flex justify-center">
                    <CustomRadioGroup
                        label="Type"
                        options={[
                            { label: "Moore", value: "moore" },
                            { label: "Von Neumann", value: "vonneumann" },
                            { label: "Custom", value: "custom" },
                        ]}
                        defaultVal="moore"
                        value={type.get}
                        onChange={(val: string) => type.set(val as NbhdType2D)}
                    />
                </Grid>
                {/* main cell selector */}
                <Grid item xs className="flex justify-center">
                    <NbhdEditor editable={type.get === "custom"} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export function NbhdEditor({ editable }: { editable: boolean }) {
    //
    const center = useAppSelector(selectNbhdCenter2d);
    const nbhd = useAppSelector(selectNbhd2d);

    const dispatch = useAppDispatch();

    const toggle = editable
        ? (r: number, c: number) => dispatch(toggleNbhd2dCell({ r: r, c: c }))
        : (r: number, c: number) => {};
    const setMain = editable
        ? (r: number, c: number) => dispatch(setNbhdCenter2d({ r: r, c: c }))
        : (r: number, c: number) => {};

    let onClick: () => void;
    let onDblClick: () => void;

    return (
        <Box className="flex flex-row text-primary space-x-3">
            {/* nbhd */}
            <Box className="space-y-3">
                <Box className="space-y-1-">
                    {nbhd.map((row, r) => {
                        return (
                            <Box className="space-x-1">
                                {row.map((nbr, c) => {
                                    onClick = () => toggle(r, c);
                                    onDblClick = () => setMain(r, c);
                                    return center.r === r && center.c === c ? (
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
                {editable && <ResizeButtons />}
            </Box>
            {editable && <ResizeButtons col />}
        </Box>
    );
}

function ResizeButtons({ col = false }: { col?: boolean }) {
    //
    const nbhd = useAppSelector(selectNbhd2d);
    const dispatch = useAppDispatch();

    const classes = col ? "flex-col space-y-1" : "space-x-1";
    const add = col
        ? () => dispatch(addColNbhd2d())
        : () => dispatch(addRowNbhd2d());
    const remove = col
        ? () => dispatch(removeColNbhd2d())
        : () => dispatch(removeRowNbhd2d());
    const disableRemove = col ? nbhd[0].length === 2 : nbhd.length === 2;
    const disableAdd = col ? nbhd[0].length === 10 : nbhd.length === 10;

    return (
        <Box className={"flex justify-center " + classes}>
            {col && (
                <MiniButton icon={faPlus} onClick={add} disabled={disableAdd} />
            )}

            <MiniButton
                icon={faMinus}
                onClick={remove}
                disabled={disableRemove}
            />

            {!col && (
                <MiniButton icon={faPlus} onClick={add} disabled={disableAdd} />
            )}
        </Box>
    );
}
