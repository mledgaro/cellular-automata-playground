//

import { inputGroupClasses } from "../js/Utils";
import Button from "./Button";
import { useRangeReducer } from "./CustomHooks";
import FAIcon from "./FAIcon";

function Level({ on }) {
    //

    return (
        <span
            className={`input-group-text cap-level cap-level-${
                on ? "on" : "off"
            }`}
        ></span>
    );
}

function Levels({ current, total }) {
    //

    let arr = [];

    for (let i = 0; i < total; i++) {
        arr.push(<Level key={i} on={i <= current} />);
    }

    return <span>{arr}</span>;
}

export default function LevelSelector({
    iconId,
    numLevels,
    tooltipLabel,
    size,
    alignment,
}) {
    //

    const level = useRangeReducer(0, numLevels, 0, false);

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
                enabled={level.get > 0}
                onClick={level.prev}
            />

            <Levels current={level.get} total={numLevels} />

            <Button
                icon={{ id: "plus" }}
                enabled={level.get < numLevels}
                onClick={level.next}
            />
        </div>
    );
}
