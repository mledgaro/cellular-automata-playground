//

import CAPStateButton from "./CAPStateButton";

export function CAPRuleSwitch1D(props) {
    //

    let binLabel = (
        "0".repeat(props.labelWidth) + props.index.toString(2)
    ).slice(-props.labelWidth);

    return (
        <div className="input-group d-flex justify-content-center">
            <span
                className="input-group-text cap-text-label"
                style={{ minWidth: "2rem" }}
            >
                {props.index}
            </span>

            <CAPStateButton
                icons={["square", "square-check"]}
                styles={["solid", "solid"]}
                iconSize="xl"
            />

            <span
                className="input-group-text cap-text-label"
                style={{ minWidth: "3rem" }}
            >
                {binLabel}
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
