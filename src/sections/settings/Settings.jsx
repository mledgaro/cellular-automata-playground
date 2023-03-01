//

import { useEffect, useState } from "react";

import SectionSelector from "../../components/SectionSelector";
import { Neighborhood1D, Neighborhood2D } from "./Neighborhood";
import { Rules1D, Rules2D } from "./Rules";
import InitialState from "./InitialState";
import { randomBoolArray } from "../../js/Utils";
import { useStateObj } from "../../components/CustomHooks";

export function Settings1D({
    numCells,
    nbhdWidth,
    mainCell,
    includeMainCell,
    nbhdType,
    rulesState,
    initState,
}) {
    //

    const section = useStateObj("nbhd");

    useEffect(() => {
        rulesState.set(randomBoolArray(Math.pow(2, nbhdWidth.get)));
    }, [nbhdWidth.get]);

    return (
        <SectionSelector
            title="Settings"
            sections={[
                {
                    label: "Neighborhood",
                    value: "nbhd",
                    component: (
                        <Neighborhood1D
                            nbhdWidth={nbhdWidth}
                            includeMainCell={includeMainCell}
                            mainCell={mainCell}
                            type={nbhdType}
                        />
                    ),
                },
                {
                    label: "Rules",
                    value: "rules",
                    component: (
                        <Rules1D
                            nbhdWidth={nbhdWidth.get}
                            mainCell={
                                includeMainCell.get === "cellout"
                                    ? -1
                                    : mainCell.get
                            }
                            nbhdType={nbhdType.get}
                            rulesState={rulesState}
                        />
                    ),
                },
                {
                    label: "Initial state",
                    value: "initstate",
                    component: (
                        <InitialState
                            numCells={numCells}
                            cellsState={initState}
                        />
                    ),
                },
            ]}
            selected={section}
            size="lg"
            alignment="center"
        />
    );
}

export function Settings2D() {
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
