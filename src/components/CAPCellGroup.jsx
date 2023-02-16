//

import { inputGroupClasses } from "../js/Utils";
import FAIcon from "./FAIcon";

function Cell({ selected, onClick }) {
    //

    let icon = {
        id: selected ? "square-check" : "square",
        style: "regular",
        size: selected ? "2xl" : "lg",
    };

    return (
        <span
            className="input-group-text cap-text-label px-1"
            onClick={onClick}
        >
            &nbsp;
            <FAIcon icon={icon} />
        </span>
    );
}

function Ellipsis() {
    //

    return (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon icon={{ id: "ellipsis", size: "xs" }} />
        </span>
    );
}

function Container({ content, size, alignment, onClick }) {
    return (
        <div
            className={inputGroupClasses(size, alignment, "")}
            // onClick={() => setSelected(selected === 0 ? -1 : 0)}
            onClick={onClick}
        >
            {content}
        </div>
    );
}

export default function CAPCellGroup({
    type,
    numCells,
    selected,
    size,
    alignment,
}) {
    //

    let cells = [];
    let onClickCell = (i) => {};
    let onClickCont = () => {};
    let lastIdx = numCells - 1;

    selected.set(selected.get === -1 ? lastIdx : selected.get);

    if (type === "insitu") {
        onClickCell = (i) => selected.set(i);
    } else {
        onClickCont = () => selected.set(selected.get === 0 ? lastIdx : 0);
    }

    for (let i = 0; i < numCells; i++) {
        cells.push(
            <Cell
                selected={selected.get === i}
                onClick={() => onClickCell(i)}
            />
        );
    }

    if (type === "grouped") {
        if (selected.get === 0) {
            cells.splice(1, 0, <Ellipsis />);
        } else {
            cells.splice(lastIdx, 0, <Ellipsis />);
        }
    } else if (type === "scattered") {
        for (let i = 0; i < lastIdx; i++) {
            cells.splice(i * 2 + 1, 0, <Ellipsis />);
        }
    }

    return (
        <Container
            content={cells}
            size={size}
            alignment={alignment}
            onClick={onClickCont}
        />
    );
}
