//

import CAPButton from "../../components/CAPButton";
import { Rule1D, Rule2D } from "../../components/CAPRule";
import { diagonalNeighbors, inputGroupClasses } from "../../js/Utils";

export function Rules1D({ nbhdType, nbhdWidth, mainCell }) {
    //

    let rules = [];
    const ruleNumber = 90;

    for (let i = 0; i < 8; i++) {
        rules.push(
            <div className="col-lg-3 my-1">
                <Rule1D
                    type={nbhdType}
                    index={i}
                    nbhdWidth={nbhdWidth}
                    mainCell={mainCell}
                />
            </div>
        );
    }

    return (
        <div className="mt-3">
            <div className="row mx-auto" style={{width: "60%"}}>
                {/* Rule number */}
                <div className="col-lg">
                    <div className="cap-container-dark-1 px-3 py-1 mx-auto" style={{width: "fit-content"}}>
                        Rule number {ruleNumber}
                    </div>
                </div>

                {/* Controls */}
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

            <div className="row mt-3 w-75 mx-auto">{rules}</div>
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
