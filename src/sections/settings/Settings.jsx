//

import { useState } from "react";

import SectionSelector from "../../components/SectionSelector";
import { Neighborhood1D, Neighborhood2D } from "./Neighborhood";
import { Rules1D, Rules2D } from "./Rules";
import InitialState from "./InitialState";

const nbhdKeys1D = ["insitu", "grouped", "scattered"];
const nbhdKeys2D = ["moore", "vonneumann", "diagonal"];

function Settings1D() {
    //

    const [section, setSection] = useState(0);

    const [nbhdIndex, setNbhdIndex] = useState(0);
    const [nbhdWidth, setNbhdWidth] = useState(3);
    const [mainCell, setMainCell] = useState(1);

    return (
        <SectionSelector
            title="Settings"
            sections={[
                {
                    label: "Neighborhood",
                    component: (
                        <Neighborhood1D
                            nbhdWidth={{ get: nbhdWidth, set: setNbhdWidth }}
                            mainCell={{ get: mainCell, set: setMainCell }}
                            selected={{ get: nbhdIndex, set: setNbhdIndex }}
                        />
                    ),
                },
                {
                    label: "Rules",
                    component: (
                        <Rules1D
                            nbhdWidth={nbhdWidth}
                            mainCell={mainCell}
                            nbhdType={nbhdKeys1D[nbhdIndex]}
                        />
                    ),
                },
                {
                    label: "Initial state",
                    component: <InitialState cellsNumber={256} />,
                },
            ]}
            selected={{ get: section, set: setSection }}
            size="lg"
            alignment="center"
        />
    );
}

function Settings2D() {
    //

    const [section, setSection] = useState(0);

    const [nbhdIndex, setNbhdIndex] = useState(0);
    const [nbhdWidth, setNbhdWidth] = useState(3);
    const [nbhdHeight, setNbhdHeight] = useState(3);
    const [mainCell, setMainCell] = useState({ r: 1, c: 1 });

    return (
        <SectionSelector
            title="Settings"
            sections={[
                {
                    label: "Neighborhood",
                    component: (
                        <Neighborhood2D
                            nbhdType={{ get: nbhdIndex, set: setNbhdIndex }}
                            nbhdWidth={{ get: nbhdWidth, set: setNbhdWidth }}
                            nbhdHeight={{ get: nbhdHeight, set: setNbhdHeight }}
                            mainCell={{ get: mainCell, set: setMainCell }}
                        />
                    ),
                },
                {
                    label: "Rules",
                    component: (
                        <Rules2D
                            nbhdType={nbhdKeys2D[nbhdIndex]}
                            nbhdWidth={nbhdWidth}
                            nbhdHeight={nbhdHeight}
                            mainCell={mainCell}
                        />
                    ),
                },
            ]}
            selected={{ get: section, set: setSection }}
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
