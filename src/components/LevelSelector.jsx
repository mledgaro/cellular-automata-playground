//

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inputGroupClasses } from "../js/Utils";
import Button from "./Button";
import { useRangeReducer } from "./CustomHooks";

function Level({ on }) {
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
    numLevels,
    tooltipLabel,
    size,
    alignment,
}) {
    //

    const level = useRangeReducer(0, numLevels, 0, false);

    let levels = [];

    for (let i = 0; i < numLevels; i++) {
        levels.push(<Level key={i} on={i < level.get} />);
    }

    return (
        <div className={inputGroupClasses(size, alignment, "")}>
            <span
                className="input-group-text cap-container-dark-1"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={tooltipLabel}
            >
                <FontAwesomeIcon
                    icon={icon}
                />
            </span>

            <Button
                icon={faMinus}
                enabled={level.get > 0}
                onClick={level.prev}
            />

            {levels}

            <Button
                icon={faPlus}
                enabled={level.get < numLevels}
                onClick={level.next}
            />
        </div>
    );
}
