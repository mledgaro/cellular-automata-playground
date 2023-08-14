//
import React from "react";

import CustomTabs from "src/components/Tabs";
import Neighborhood1D from "./settings_1d/Neighborhood1D";
import Rules1D from "./settings_1d/Rules1D";
import InitialState from "./settings_1d/InitialState";

export default function Settings1D() {
    return (
        <CustomTabs
            tabs={[
                {
                    title: "Neighborhood",
                    content: <Neighborhood1D />,
                },
                {
                    title: "Rules",
                    content: <Rules1D />,
                },
                {
                    title: "Initial state",
                    content: <InitialState />,
                },
            ]}
        />
    );
}
