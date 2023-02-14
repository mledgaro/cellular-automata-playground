//
import CAPNumberInput from "../components/CAPNumberInput";
import CAPButton from "../components/CAPButton";
import {
    CAPRuleSwitch1D,
    CAPRuleSwitch2D,
} from "../components/CAPRuleSwitches";

export function Rules1D() {
    //

    let rules = [];

    for (let i = 0; i < 8; i++) {
        rules.push(
            <div class="col-3 my-1">
                <CAPRuleSwitch1D index={i} labelWidth={3} />
            </div>
        );
    }

    return (
        <div>
            <div className="row">
                {/* <!-- Rule number --> */}
                <div className="col-lg">
                    <CAPNumberInput
                        label="Rule number"
                        value={90}
                        min={0}
                        max={255}
                    />
                </div>

                {/* <!-- Buttons --> */}
                <div className="col-lg">
                    <div class="input-group input-group-lg d-flex justify-content-center">
                        <CAPButton
                            title="Random"
                            label="Random"
                            iconId="shuffle"
                            iconSize="lg"
                        />

                        <CAPButton
                            title="Uncheck all"
                            label="Uncheck all"
                            iconId="square"
                            iconSize="lg"
                        />

                        <CAPButton
                            title="Check all"
                            label="Check all"
                            iconId="square-check"
                            iconSize="lg"
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
            <div class="col m-1">
                <CAPRuleSwitch2D index={i} />
            </div>
        );
    }

    return <div className="row">{rules}</div>;
}
