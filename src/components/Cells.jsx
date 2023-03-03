//

import { faSquareCheck, faSquare as faSquareRegular } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faSquare as faSquareSolid, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DeactivatedCell({ onClick }) {
    //

    return (
        <span
            className="cap-icon-cell"
            onClick={onClick}
            style={{ color: "#6c757d" }}
        >
            <FontAwesomeIcon icon={faSquareXmark} size="sm" />
        </span>
    );
}

export function SelectedCell({ onClick }) {
    //

    return (
        <span className="cap-icon-cell" onClick={onClick}>
            
            <FontAwesomeIcon icon={faSquareCheck} size="2xl" />
        </span>
    );
}

export function Cell({ alive, lg, onClick }) {
    //

    alive = alive == null ? false : alive;
    lg = lg == null ? true : lg;

    return (
        <span className="cap-icon-cell" onClick={onClick}>
            <FontAwesomeIcon
                icon={alive ? faSquareSolid : faSquareRegular}
                size={lg ? "lg" : "xs"}
            />
        </span>
    );
}

function Ellipsis() {
    //

    return (
        <span className="cap-icon-cell">
            <FontAwesomeIcon
                icon={faEllipsis}
                size="2xs"
            />
        </span>
    );
}

/**
 *
 * @param {Array} cells
 * @param {Integer} mainCell
 * @param {String} style 'none' | 'main-cell' | 'all'
 */
export function Ellipses({ cells, mainCell, style }) {
    //

    let cells_ = [...cells];
    const lastIdx = cells_.length - 1;

    if (style === "main-cell") {

        if (mainCell >= 0 && mainCell < lastIdx) {
            cells_.splice(mainCell + 1, 0, <Ellipsis />);
        }

        if (mainCell > 0 && mainCell <= lastIdx) {
            cells_.splice(mainCell, 0, <Ellipsis />);
        }

    } else if (style === "all") {
        
        for (let i = lastIdx; i > 0; i--) {
            cells_.splice(i, 0, <Ellipsis />);
        }
        
    }

    return <span>{cells_}</span>;
}
