//

import { useState } from "react";

function Cell({ id, on, high }) {
    //

    let [on_, setOn] = useState(on);
    // let [on, setOn] = useState(false);

    let stateTags = on_ ? "on" : "off";
    stateTags += high ? "-high" : "";

    return (
        <span
            id={`cell-${id}`}
            className={`cap-cell cap-cell-${stateTags}`}
            onClick={() => setOn(!on_)}
        ></span>
    );
}

export default function CellSet({ cellsState }) {
    //

    let cells = [];

    cellsState.forEach((e, i) => {
        cells.push(<Cell id={i} on={e} high={false} />);
    });

    return (
        <div className="row mx-auto ps-2" style={{ width: "90%" }}>
            {cells}
        </div>
    );
}
