//
import React from "react";

import CustomTabs from "src/components/Tabs";
import Neighborhood1D from "./settings_1d/Neighborhood1D";
import Rules1D from "./settings_1d/Rules1D";
import InitialState from "./settings_1d/InitialState";

// function Settings1D() {
//     //

//     const section = useStateObj("nbhd");

//     return (
//         <SectionSelector
//             title="Settings"
//             sections={[
//                 {
//                     label: "Neighborhood",
//                     value: "nbhd",
//                     component: <Neighborhood1D />,
//                 },
//                 {
//                     label: "Rules",
//                     value: "rules",
//                     component: <Rules1D />,
//                 },
//                 {
//                     label: "Initial state",
//                     value: "initstate",
//                     component: <InitialState />,
//                 },
//             ]}
//             selected={section}
//             size="lg"
//             alignment="center"
//         />
//     );
// }

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
