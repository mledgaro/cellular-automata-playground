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
        <div className={inputGroupClasses(size, alignment, "")}>
            {label != null && (
                <span className="input-group-text cap-text-label">{label}</span>
            )}

            <CAPButton icon={{ id: "minus" }} onClick={decreaseValue} />

            <span className="input-group-text cap-text-label">{value.get}</span>

            <CAPButton icon={{ id: "plus" }} onClick={increaseValue} />
        </div>
    );
}
