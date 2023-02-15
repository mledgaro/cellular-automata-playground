//

import { useState } from "react";
import CAPStateButton from "./CAPStateButton";
import FAIcon from "./FAIcon";

export function CAPRuleSwitch1D(props) {
    //

    let cellsState = ("0".repeat(props.numCells) + props.index.toString(2))
        .slice(-props.numCells)
        .split("")
        .map((e) => e === "1");

    let [alive, setAlive] = useState(false);

    let cells = [];

    cellsState.forEach((e, i) => {
        cells.push(
            <span className="input-group-text cap-text-label px-1">
                &nbsp;
                <FAIcon
                    iconId="square"
                    iconStyle={e ? "solid" : "regular"}
                    iconSize={i === props.mainCell ? "xl" : ""}
                />
            </span>
        );
    });

    return (
        <div
            className="input-group d-flex justify-content-center"
            onClick={() => setAlive(!alive)}
        >
            <span
                className="input-group-text cap-text-label"
                style={{ minWidth: "2rem" }}
            >
                {`(${props.index})`}
            </span>

            {cells}

            <span className="input-group-text cap-text-label px-1">
                &nbsp;
                <FAIcon iconId="arrow-right" iconStyle="solid" iconSize=""/>
            </span>

            <span className="input-group-text cap-text-label px-1">
                &nbsp;
                <FAIcon
                    iconId="square"
                    iconStyle={alive ? "solid" : "regular"}
                    iconSize="xl"
                />
            </span>
        </div>
    );
}

export function CAPRuleSwitch2D(props) {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="card bg-warning border-0"
                style={{ width: "3.5rem" }}
            >
                <div className="card-header bg-dark cap-text-label p-1">
                    {props.index}
                </div>

                <div className="card-body p-0 mx-auto text-dark">
                    <CAPStateButton
                        icons={["square-minus", "square", "square-check"]}
                        styles={["solid", "solid", "solid"]}
                        iconSize="xl"
                    />
                </div>
            </div>
        </div>
    );
}
