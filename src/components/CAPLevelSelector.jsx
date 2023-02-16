//

import { useState } from "react";
import { inputGroupClasses } from "../js/Utils";
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

    const levelDown = () => setLevel(level === 0 ? 0 : level - 1);
    const levelUp = () => setLevel(level === numLevels ? numLevels : level + 1);

    let highLevels = [];
    let lowLevels = [];

    for (let i = 0; i < level; i++) {
        highLevels.push(
            <span className="input-group-text cap-progress-cell cap-cell-on"></span>
        );
    }

    for (let i = 0; i < numLevels - level; i++) {
        lowLevels.push(
            <span className="input-group-text cap-progress-cell"></span>
        );
    }

    return (
        <div className={inputGroupClasses(size, alignment, "")}>
            <span
                className="input-group-text cap-text-label"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={tooltipLabel}
            >
                <FAIcon icon={{ id: iconId }} />
            </span>

            <button
                type="button"
                className="btn cap-btn"
                onClick={levelDown}
                disabled={level === 0}
            >
                <FAIcon icon={{ id: "minus" }} />
            </button>

            {highLevels}

            {lowLevels}

            <button
                type="button"
                className="btn cap-btn"
                onClick={levelUp}
                disabled={level === numLevels}
            >
                <FAIcon icon={{ id: "plus" }} />
            </button>
        </div>
    );
}
