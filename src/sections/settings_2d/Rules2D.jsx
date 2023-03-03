//

import { useState } from "react";
import FAIcon from "../../components/FAIcon";
import { diagonalNeighbors } from "../../js/Utils";

function Rule2D() {
    //

    const [state, setState] = useState(0);
    let icon;

    switch (state) {
        case 1:
            icon = { id: "square", style: "regular", size: "xl" };
            break;
        case 2:
            icon = { id: "square", style: "solid", size: "xl" };
            break;
        default:
            icon = { id: "square-minus", style: "regular", size: "xl" };
    }

    return (
        <span
            className=""
            onClick={() => setState(state === 2 ? 0 : state + 1)}
        >
            <FAIcon icon={icon} />
        </span>
    );
}
export function Rules2D({ nbhdType, nbhdWidth, nbhdHeight, mainCell }) {
    //

    let numRules;

    if (nbhdType === "vonneumann") {
        numRules = nbhdWidth + nbhdHeight - 2;
    } else if (nbhdType === "diagonal") {
        numRules = diagonalNeighbors(
            nbhdWidth,
            nbhdHeight,
            mainCell.r,
            mainCell.c
        );
    } else {
        // moore
        numRules = nbhdWidth * nbhdHeight - 1;
    }

    let rules = [];

    let headers = [];

    headers.push(<td className="cap-icon-cell">Neighbors</td>);
    rules.push(<td className="cap-icon-cell">State</td>);

    for (let i = 0; i <= numRules; i++) {
        headers.push(<td className="cap-icon-cell">{i}</td>);

        rules.push(
            <td>
                <Rule2D />
            </td>
        );
    }

    return (
        <table className="cap-container-dark-1 w-75 mx-auto">
            <tr>{headers}</tr>
            <tr>{rules}</tr>
        </table>
    );
}

