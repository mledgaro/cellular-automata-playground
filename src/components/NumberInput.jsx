//

import { useCallback } from "react";
import { inputGroupClasses } from "../js/Utils";
import Button from "./Button";
import { useStateObj } from "./CustomHooks";

function Label({ text }) {
    return (
        <span className="input-group-text cap-container-dark-1">{text}</span>
    );
}

function DecreaseButton({ value, tmp, min }) {
    //

    return (
        <Button
            icon={{ id: "minus" }}
            enabled={value.get > min}
            onClick={() => {
                value.set(value.get - 1);
            }}
        />
    );
}

function IncreaseButton({ value, tmp, max }) {
    //

    return (
        <Button
            icon={{ id: "plus" }}
            enabled={value.get < max}
            onClick={() => {
                value.set(value.get + 1);
            }}
        />
    );
}

function InputNum({ value }) {
    //

    return (
        <input
            type="text"
            className=" cap-container-dark-1 cap-input-text"
            value={value.get}
            onChange={(e) => value.set(e.target.value)}
            // onFocus={(e) => {}}
            // onBlur={(e) => {}}
            size={1}
        />
    );
}

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

    const changeValue = useCallback(
        (val) => {
            value.set(
                !isNaN(val) ? Math.max(min, Math.min(Number(val), max)) : min
            );
        },
        [value, min, max]
    );

    const val = { get: value.get, set: changeValue };

    const contClasses = inputGroupClasses(size, alignment, ` ${extraClasses}`);

    return (
        <div className={contClasses}>
            {label != null && <Label text={label} />}

            <DecreaseButton value={value} min={min} />

            <InputNum value={val} min={min} max={max} />

            <IncreaseButton value={value} max={max} />
        </div>
    );
}
