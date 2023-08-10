//
import React from "react";
import SectionSelector from "../../components/deprecated/SectionSelector";
import Neighborhood2D from "./Neighborhood2D";
import { Rules2D } from "./Rules2D";
import { useRangeReducer, useStateObj } from "src/app/hooks";

export default function Settings2D() {
    //

    const section = useStateObj("nbhd");
    const nbhdType = useStateObj("moore");
    const nbhdWidth = useRangeReducer(2, 8, 3, false);
    const nbhdHeight = useRangeReducer(2, 8, 3, false);
    const mainCell = useStateObj({ r: 1, c: 1 });

    return (
        <SectionSelector
            title="Settings"
            sections={[
                {
                    label: "Neighborhood",
                    value: "nbhd",
                    component: (
                        <Neighborhood2D
                            type={nbhdType}
                            width={nbhdWidth}
                            height={nbhdHeight}
                            mainCell={mainCell}
                        />
                    ),
                },
                {
                    label: "Rules",
                    value: "rules",
                    component: (
                        <Rules2D
                            nbhdType={nbhdType.get}
                            nbhdWidth={nbhdWidth.get}
                            nbhdHeight={nbhdHeight.get}
                            mainCell={mainCell.get}
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
