//

import { createContext } from "react";
import { NbhdInput2D } from "../../components/CellGroup";
import SectionSelector from "../../components/SectionSelector";

export const NbhdContext2D = createContext();

export default function Neighborhood2D({ nbhdType, nbhdWidth, nbhdHeight, mainCell }) {
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
