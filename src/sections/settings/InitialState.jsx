//

import { useState } from "react";
import CAPButton from "../../components/CAPButton";
import CAPCellSet from "../../components/CAPCellsState";
import CAPNumberInput from "../../components/CAPNumberInput";
import CAPSectionSelector from "../../components/CAPSectionSelector";
import { inputGroupClasses } from "../../js/Utils";

export default function InitialState({ cellsNumber }) {
    //

    let [liveCellsType, setLiveCellsType] = useState(0);
    let [distribution, setDistribution] = useState(0);
    let [groupSizeType, setGroupSizeType] = useState(0);

    let [liveCells, setLiveCells] = useState(0);
    let [groupSize, setGroupSize] = useState(0);
    let [groupMinSize, setGroupMinSize] = useState(0);
    let [groupMaxSize, setGroupMaxSize] = useState(0);

    let [cellsState, setCellsState] = useState(Array(cellsNumber).fill(false));

    let liveCellsSelector = (
        <CAPSectionSelector
            title="Live cells"
            sections={[
                {
                    label: "Number",
                    component: (
                        <CAPNumberInput
                            value={{
                                get: liveCells,
                                set: setLiveCells,
                            }}
                            min={0}
                            max={255}
                            size="sm"
                            alignment="center"
                        />
                    ),
                },
                {
                    label: "Percentage",
                    component: (
                        <CAPNumberInput
                            value={{
                                get: liveCells,
                                set: setLiveCells,
                            }}
                            min={0}
                            max={100}
                            size="sm"
                            alignment="center"
                        />
                    ),
                },
            ]}
            selected={{ get: liveCellsType, set: setLiveCellsType }}
            size="sm"
            alignment="center"
        />
    );

    let groupSizeSelector = (
        <CAPSectionSelector
            title="Group size"
            sections={[
                {
                    label: "Fixed",
                    component: (
                        <CAPNumberInput
                            value={{
                                get: groupSize,
                                set: setGroupSize,
                            }}
                            min={0}
                            max={255}
                            size="sm"
                            alignment="center"
                        />
                    ),
                },
                {
                    label: "Random",
                    component: (
                        <div className="row">
                            <div className="col">
                                <CAPNumberInput
                                    label="Min"
                                    value={{
                                        get: groupMinSize,
                                        set: setGroupMinSize,
                                    }}
                                    min={1}
                                    max={255}
                                    size="sm"
                                    alignment="center"
                                />
                            </div>
                            <div className="col">
                                <CAPNumberInput
                                    label="Max"
                                    value={{
                                        get: groupMaxSize,
                                        set: setGroupMaxSize,
                                    }}
                                    min={1}
                                    max={255}
                                    size="sm"
                                    alignment="center"
                                />
                            </div>
                        </div>
                    ),
                },
            ]}
            selected={{
                get: groupSizeType,
                set: setGroupSizeType,
            }}
            size="sm"
            alignment="center"
        />
    );

    
    return (
        <div>
            <div className="row mb-2">
                <div className="col">{liveCellsSelector}</div>

                <div className="col">
                    <CAPSectionSelector
                        title="Distribution"
                        sections={[
                            { label: "Random", component: <div /> },
                            {
                                label: "Even",
                                component: groupSizeSelector,
                            },
                        ]}
                        selected={{ get: distribution, set: setDistribution }}
                        size="sm"
                        alignment="center"
                    />
                </div>
            </div>

            <CAPCellSet cellsState={cellsState} />
        </div>
    );
}
