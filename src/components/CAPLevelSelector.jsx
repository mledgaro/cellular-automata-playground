//

import { useState } from "react";
import { inputGroupClasses } from "../js/Utils";
import CAPButton from "./CAPButton";
import FAIcon from "./FAIcon";

export default function CAPLevelSelector({
    iconId,
    numLevels,
    tooltipLabel,
    size,
    alignment,
}) {
    //

    const [level, setLevel] = useState(0);

    let highLevels = [];
    let lowLevels = [];

    for (let i = 0; i < level; i++) {
        highLevels.push(
            <span className="input-group-text cap-level cap-level-on"></span>
        );
    }

    for (let i = 0; i < numLevels - level; i++) {
        lowLevels.push(
            <span className="input-group-text cap-level cap-level-off"></span>
        );
    }

    return (
        <div className={inputGroupClasses(size, alignment, "")}>
            <span
                className="input-group-text cap-container-dark-1"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={tooltipLabel}
            >
                <FAIcon icon={{ id: iconId }} />
            </span>

            <CAPButton
                icon={{ id: "minus" }}
                enabled={level > 0}
                onClick={() => setLevel(level - 1)}
            />

            {highLevels}

            {lowLevels}

            <CAPButton
                icon={{ id: "plus" }}
                enabled={level < numLevels}
                onClick={() => setLevel(level + 1)}
            />
        </div>
    );
}
