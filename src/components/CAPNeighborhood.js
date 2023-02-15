//

import { useState } from "react";

import {
    CAPCellGroupInSitu,
    CAPCellGroupGrouped,
    CAPCellGroupScattered,
} from "./CAPCellGroup";
import CAPNumberInput from "./CAPNumberInput";

export function CAPNeighborhood1D(props) {
    //

    let [numCells, setNumCells] = useState(3);
    let [mainCell, setMainCell] = useState(1);

    let cellGroup, updateNumCells;

    updateNumCells = (val) => {
        setNumCells(val);
        setMainCell(0);
    };

    switch (props.type) {
        case "grouped":
            cellGroup = (
                <CAPCellGroupGrouped
                    numCells={numCells}
                    selected={mainCell}
                    setSelected={setMainCell}
                />
            );
            break;
        case "scattered":
            cellGroup = (
                <CAPCellGroupScattered
                    numCells={numCells}
                    selected={mainCell}
                    setSelected={setMainCell}
                />
            );

            break;
        default: /*"insitu"*/
            cellGroup = (
                <CAPCellGroupInSitu
                    numCells={numCells}
                    selected={mainCell}
                    setSelected={setMainCell}
                />
            );
            updateNumCells = (val) => {
                setNumCells(val);
                setMainCell(Math.ceil(val / 2) - 1);
            };
            break;
    }

    return (
        <div className="row">
            <div className="col">
                <CAPNumberInput
                    label="Cells"
                    value={numCells}
                    setValue={updateNumCells}
                    min={2}
                    max={16}
                />
            </div>

            <div className="col">{cellGroup}</div>
        </div>
    );
}
