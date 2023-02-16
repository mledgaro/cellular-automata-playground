//

import CAPSectionSelector from "../components/CAPSectionSelector";
import { Neighborhood1D, Neighborhood2D } from "./Neighborhood";
import { Rules1D, Rules2D } from "./Rules";
import InitialState from "./InitialState";
import { useState } from "react";

const nbhdKeys = ["insitu", "grouped", "scattered"];

export function Settings1D({ nbhdWidth, mainCell }) {
    //

    const [nbhdIndex, setNbhdIndex] = useState(0);
    const [selected, setSelected] = useState(0);

    let nbhdType = nbhdKeys[nbhdIndex];

    return (
        <CAPSectionSelector
            sections={[
                {
                    label: "Neighborhood",
                    component: (
                        <Neighborhood1D
                            nbhdWidth={nbhdWidth}
                            mainCell={mainCell}
                            selected={{ get: nbhdIndex, set: setNbhdIndex }}
                        />
                    ),
                },
                {
                    label: "Rules",
                    component: (
                        <Rules1D
                            nbhdWidth={nbhdWidth.get}
                            mainCell={mainCell.get}
                            nbhdType={nbhdType}
                        />
                    ),
                },
                {
                    label: "Initial state",
                    component: <InitialState cellsNumber={100} />,
                },
            ]}
            selected={{ get: selected, set: setSelected }}
            size="lg"
            alignment="center"
        />
    );
}

export function Settings2D() {
    //

    const [selected, setSelected] = useState(0);

    return (
        <CAPSectionSelector
            sections={[
                { label: "Neighborhood", component: <Neighborhood2D /> },
                { label: "Rules", component: <Rules2D /> },
            ]}
            selected={{ get: selected, set: setSelected }}
            size="lg"
            alignment="center"
        />
    );
}
