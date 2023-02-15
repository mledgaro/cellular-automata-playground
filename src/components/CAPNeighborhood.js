//

import { useContext, useState } from "react";

import {
    CAPCellGroupInSitu,
    CAPCellGroupGrouped,
    CAPCellGroupScattered,
} from "./CAPCellGroup";
import CAPNumberInput from "./CAPNumberInput";
import { NbhdContext } from "../sections/Neighborhood";

export function CAPNeighborhood1D(props) {
    //

    const nbhdContext = useContext(NbhdContext);

    let cellGroup, updateNumCells;

    updateNumCells = (val) => {
        nbhdContext.nbhdWidth.set(val);
        nbhdContext.mainCell.set(0);
    };

    switch (props.type) {
        case "grouped":
            cellGroup = (
                <CAPCellGroupGrouped
                    numCells={nbhdContext.nbhdWidth.get}
                    selected={nbhdContext.mainCell.get}
                    setSelected={nbhdContext.mainCell.set}
                />
            );
            break;
        case "scattered":
            cellGroup = (
                <CAPCellGroupScattered
                    numCells={nbhdContext.nbhdWidth.get}
                    selected={nbhdContext.mainCell.get}
                    setSelected={nbhdContext.mainCell.set}
                />
            );

            break;
        default: /*"insitu"*/
            cellGroup = (
                <CAPCellGroupInSitu
                    numCells={nbhdContext.nbhdWidth.get}
                    selected={nbhdContext.mainCell.get}
                    setSelected={nbhdContext.mainCell.set}
                />
            );
            updateNumCells = (val) => {
                nbhdContext.nbhdWidth.set(val);
                nbhdContext.mainCell.set(Math.ceil(val / 2) - 1);
            };
            break;
    }

    return (
        <div className="row">
            <div className="col">
                <CAPNumberInput
                    label="Cells"
                    value={nbhdContext.nbhdWidth.get}
                    setValue={updateNumCells}
                    min={2}
                    max={16}
                />
            </div>

            <div className="col">{cellGroup}</div>
        </div>
    );
}
