//

import CAPButton from "./CAPButton";

function CAPNumberInput(props) {
    //

    let decreaseValue = () => {
        if (props.value > props.min) {
            props.setValue(props.value - 1);
        }
    };

    let increaseValue = () => {
        if (props.value < props.max) {
            props.setValue(props.value + 1);
        }
    };

    return (
        <div className="input-group d-flex justify-content-end">
            {props.label != null && (
                <span className="input-group-text cap-text-label">
                    {props.label}
                </span>
            )}

            <CAPButton iconId="minus" onClick={decreaseValue} />

            <span className="input-group-text cap-text-label">
                {props.value}
            </span>

            <CAPButton iconId="plus" onClick={increaseValue} />
        </div>
    );
}

export default CAPNumberInput;
