//

import { createContext, useState } from "react";

import CAPSectionSelector from "../../components/CAPSectionSelector";
import { NbhdInput1D, NbhdInput2D } from "../../components/NbhdInput";

export const NbhdContext1D = createContext();
export const NbhdContext2D = createContext();

export function Neighborhood1D({ nbhdWidth, mainCell, selected }) {
    //

    return (
        <NbhdContext1D.Provider
            value={{
                nbhdWidth: nbhdWidth,
                mainCell: mainCell,
            }}
        >
            <CAPSectionSelector
                sections={[
                    {
                        label: "In situ",
                        component: <NbhdInput1D type="insitu" />,
                    },
                    {
                        label: "Grouped",
                        component: <NbhdInput1D type="grouped" />,
                    },
                    {
                        label: "Scattered",
                        component: <NbhdInput1D type="scattered" />,
                    },
                ]}
                selected={selected}
                size="sm"
                alignment="center"
                bs5Class="w-75 mx-auto"
            />
        </NbhdContext1D.Provider>
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
            <CAPSectionSelector
                sections={[
                    {
                        label: "Moore",
                        component: <NbhdInput2D type="moore" />,
                    },
                    {
                        label: "Von Neumann",
                        component: <NbhdInput2D type="vonneumann" />,
                    },
                    {
                        label: "Diagonal",
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
