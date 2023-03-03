//

import { useEffect } from "react";
import { useStateObj } from "../../components/CustomHooks";
import SectionSelector from "../../components/SectionSelector";
import { randomBoolArray } from "../../js/Utils";
import InitialState from "./InitialState";
import Neighborhood1D from "./Neighborhood1D";
import Rules1D from "./Rules1D";


export default function Settings1D({
    numCells,
    nbhdWidth,
    nbhdType,
    mainCell,
    cellsNbhds,
    rules,
    initState,
}) {
    //

    const section = useStateObj("nbhd");

    useEffect(() => {
        rules.set(randomBoolArray(Math.pow(2, nbhdWidth.get)));
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
                            width={nbhdWidth}
                            type={nbhdType}
                            mainCell={mainCell}
                            cellsNbhds={cellsNbhds}
                        />
                    ),
                },
                {
                    label: "Rules",
                    value: "rules",
                    component: (
                        <Rules1D
                            nbhdWidth={nbhdWidth.get}
                            nbhdType={nbhdType.get}
                            mainCell={mainCell.get}
                            rulesState={rules}
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
