//

import { inputGroupClasses } from "../js/Utils";
import CAPButton from "./CAPButton";

export default function CAPNumberInput({
    value,
    min,
    max,
    label,
    size,
    alignment,
    extraClasses,
}) {
    //

    let decreaseValue = () => {
        if (value.get > min) {
            value.set(value.get - 1);
        }
    };

    let increaseValue = () => {
        if (value.get < max) {
            value.set(value.get + 1);
        }
    };

    return (
        <div className={inputGroupClasses(size, alignment, ` ${extraClasses}`)}>
            {label != null && (
                <span className="input-group-text cap-container-dark-1">
                    {label}
                </span>
            )}

            <CAPButton icon={{ id: "minus" }} onClick={decreaseValue} />

            <span className="input-group-text cap-container-dark-1">
                {value.get}
            </span>

            <CAPButton icon={{ id: "plus" }} onClick={increaseValue} />
        </div>
    );
}
