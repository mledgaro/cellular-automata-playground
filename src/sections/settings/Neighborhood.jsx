//

import { createContext, useEffect, useState } from "react";

import SectionSelector from "../../components/SectionSelector";
import {
    CellGroup1D,
    NbhdInput2D,
} from "../../components/NbhdInput";
import NumberInput from "../../components/NumberInput";

export const NbhdContext1D = createContext();
export const NbhdContext2D = createContext();

function NbhdType({ includeMainCell, type }) {
    //

    if (includeMainCell.get === "cellout" && type.get === "contiguos") {
        type.set("grouped");
    }

    return (
        <SectionSelector
            sections={[
                {
                    label: "Main cell in",
                    value: "cellin",
                    component: (
                        <SectionSelector
                            sections={[
                                { label: "Contiguos", value: "contiguos" },
                                { label: "Grouped", value: "grouped" },
                                { label: "Scattered", value: "scattered" },
                            ]}
                            selected={type}
                            size="sm"
                            alignment="center"
                        />
                    ),
                },
                {
                    label: "Main cell out",
                    value: "cellout",
                    component: (
                        <SectionSelector
                            sections={[
                                { label: "Grouped", value: "grouped" },
                                { label: "Scattered", value: "scattered" },
                            ]}
                            selected={type}
                            size="sm"
                            alignment="center"
                        />
                    ),
                },
            ]}
            selected={includeMainCell}
            size="sm"
            alignment="center"
        />
    );
}

export function Neighborhood1D({ nbhdWidth, includeMainCell, mainCell, type }) {
    //

    return (
        <div className="row mx-auto" style={{width: "80%"}}>
            <div className="col-3 d-flex align-items-center">
                <NumberInput
                    label="Width"
                    value={nbhdWidth}
                    min={2}
                    max={8}
                    alignment="center"
                />
            </div>

            <div className="col-5">
                <NbhdType includeMainCell={includeMainCell} type={type} />
            </div>

            <div className="col-4 d-flex align-items-center">
                <CellGroup1D
                    type={type.get}
                    numCells={nbhdWidth.get}
                    selected={mainCell}
                    allowSelection={includeMainCell.get === "cellin"}
                />
            </div>
        </div>
    );
}

export function Neighborhood2D({ nbhdType, nbhdWidth, nbhdHeight, mainCell }) {
    //

    return (
        <NbhdContext2D.Provider
            value={{
                nbhdWidth: nbhdWidth,
                nbhdHeight: nbhdHeight,
                mainCell: mainCell,
            }}
        >
            <SectionSelector
                sections={[
                    {
                        label: "Moore",
                        value: "moore",
                        component: <NbhdInput2D type="moore" />,
                    },
                    {
                        label: "Von Neumann",
                        value: "vonneuman",
                        component: <NbhdInput2D type="vonneumann" />,
                    },
                    {
                        label: "Diagonal",
                        value: "diagonal",
                        component: <NbhdInput2D type="diagonal" />,
                    },
                ]}
                selected={nbhdType}
                size="sm"
                alignment="center"
                bs5Class="w-75 mx-auto"
            />
        </NbhdContext2D.Provider>
    );
}
