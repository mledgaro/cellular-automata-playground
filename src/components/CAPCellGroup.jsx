//

import { inputGroupClasses } from "../js/Utils";
import FAIcon from "./FAIcon";

function Cell(props) {
    //

    let icon, size;

    icon = props.selected ? "square-check" : "square";
    size = props.selected ? "2xl" : "lg";

    return (
        <span
            className="input-group-text cap-text-label px-1"
            onClick={props.onClick}
        >
            &nbsp;
            <FAIcon iconId={icon} iconStyle="regular" iconSize={size} />
        </span>
    );
}

function Ellipsis() {
    //

    return (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon iconId="ellipsis" iconSize="xs" />
        </span>
    );
}

function Container(props) {
    return (
        <div
            className={inputGroupClasses(props.size, props.alignment, "")}
            // onClick={() => props.setSelected(props.selected === 0 ? -1 : 0)}
            onClick={props.onClick}
        >
            {props.content}
        </div>
    );
}

export default function CAPCellGroup(props) {
    //

    let cells = [];
    let onClickCell = (i) => {};
    let onClickCont = () => {};
    let lastIdx = props.numCells - 1;

    props.selected.set(
        props.selected.get === -1 ? lastIdx : props.selected.get
    );

    if (props.type === "insitu") {
        onClickCell = (i) => props.selected.set(i);
    } else {
        onClickCont = () =>
            props.selected.set(props.selected.get === 0 ? lastIdx : 0);
    }

    for (let i = 0; i < props.numCells; i++) {
        cells.push(
            <Cell
                selected={props.selected.get === i}
                onClick={() => onClickCell(i)}
            />
        );
    }

    if (props.type === "grouped") {
        if (props.selected.get === 0) {
            cells.splice(1, 0, <Ellipsis />);
        } else {
            cells.splice(lastIdx, 0, <Ellipsis />);
        }
    } else if (props.type === "scattered") {
        for (let i = 0; i < lastIdx; i++) {
            cells.splice(i * 2 + 1, 0, <Ellipsis />);
        }
    }

    return (
        <Container
            content={cells}
            size={props.size}
            alignment={props.alignment}
            onClick={onClickCont}
        />
    );
}
