//

import { inputGroupClasses } from "../js/Utils";
import Button from "./Button";

export default function NumberInput({
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

            <Button
                icon={{ id: "minus" }}
                enabled={value.get > min}
                onClick={() => value.set(value.get - 1)}
            />

            <span className="input-group-text cap-container-dark-1">
                {value.get}
            </span>

            <Button
                icon={{ id: "plus" }}
                enabled={value.get < max}
                onClick={() => value.set(value.get + 1)}
            />
        </div>
    );
}
