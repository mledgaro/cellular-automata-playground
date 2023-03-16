//

import React from "react";

import {
    faMinus,
    faPlus,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Position } from "../ts/Utils";
import Button from "./Button";
import { RangeReducerHook } from "../ts/CustomHooks";
import Group, { Alignment, Size } from "./Group";

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
    icon,
    label,
    tooltipLabel,
    tooltipPlacement,
    size,
    alignment,
    additionalClasses,
    value,
    min,
    max,
}: {
    icon?: IconDefinition;
    label?: string;
    tooltipLabel?: string;
    tooltipPlacement?: Position;
    size?: Size;
    alignment?: Alignment;
    additionalClasses?: string;
    value: RangeReducerHook;
    min: number;
    max: number;
}) {
    //

    return (
        <Group
            icon={icon}
            label={label}
            tooltipLabel={tooltipLabel}
            tooltipPlacement={tooltipPlacement}
            size={size}
            alignment={alignment}
            additionalClasses={additionalClasses}
            elements={[
                <DecreaseButton
                    min={min}
                    value={value.get}
                    decreaseValue={value.prev}
                />,
                <InputNum value={value.get} setValue={value.set} />,
                <IncreaseButton
                    max={max}
                    value={value.get}
                    increaseValue={value.next}
                />,
            ]}
        />
    );
}
