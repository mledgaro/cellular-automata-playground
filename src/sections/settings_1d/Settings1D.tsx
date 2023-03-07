//

import React from "react";

import { useStateObj } from "../../CustomHooks";

import SectionSelector from "../../components/SectionSelector";
import Neighborhood1D from "./Neighborhood1D";
import Rules1D from "./Rules1D";
import InitialState from "./InitialState";

export default function Settings1D() {
    //

    const section = useStateObj("nbhd");

    return (
        <SectionSelector
            title="Settings"
            sections={[
                {
                    label: "Neighborhood",
                    value: "nbhd",
                    component: <Neighborhood1D />,
                },
                {
                    label: "Rules",
                    value: "rules",
                    component: <Rules1D />,
                },
                {
                    label: "Initial state",
                    value: "initstate",
                    component: <InitialState />,
                },
            ]}
            selected={section}
            size="lg"
            alignment="center"
        />
    );
}
