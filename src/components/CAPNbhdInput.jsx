//

import { useContext } from "react";
import CAPCellGroup from "./CAPCellGroup";
import CAPNumberInput from "./CAPNumberInput";
import { NbhdContext } from "../sections/Neighborhood";

export function CAPNbhdInput1D(props) {
    //

    const nbhdContext = useContext(NbhdContext);

    let updateNumCells;

    if (props.type === "insitu") {
        updateNumCells = (val) => {
            nbhdContext.nbhdWidth.set(val);
            nbhdContext.mainCell.set(Math.ceil(val / 2) - 1);
        };
    } else {
        updateNumCells = (val) => {
            nbhdContext.nbhdWidth.set(val);
            nbhdContext.mainCell.set(0);
        };
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
                    alignment="end"
                />
            </div>

            <div className="col">
                <CAPCellGroup
                    type={props.type}
                    numCells={nbhdContext.nbhdWidth.get}
                    selected={nbhdContext.mainCell}
                    alignment="start"
                />
            </div>
        </div>
    );
}
