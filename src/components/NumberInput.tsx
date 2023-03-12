//

import React from "react";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Size, Alignment, inputGroupClasses } from "../ts/Utils";
import Button from "./Button";
import { RangeReducerHook } from "../ts/CustomHooks";

function Label({ text }: { text: string }) {
    //

    return (
        <span className="input-group-text cap-container-dark-1">{text}</span>
    );
}

function DecreaseButton({
    min,
    value,
    decreaseValue,
}: {
    min: number;
    value: number;
    decreaseValue: () => void;
}) {
    //

    return (
        <Button icon={faMinus} enabled={value > min} onClick={decreaseValue} />
    );
}

function IncreaseButton({
    max,
    value,
    increaseValue,
}: {
    max: number;
    value: number;
    increaseValue: () => void;
}) {
    //

    return (
        <Button icon={faPlus} enabled={value < max} onClick={increaseValue} />
    );
}

function InputNum({
    value,
    setValue,
}: {
    value: number;
    setValue: (val: number) => void;
}) {
    //

    return (
        <input
            type="text"
            className=" cap-container-dark-1 cap-input-text"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
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
}: {
    value: RangeReducerHook;
    min: number;
    max: number;
    label?: string;
    size: Size;
    alignment: Alignment;
    extraClasses?: string;
}) {
    //

    const contClasses = inputGroupClasses(
        size,
        alignment,
        ` ${extraClasses || ""}`
    );

    return (
        <div className={contClasses}>
            {label != null && <Label text={label} />}

            <DecreaseButton
                min={min}
                value={value.get}
                decreaseValue={value.prev}
            />

            <InputNum value={value.get} setValue={value.set} />

            <IncreaseButton
                max={max}
                value={value.get}
                increaseValue={value.next}
            />
        </div>
    );
}
