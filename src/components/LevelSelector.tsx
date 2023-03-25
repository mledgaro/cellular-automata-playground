//

import React from "react";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Group, { Alignment, Size } from "./Group";
import { Position } from "src/ts/Utils";

function Level({ on }: { on: boolean }) {
    //

    return (
        <span
            className={`input-group-text cap-level cap-level-${
                on ? "on" : "off"
            }`}
        />
    );
}

export default function LevelSelector({
    icon,
    tooltipLabel,
    tooltipPlacement,
    size,
    alignment,
    index,
    numLevels,
    increment,
    decrement,
}: {
    icon: IconDefinition;
    tooltipLabel?: string;
    tooltipPlacement?: Position;
    size?: Size;
    alignment?: Alignment;
    index: number;
    numLevels: number;
    increment: () => void;
    decrement: () => void;
}) {
    //

    let elements = [];

    elements.push(
        <Button icon={faMinus} enabled={index > 0} onClick={decrement} />
    );

    for (let i = 0; i < numLevels; i++) {
        elements.push(<Level key={i} on={i <= index} />);
    }

    elements.push(
        <Button
            icon={faPlus}
            enabled={index < numLevels - 1}
            onClick={increment}
        />
    );

    return (
        <Group
            icon={icon}
            tooltipLabel={tooltipLabel}
            tooltipPlacement={tooltipPlacement}
            size={size}
            alignment={alignment}
            elements={elements}
        />
    );
}
