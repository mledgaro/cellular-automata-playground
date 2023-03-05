//

import React from "react";

import {
    ArrayStateHook,
    BoolArrHook,
    RangeReducerHook,
    StateObjHook,
    useStateObj,
} from "../../CustomHooks";
import SectionSelector from "../../components/SectionSelector";
import InitialState from "./InitialState";
import Neighborhood1D from "./Neighborhood1D";
import Rules1D from "./Rules1D";

type Settings1DProps = {
    numCells: number;
    nbhdWidth: RangeReducerHook;
    nbhdType: StateObjHook;
    mainCell: StateObjHook;
    cellsNbhds: ArrayStateHook<number[]>;
    rules: BoolArrHook;
    initState: BoolArrHook;
};

export default function Settings1D({
    numCells,
    nbhdWidth,
    nbhdType,
    mainCell,
    cellsNbhds,
    rules,
    initState,
}: Settings1DProps) {
    //

    const section = useStateObj("nbhd");

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
                            rules={rules}
                        />
                    ),
                },
                {
                    label: "Initial state",
                    value: "initstate",
                    component: (
                        <InitialState numCells={numCells} state={initState} />
                    ),
                },
            ]}
            selected={section}
            size="lg"
            alignment="center"
        />
    );
}
