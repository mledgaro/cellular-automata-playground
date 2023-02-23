//

import { useState } from "react";

import SectionSelector from "../../components/SectionSelector";
import { Neighborhood1D, Neighborhood2D } from "./Neighborhood";
import { Rules1D, Rules2D } from "./Rules";
import InitialState from "./InitialState";


function Settings1D() {
    //

    const [getSection, setSection] = useState("nbhd");

    const [getNbhdWidth, setNbhdWidth] = useState(3);
    const [getMainCell, setMainCell] = useState(1);
    const [getIncludeMainCell, setIncludeMainCell] = useState("cellin");
    const [getNbhdType, setNbhdType] = useState("contiguos");

    return (
        <SectionSelector
            title="Settings"
            sections={[
                {
                    label: "Neighborhood",
                    value: "nbhd",
                    component: (
                        <Neighborhood1D
                            nbhdWidth={{ get: getNbhdWidth, set: setNbhdWidth }}
                            includeMainCell={{
                                get: getIncludeMainCell,
                                set: setIncludeMainCell,
                            }}
                            mainCell={{ get: getMainCell, set: setMainCell }}
                            type={{ get: getNbhdType, set: setNbhdType }}
                        />
                    ),
                },
                {
                    label: "Rules",
                    value: "rules",
                    component: (
                        <Rules1D
                            nbhdWidth={getNbhdWidth}
                            mainCell={getMainCell}
                            nbhdType={getNbhdType}
                        />
                    ),
                },
                {
                    label: "Initial state",
                    value: "initstate",
                    component: <InitialState numCells={256} />,
                },
            ]}
            selected={{ get: getSection, set: setSection }}
            size="lg"
            alignment="center"
        />
    );
}

function Settings2D() {
    //

    const [getSection, setSection] = useState("nbhd");

    const [getNbhdType, setNbhdType] = useState("moore");
    const [getNbhdWidth, setNbhdWidth] = useState(3);
    const [getNbhdHeight, setNbhdHeight] = useState(3);
    const [getMainCell, setMainCell] = useState({ r: 1, c: 1 });

    return (
        <SectionSelector
            title="Settings"
            sections={[
                {
                    label: "Neighborhood",
                    value: "nbhd",
                    component: (
                        <Neighborhood2D
                            nbhdType={{ get: getNbhdType, set: setNbhdType }}
                            nbhdWidth={{ get: getNbhdWidth, set: setNbhdWidth }}
                            nbhdHeight={{
                                get: getNbhdHeight,
                                set: setNbhdHeight,
                            }}
                            mainCell={{ get: getMainCell, set: setMainCell }}
                        />
                    ),
                },
                {
                    label: "Rules",
                    value: "rules",
                    component: (
                        <Rules2D
                            nbhdType={getNbhdType}
                            nbhdWidth={getNbhdWidth}
                            nbhdHeight={getNbhdHeight}
                            mainCell={getMainCell}
                        />
                    ),
                },
            ]}
            selected={{ get: getSection, set: setSection }}
            size="lg"
            alignment="center"
        />
    );
}

export default function Settings({ dimension }) {
    if (dimension === 1) {
        return <Settings1D />;
    } else {
        // dimension === 2
        return <Settings2D />;
    }
}
