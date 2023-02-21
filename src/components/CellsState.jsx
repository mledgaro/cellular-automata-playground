//

function Cell({ on, high }) {
    //

    let stateTags = on.get ? "on" : "off";
    stateTags += high ? "-high" : "";

    return (
        <span
            className={`cap-cell cap-cell-${stateTags}`}
            onClick={on.change}
        ></span>
    );
}

export default function CellsSet({ cellsState }) {
    //

    let cells = [];

    cellsState.get.forEach((e, i) => {
        cells.push(
            <Cell
                key={i}
                on={{
                    get: e,
                    change: () =>
                        cellsState.set(
                            cellsState.get.map((e, j) => (j === i ? !e : e))
                        ),
                }}
                high={false}
            />
        );
    });

    return (
        <div className="row mx-auto ps-2" style={{ width: "90%" }}>
            {cells}
        </div>
    );
}
