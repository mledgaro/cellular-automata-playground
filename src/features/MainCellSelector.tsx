//
import React, { useEffect } from "react";
import { StateHookObj, useAppDispatch, useAppSelector } from "src/app/hooks";
import { DeactivatedCell, Ellipses, IconCell, SelectedCell } from "./Cells";
import { setMainCell } from "src/app/slices/mainCell";
import { Box } from "@mui/material";
import { NbhdType2D } from "src/sections/settings_2d/Neighborhood2D";

export function MainCellSelector1D() {
    //

    const width = useAppSelector((state) => state.nbhdWidth.value);
    const type = useAppSelector((state) => state.nbhdType.value);
    const mainCell = useAppSelector((state) => state.mainCell.value);

    const dispatch = useAppDispatch();

    const set = (val: number) => dispatch(setMainCell(val));

    let cells = [];

    for (let i = 0; i < width; i++) {
        cells.push(<IconCell onClick={() => set(i)} size="xl" />);
    }

    if (mainCell !== -1) {
        cells.splice(
            mainCell,
            1,
            <SelectedCell size={"2xl"} onClick={() => set(-1)} />
        );
    }

    useEffect(() => {
        //
        if (mainCell === width) {
            dispatch(setMainCell(mainCell - 1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    return (
        <Box className="cap-component-container w-max p-2 space-x-1.5">
            <Ellipses
                size="xs"
                cells={cells}
                mainCell={mainCell}
                nbhdType={type}
            />
        </Box>
    );
}

export function MainCellSelector2D({
    type,
    width,
    height,
    selected,
}: {
    type: NbhdType2D;
    width: number;
    height: number;
    selected: StateHookObj;
}) {
    //

    let isActive;

    switch (type) {
        case "moore":
            isActive = (r: number, c: number) => true;
            break;

        case "vonneumann":
            isActive = (r: number, c: number) =>
                selected.get.r === r || selected.get.c === c;
            break;

        case "diagonal":
            isActive = (r: number, c: number) =>
                Math.abs(selected.get.r - r) === Math.abs(selected.get.c - c);
            break;
    }

    let cells = [];

    for (let r = 0, row, sel; r < height; r++) {
        row = [];
        for (let c = 0, cell; c < width; c++) {
            //

            sel = r === selected.get.r && c === selected.get.c;

            cell = isActive(r, c) ? (
                sel ? (
                    <SelectedCell
                        onClick={() => selected.set({ r: -1, c: -1 })}
                    />
                ) : (
                    <IconCell onClick={() => selected.set({ r: r, c: c })} />
                )
            ) : (
                <DeactivatedCell onClick={() => selected.set({ r: r, c: c })} />
            );

            row.push(<td style={{ padding: "5px" }}>{cell}</td>);
        }
        cells.push(<tr>{row}</tr>);
    }

    return <table className={"cap-component-container"}>{cells}</table>;
}
