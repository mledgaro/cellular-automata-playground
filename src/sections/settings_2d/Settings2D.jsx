//

import { useState } from "react";
import SectionSelector from "../../components/SectionSelector";
import Neighborhood2D from "./Neighborhood2D";
import { Rules2D } from "./Rules2D";

export default function Settings2D() {
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
