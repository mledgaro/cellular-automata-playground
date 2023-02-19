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

    return (
        <div className={inputGroupClasses(size, alignment, ` ${extraClasses}`)}>
            {label != null && (
                <span className="input-group-text cap-container-dark-1">
                    {label}
                </span>
            )}

            <CAPButton
                icon={{ id: "minus" }}
                enabled={value.get > min}
                onClick={() => value.set(value.get - 1)}
            />

            <span className="input-group-text cap-container-dark-1">
                {value.get}
            </span>

            <CAPButton
                icon={{ id: "plus" }}
                enabled={value.get < max}
                onClick={() => value.set(value.get + 1)}
            />
        </div>
    );
}
