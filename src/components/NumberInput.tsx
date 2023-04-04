//

import React from "react";

import {
    faMinus,
    faPlus,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Position } from "../ts/Utils";
import Button from "./Button";
import Group, { Alignment, Size } from "./Group";

export default function NumberInput({
    icon,
    label,
    tooltipLabel,
    tooltipPlacement,
    size,
    alignment,
    additionalClasses,
    value,
    increment,
    decrement,
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
    value: number;
    increment: () => void;
    decrement: () => void;
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
                <Button
                    icon={faMinus}
                    enabled={value > min}
                    onClick={decrement}
                />,
                // <input
                //     type="text"
                //     className=" cap-container-dark-1 cap-input-text"
                //     value={value}
                //     onChange={(e) => value.set(Number(e.target.value))}
                //     size={1}
                // />,
                <span
                    className="cap-container-dark-1 align-middle"
                    style={{
                        paddingInline: "0.8em",
                        paddingTop: "3px",
                        userSelect: "none",
                    }}
                >
                    {value}
                </span>,
                <Button
                    icon={faPlus}
                    enabled={value < max}
                    onClick={increment}
                />,
            ]}
        />
    );
}
