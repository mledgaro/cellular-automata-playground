//
import CAPNumberInput from "../components/CAPNumberInput";
import CAPButton from "../components/CAPButton";
import {
    CAPRuleSwitch1D,
    CAPRuleSwitch2D,
} from "../components/CAPRuleSwitches";

function Rules(props) {
    //

    let d1Rules = [];

    for (let i = 0; i < 8; i++) {
        d1Rules.push(
            <div class="col-3 my-1">
                <CAPRuleSwitch1D index={i} labelWidth={3} />
            </div>
        );
    }

    const d1 = (
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

            <div className="row mt-3">{d1Rules}</div>
        </div>
    );

    let d2Rules = [];

    for (let i = 0; i <= 8; i++) {
        d1Rules.push(
            <div class="col m-1">
                <CAPRuleSwitch2D index={i} />
            </div>
        );
    }

    const d2 = <div className="row">{d2Rules}</div>;

    return (
        <div>
            {d1}
            {d2}
        </div>
    );
}

export default Rules;
