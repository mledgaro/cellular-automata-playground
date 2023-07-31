//

import React from "react";

import { useStateObj } from "../ts/CustomHooks";

import SectionSelector from "../components/SectionSelector";
import Neighborhood1D from "./settings_1d/Neighborhood1D";
import Rules1D from "./settings_1d/Rules1D";
import InitialState from "./settings_1d/InitialState";

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
