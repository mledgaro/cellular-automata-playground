//

import { CAPNbhdInput1D, NbhdInput2D } from "../../components/CAPNbhdInput";
import CAPNumberInput from "../../components/CAPNumberInput";
import CAPSelector from "../../components/CAPSelector";
import CAPSectionSelector from "../../components/CAPSectionSelector";

import { createContext, useState } from "react";

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
                        component: <CAPNbhdInput1D type="insitu" />,
                    },
                    {
                        label: "Grouped",
                        component: <CAPNbhdInput1D type="grouped" />,
                    },
                    {
                        label: "Scattered",
                        component: <CAPNbhdInput1D type="scattered" />,
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
                    component: <NbhdInput2D />,
                },
                {
                    label: "Von Neumann",
                    component: <div>Von Neumann</div>,
                },
                {
                    label: "Diagonal",
                    component: <div>Diagonal</div>,
                },
            ]}
            selected={{ get: selected, set: setSelected }}
            size="sm"
            alignment="center"
            bs5Class="w-75 mx-auto"
        />
    );
}
