//

import React from "react";
import { RangeReducerHook, StateObjHook } from "src/CustomHooks";
import { Cell, DeactivatedCell, SelectedCell } from "../../components/Cells";
import NumberInput from "../../components/NumberInput";
import { OptionGroup } from "../../components/SectionSelector";

export type NbhdType2D = "moore" | "vonneumann" | "diagonal";

function MainCellSelector({
    type,
    width,
    height,
    selected,
    extraClasses,
}: {
    type: NbhdType2D;
    width: number;
    height: number;
    selected: StateObjHook;
    extraClasses?: string;
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
                    <Cell onClick={() => selected.set({ r: r, c: c })} />
                )
            ) : (
                <DeactivatedCell onClick={() => selected.set({ r: r, c: c })} />
            );

            row.push(<td style={{ padding: "5px" }}>{cell}</td>);
        }
        cells.push(<tr>{row}</tr>);
    }

    return (
        <table className={`cap-container-dark-1 ${extraClasses || ""}`}>
            {cells}
        </table>
    );
}

function NbhdInput2D({
    type,
    width,
    height,
    mainCell,
}: {
    type: NbhdType2D;
    width: RangeReducerHook;
    height: RangeReducerHook;
    mainCell: StateObjHook;
}) {
    //

    return (
        <div className="row mt-2 mx-auto" style={{ width: "50%" }}>
            <div className="col">
                <NumberInput
                    label="Width"
                    value={width}
                    min={2}
                    max={8}
                    size="md"
                    alignment="center"
                    extraClasses="mb-2"
                />

                <NumberInput
                    label="Height"
                    value={height}
                    min={2}
                    max={8}
                    size="md"
                    alignment="center"
                />
            </div>

            <div className="col">
                <MainCellSelector
                    type={type}
                    width={width.get}
                    height={height.get}
                    selected={mainCell}
                    extraClasses="mx-auto"
                />
            </div>
        </div>
    );
}

export default function Neighborhood2D({
    type,
    width,
    height,
    mainCell,
}: {
    type: StateObjHook;
    width: RangeReducerHook;
    height: RangeReducerHook;
    mainCell: StateObjHook;
}) {
    //

    return (
        <div>
            <OptionGroup
                title="Type"
                options={[
                    {
                        label: "Moore",
                        value: "moore",
                    },
                    {
                        label: "Von Neumann",
                        value: "vonneumann",
                    },
                    {
                        label: "Diagonal",
                        value: "diagonal",
                    },
                ]}
                selected={type}
                size="sm"
                alignment="center"
                bs5Class="w-75 mx-auto"
            />

            <NbhdInput2D
                type={type.get}
                width={width}
                height={height}
                mainCell={mainCell}
            />
        </div>
    );
}
