//

import { inputGroupClasses } from "../js/Utils";
import FAIcon from "./FAIcon";

export function CAPCellGroupInSitu(props) {
    //

    let cells = [];

    for (let i = 0, icon, size; i < props.numCells; i++) {
        icon = props.selected === i ? "square-check" : "square";
        size = props.selected === i ? "2xl" : "lg";
        cells.push(
            <span
                className="input-group-text cap-text-label px-1"
                onClick={() => props.setSelected(i)}
            >
                &nbsp;
                <FAIcon iconId={icon} iconStyle="regular" iconSize={size} />
            </span>
        );
    }
    
    return (
        <div className={inputGroupClasses(props.size, props.alignment, "")}>{cells}</div>
    );
}
export function CAPCellGroupGrouped(props) {
    //

    let cells = [];

    let selectedCell = (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon iconId="square-check" iconStyle="regular" iconSize="2xl" />
        </span>
    );

    let cell = (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon iconId="square" iconStyle="regular" />
        </span>
    );

    let ellipsis = (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon iconId="ellipsis" iconSize="sm" />
        </span>
    );

    for (let i = 1; i < props.numCells; i++) {
        cells.push(cell);
    }

    if (props.selected === 0) {
        cells.unshift(selectedCell, ellipsis);
    } else {
        cells.push(ellipsis, selectedCell);
    }

    return (
        <div
            className={inputGroupClasses(props.size, props.alignment, "")}
            onClick={() => props.setSelected(props.selected === 0 ? -1 : 0)}
        >
            {cells}
        </div>
    );
}
export function CAPCellGroupScattered(props) {
    //

    let cells = [];
    let selectedCell, cell, ellipsis;

    selectedCell = (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon iconId="square-check" iconStyle="regular" iconSize="2xl" />
        </span>
    );

    cell = (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon iconId="square" iconStyle="regular" />
        </span>
    );

    ellipsis = (
        <span className="input-group-text cap-text-label px-1">
            &nbsp;
            <FAIcon iconId="ellipsis" iconSize="sm" />
        </span>
    );

    for (let i = 1; i < props.numCells; i++) {
        cells.push(cell);
        cells.push(ellipsis);
    }

    if (props.selected === 0) {
        cells.unshift(selectedCell, ellipsis);
        cells.pop();
    } else {
        cells.push(selectedCell);
    }

    return (
        <div
            className={inputGroupClasses(props.size, props.alignment, "")}
            onClick={() => props.setSelected(props.selected === 0 ? -1 : 0)}
        >
            {cells}
        </div>
    );
}
