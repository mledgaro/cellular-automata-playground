//

import { inputGroupClasses } from "../js/Utils";
import Button from "./Button";

function Label({ text }) {
    return (
        <span className="input-group-text cap-container-dark-1">{text}</span>
    );
}

function DecreaseButton({ value, min }) {
    //

    return (
        <Button
            icon={{ id: "minus" }}
            enabled={value.get > min}
            onClick={value.prev}
        />
    );
}

function IncreaseButton({ value, max }) {
    //

    return (
        <Button
            icon={{ id: "plus" }}
            enabled={value.get < max}
            onClick={value.next}
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

    const contClasses = inputGroupClasses(size, alignment, ` ${extraClasses}`);

    return (
        <div className={contClasses}>
            {label != null && <Label text={label} />}

            <DecreaseButton value={value} min={min} />

            <InputNum value={value} />

            <IncreaseButton value={value} max={max} />
        </div>
    );
}
