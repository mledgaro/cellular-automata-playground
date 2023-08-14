//
import React from "react";
import Neighborhood2D from "./settings_2d/Neighborhood2D";
import { Rules2D } from "./settings_2d/Rules2D";
import { useRangeReducer, useStateObj } from "src/app/hooks";
import CustomTabs from "src/components/Tabs";

export default function Settings2D() {
    //
    const nbhdType = useStateObj("moore");
    const nbhdWidth = useRangeReducer(2, 8, 3, false);
    const nbhdHeight = useRangeReducer(2, 8, 3, false);
    const mainCell = useStateObj({ r: 1, c: 1 });

    return (
        <CustomTabs
            tabs={[
                {
                    title: "Neighborhood",
                    content: (
                        <Neighborhood2D
                            type={nbhdType}
                            width={nbhdWidth}
                            height={nbhdHeight}
                            mainCell={mainCell}
                        />
                    ),
                },
                {
                    title: "Rules",
                    content: (
                        <Rules2D
                            nbhdType={nbhdType.get}
                            nbhdWidth={nbhdWidth.get}
                            nbhdHeight={nbhdHeight.get}
                            mainCell={mainCell.get}
                        />
                    ),
                },
            ]}
        />
    );
}
