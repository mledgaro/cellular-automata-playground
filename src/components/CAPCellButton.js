//

import { useState } from "react";

function CAPCellButton(props) {
    let [alive, setAlive] = useState(false);
    let [highlighted, setHighlighted] = useState(false);

    let alive_ = alive ? "on" : "off";
    let highlighted_ = highlighted ? ` cap-cell-btn-${alive_}-high` : "";

    return (
        <button
            type="button"
            className={"cap-cell-btn cap-cell-btn-" + alive_ + highlighted_}
            onClick={() => setAlive(!alive)}
            onMouseOver={() => setHighlighted(true)}
            onMouseOut={() => setHighlighted(false)}
        >
            {props.index}
        </button>
    );
}

export default CAPCellButton;
