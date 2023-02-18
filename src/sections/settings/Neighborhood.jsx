//

import { createContext, useState } from "react";

import CAPSectionSelector from "../../components/CAPSectionSelector";
import { NbhdInput1D, NbhdInput2D } from "../../components/NbhdInput";

export const NbhdContext = createContext();

export function Neighborhood1D({ nbhdWidth, mainCell, selected }) {
    //

    return (
        <NbhdContext.Provider
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
        </NbhdContext.Provider>
    );
}

export function Neighborhood2D() {
    //

    const [selected, setSelected] = useState(0);

    return (
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
            selected={{ get: selected, set: setSelected }}
            size="sm"
            alignment="center"
            bs5Class="w-75 mx-auto"
        />
    );
}
