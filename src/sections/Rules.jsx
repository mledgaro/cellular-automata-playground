//

import CAPButton from "../components/CAPButton";
import {
    CAPRuleSwitch1D,
    CAPRuleSwitch2D,
} from "../components/CAPRuleSwitches";

export function Rules1D(props) {
    //

    let rules = [];

    for (let i = 0; i < 8; i++) {
        rules.push(
            <div className="col-3 my-1">
                <CAPRuleSwitch1D
                    index={i}
                    nbhdWidth={props.nbhdWidth}
                    mainCell={props.mainCell}
                    type={props.nbhdType}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg">
                    <div className="input-group d-flex justify-content-center">
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
                    <div className="input-group input-group-lg d-flex justify-content-center">
                        <CAPButton
                            label="Uncheck all"
                            iconId="square"
                            iconStyle="regular"
                        />

                        <CAPButton
                            label="Check all"
                            iconId="square"
                            iconStyle="solid"
                        />

                        <CAPButton label="Random" iconId="shuffle" />

                        <CAPButton
                            label="Invert selection"
                            iconId="right-left"
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
                <CAPRuleSwitch2D index={i} />
            </div>
        );
    }

    return <div className="row">{rules}</div>;
}
