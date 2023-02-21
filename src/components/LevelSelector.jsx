//

import { useState } from "react";
import { inputGroupClasses } from "../js/Utils";
import Button from "./Button";
import FAIcon from "./FAIcon";

export default function LevelSelector({
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

    let i;

    for (i = 0; i < level; i++) {
        highLevels.push(
            <span
                key={i}
                className="input-group-text cap-level cap-level-on"
            ></span>
        );
    }

    for (; i < numLevels; i++) {
        lowLevels.push(
            <span
                key={i}
                className="input-group-text cap-level cap-level-off"
            ></span>
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

            <Button
                icon={{ id: "minus" }}
                enabled={level > 0}
                onClick={() => setLevel(level - 1)}
            />

            {highLevels}

            {lowLevels}

            <Button
                icon={{ id: "plus" }}
                enabled={level < numLevels}
                onClick={() => setLevel(level + 1)}
            />
        </div>
    );
}
