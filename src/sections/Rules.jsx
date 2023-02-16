//

import CAPButton from "../components/CAPButton";
import {
    CAPRule1D,
    CAPRule2D,
} from "../components/CAPRule";
import { inputGroupClasses } from "../js/Utils";

export function Rules1D({ nbhdType, nbhdWidth, mainCell }) {
    //

    let rules = [];

    for (let i = 0; i < 8; i++) {
        rules.push(
            <div className="col-3 my-1">
                <CAPRule1D
                    type={nbhdType}
                    index={i}
                    nbhdWidth={nbhdWidth}
                    mainCell={mainCell}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg">
                    <div className={inputGroupClasses("", "center", "")}>
                        <span
                            className="input-group-text cap-text-label"
                            style={{ minWidth: "2rem" }}
                        >
                            Rule number
                        </span>
                        <span
                            className="input-group-text cap-text-label"
                            style={{ minWidth: "2rem" }}
                        >
                            90
                        </span>
                    </div>
                </div>

                {/* <!-- Buttons --> */}
                <div className="col-lg">
                    <div className={inputGroupClasses("", "center", "")}>
                        <CAPButton
                            tooltipLabel="Uncheck all"
                            icon={{ id: "square", style: "regular" }}
                        />

                        <CAPButton
                            tooltipLabel="Check all"
                            icon={{ id: "square" }}
                        />

                        <CAPButton
                            tooltipLabel="Random"
                            icon={{ id: "shuffle" }}
                        />

                        <CAPButton
                            tooltipLabel="Invert selection"
                            icon={{ id: "right-left" }}
                        />
                    </div>
                </div>
            </div>

            <div className="row mt-3">{rules}</div>
        </div>
    );
}

export function Rules2D() {
    //

    let rules = [];

    for (let i = 0; i <= 8; i++) {
        rules.push(
            <div className="col m-1">
                <CAPRule2D index={i} />
            </div>
        );
    }

    return <div className="row">{rules}</div>;
}
