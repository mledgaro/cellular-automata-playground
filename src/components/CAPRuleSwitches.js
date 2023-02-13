//

import CAPStateButton from "./CAPStateButton";

export function CAPRuleSwitch1D(props) {
    //

    let binLabel = (
        "0".repeat(props.labelWidth) + props.index.toString(2)
    ).slice(-props.labelWidth);

    return (
        <div class="col-3 my-1">
            <div class="input-group d-flex justify-content-center">
                <span
                    class="input-group-text cap-text-label"
                    style={{ minWidth: "2rem" }}
                >
                    {props.index}
                </span>

                <CAPStateButton
                    icons={["square", "square-check"]}
                    iconStyle="solid"
                    iconSize="xl"
                />

                <span
                    class="input-group-text cap-text-label"
                    style={{ minWidth: "3rem" }}
                >
                    {binLabel}
                </span>
            </div>
        </div>
    );
}

export function CAPRuleSwitch2D(props) {
    return (
        <div class="col d-flex justify-content-center m-1">
            <div class="card bg-warning border-0" style={{ width: "3.5rem" }}>
                <div class="card-header bg-dark cap-text-label p-1">
                    {props.index}
                </div>

                <div class="card-body p-0 mx-auto text-dark">
                    <CAPStateButton
                        icons={["square-minus", "square", "square-check"]}
                        iconStyle="solid"
                        iconSize="xl"
                    />
                </div>
            </div>
        </div>
    );
}
