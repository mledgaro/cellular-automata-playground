//

import React from "react";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { EnumReducerType } from "../ts/CustomHooks";
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
    enumReducer,
}: {
    icon: IconDefinition;
    tooltipLabel?: string;
    tooltipPlacement?: Position;
    size?: Size;
    alignment?: Alignment;
    enumReducer: EnumReducerType;
}) {
    //

    let elements = [];

    elements.push(
        <Button
            icon={faMinus}
            enabled={enumReducer.index > 0}
            onClick={enumReducer.prev}
        />
    );

    for (let i = 0; i < enumReducer.length; i++) {
        elements.push(<Level key={i} on={i <= enumReducer.index} />);
    }

    elements.push(
        <Button
            icon={faPlus}
            enabled={enumReducer.index < enumReducer.length - 1}
            onClick={enumReducer.next}
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
