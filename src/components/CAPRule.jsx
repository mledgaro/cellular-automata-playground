//

import { useState } from "react";
import CAPStateButton from "./CAPStateButton";
import FAIcon from "./FAIcon";
import { inputGroupClasses, intToBoolArray } from "../js/Utils";

export function CAPRule1D({ type, index, nbhdWidth, mainCell }) {
    //

    let cellsState = intToBoolArray(index, nbhdWidth);

    let [alive, setAlive] = useState(false);

    let cells = [];

    mainCell = mainCell === -1 ? nbhdWidth - 1 : mainCell;

    cellsState.forEach((e, i) => {
        cells.push(
            <span className="input-group-text cap-text-label px-1">
                &nbsp;
                <FAIcon
                    icon={{
                        id: "square",
                        style: e ? "solid" : "regular",
                        size: i === mainCell ? "lg" : "xs",
                    }}
                />
            </span>
        );
    });

    if (type !== "insitu") {
        //

        let ellipsis = (
            <span className="input-group-text cap-text-label px-1">
                &nbsp;
                <FAIcon icon={{ id: "ellipsis", size: "2xs" }} />
            </span>
        );

        if (type === "grouped") {
            cells.splice(mainCell, 0, ellipsis);
        } else if (type === "scattered") {
            let len = cells.length - 1;
            for (let i = 0; i < len; i++) {
                cells.splice(i * 2 + 1, 0, ellipsis);
            }
        }
    }

    return (
        <div
            className={inputGroupClasses("sm", "center", "")}
            onClick={() => setAlive(!alive)}
        >
            <span
                className="input-group-text cap-text-label"
                style={{ minWidth: "2rem" }}
            >
                {`(${index})`}
            </span>

            {cells}

            <span className="input-group-text cap-text-label px-1">
                &nbsp;
                <FAIcon
                    icon={{ id: "arrow-right", style: "solid", size: "sm" }}
                />
            </span>

            <span className="input-group-text cap-text-label px-1">
                &nbsp;
                <FAIcon
                    icon={{
                        id: "square",
                        style: alive ? "solid" : "regular",
                        size: "lg",
                    }}
                />
            </span>
        </div>
    );
}

export function CAPRule2D({ index }) {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="card bg-warning border-0"
                style={{ width: "3.5rem" }}
            >
                <div className="card-header bg-dark cap-text-label p-1">
                    {index}
                </div>

                <div className="card-body p-0 mx-auto text-dark">
                    <CAPStateButton
                        icons={[
                            { id: "square-minus", size: "xl" },
                            { id: "square", size: "xl" },
                            { id: "square-check", size: "xl" },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}