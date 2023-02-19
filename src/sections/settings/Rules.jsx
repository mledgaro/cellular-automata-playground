//

import CAPButton from "../../components/CAPButton";
import { CAPRule1D, CAPRule2D, Rule2D } from "../../components/CAPRule";
import { diagonalNeighbors, inputGroupClasses } from "../../js/Utils";

export function Rules1D({ nbhdType, nbhdWidth, mainCell }) {
    //

    let rules = [];

    for (let i = 0; i < 8; i++) {
        rules.push(
            <div className="col-3 my-1">
                <CAPRule1D
                    type={nbhdType}
                    index={i}
                    nbhdWidth={nbhdWidth}
                    mainCell={mainCell}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg">
                    <div className={inputGroupClasses("", "center", "")}>
                        <span
                            className="input-group-text cap-container-dark-1"
                            style={{ minWidth: "2rem" }}
                        >
                            Rule number
                        </span>
                        <span
                            className="input-group-text cap-container-dark-1"
                            style={{ minWidth: "2rem" }}
                        >
                            90
                        </span>
                    </div>
                </div>

                {/* <!-- Buttons --> */}
                <div className="col-lg">
                    <div className={inputGroupClasses("", "center", "")}>
                        <CAPButton
                            tooltipLabel="Uncheck all"
                            icon={{ id: "square", style: "regular" }}
                        />

                        <CAPButton
                            tooltipLabel="Check all"
                            icon={{ id: "square" }}
                        />

                        <CAPButton
                            tooltipLabel="Random"
                            icon={{ id: "shuffle" }}
                        />

                        <CAPButton
                            tooltipLabel="Invert selection"
                            icon={{ id: "right-left" }}
                        />
                    </div>
                </div>
            </div>

            <div className="row mt-3">{rules}</div>
        </div>
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
