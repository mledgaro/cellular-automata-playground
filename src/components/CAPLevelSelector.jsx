//

import { useState } from "react";
import { inputGroupClasses } from "../js/Utils";
import FAIcon from "./FAIcon";

function CAPLevelSelector(props) {
    const [level, setLevel] = useState(0);

    const levelDown = () => setLevel(level == 0 ? 0 : level - 1);
    const levelUp = () =>
        setLevel(level == props.numLevels ? props.numLevels : level + 1);

    let highLevels = [];
    let lowLevels = [];

    for (let i = 0; i < level; i++) {
        highLevels.push(
            <span className="input-group-text cap-progress-cell cap-cell-on"></span>
        );
    }

    for (let i = 0; i < props.numLevels - level; i++) {
        lowLevels.push(
            <span className="input-group-text cap-progress-cell"></span>
        );
    }

    return (
        <div
            className={inputGroupClasses(props.size, props.alignment, "")}
        >
            <span
                className="input-group-text cap-text-label"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={props.tooltipLabel}
            >
                <FAIcon iconId={props.iconId} />
            </span>

            <button
                type="button"
                className="btn cap-btn"
                onClick={levelDown}
                disabled={level == 0}
            >
                <FAIcon iconId="minus" />
            </button>

            {highLevels}

            {lowLevels}

            <button
                type="button"
                className="btn cap-btn"
                onClick={levelUp}
                disabled={level == props.numLevels}
            >
                <FAIcon iconId="plus" />
            </button>
        </div>
    );
}

export default CAPLevelSelector;
