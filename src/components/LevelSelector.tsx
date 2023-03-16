//

import React from "react";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Size, Alignment, inputGroupClasses } from "../ts/Utils";
import Button from "./Button";
import { EnumReducerType } from "../ts/CustomHooks";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

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
    enumReducer,
    size = "md",
    alignment = "center",
}: {
    icon: IconDefinition;
    tooltipLabel: string;
    enumReducer: EnumReducerType;
    size?: Size;
    alignment?: Alignment;
}) {
    //

    let levels = [];

    for (let i = 0; i < enumReducer.length; i++) {
        levels.push(<Level key={i} on={i <= enumReducer.index} />);
    }

    return (
        <div className={inputGroupClasses(size, alignment, "")}>
            <span
                className="input-group-text cap-container-dark-1"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={tooltipLabel}
            >
                <FontAwesomeIcon icon={icon} />
            </span>

            <Button
                icon={faMinus}
                enabled={enumReducer.index > 0}
                onClick={enumReducer.prev}
            />

            {levels}

            <Button
                icon={faPlus}
                enabled={enumReducer.index < enumReducer.length - 1}
                onClick={enumReducer.next}
            />
        </div>
    );
}
