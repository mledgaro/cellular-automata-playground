//

import { useState } from "react";

import CAPCellGroup from "./CAPCellGroup";
import CAPNumberInput from "./CAPNumberInput";

export function CAPNeighborhood1D() {
    //

    let [numCells, setNumCells] = useState(3);
    let [mainCell, setMainCell] = useState(1);

    let setNumCells2 = (val) => {
        setNumCells(val);
        setMainCell(Math.ceil(val / 2) - 1);
    };

    return (
        <div className="row">
            <div className="col-4">
                <CAPNumberInput
                    label="Cells"
                    value={numCells}
                    setValue={setNumCells2}
                    min={2}
                    max={16}
                />
            </div>

            <div className="col-8">
                <CAPCellGroup
                    numCells={numCells}
                    selected={mainCell}
                    setSelected={setMainCell}
                />
            </div>
        </div>
    );
}
