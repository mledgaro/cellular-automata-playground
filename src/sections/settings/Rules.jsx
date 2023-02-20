//

import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Rule1D, Rule2D } from "../../components/Rule";
import {
    diagonalNeighbors,
    inputGroupClasses,
    boolArray,
    randomBoolArray,
    boolArrayNot,
    boolArrayToInt,
    intToBoolArray,
} from "../../js/Utils";

function RuleNumber({ value }) {
    //

    return (
        <div className="col-lg">
            <div
                className="cap-container-dark-1 px-3 py-1 mx-auto"
                style={{ width: "fit-content" }}
            >
                Rule number {value}
            </div>
        </div>
    );
}

function Controls({ rulesState }) {
    //

    return (
        <div className="col-lg">
            <div className={inputGroupClasses("", "center", "")}>
                <Button
                    tooltipLabel="Random"
                    icon={{ id: "shuffle" }}
                    onClick={() =>
                        rulesState.set(randomBoolArray(rulesState.get.length))
                    }
                />

                <Button
                    tooltipLabel="Swap"
                    icon={{ id: "right-left" }}
                    onClick={() => rulesState.set(boolArrayNot(rulesState.get))}
                />

                <Button
                    tooltipLabel="All alive"
                    icon={{ id: "square", style: "solid" }}
                    onClick={() =>
                        rulesState.set(boolArray(rulesState.get.length, true))
                    }
                />

                <Button
                    tooltipLabel="All dead"
                    icon={{ id: "square", style: "regular" }}
                    onClick={() =>
                        rulesState.set(boolArray(rulesState.get.length, false))
                    }
                />
            </div>
        </div>
    );
}

function ColRule1D({ type, index, nbhdWidth, mainCell, state }) {
    //

    return (
        <div className="col-lg-3 my-1">
            <Rule1D
                type={type}
                index={index}
                nbhdWidth={nbhdWidth}
                mainCell={mainCell}
                state={state}
            />
        </div>
    );
}

function RulesSet1D({ nbhdType, nbhdWidth, mainCell, states }) {
    //

    return (
        <div className="row mt-3 w-75 mx-auto">
            {states.get.map((e, i) => {
                return (
                    <ColRule1D
                        key={i}
                        type={nbhdType}
                        index={i}
                        nbhdWidth={nbhdWidth}
                        mainCell={mainCell}
                        state={{get: e, change: () => states.set(states.get.map((e, j) => j === i ? !e : e))}}
                    />
                );
            })}
        </div>
    );
}

export function Rules1D({ nbhdType, nbhdWidth, mainCell }) {
    //

    let numRules = Math.pow(2, nbhdWidth);

    const [rulesState, setRulesState] = useState(intToBoolArray(90, numRules));

    const [ruleNumber, setRuleNumber] = useState(boolArrayToInt(rulesState));

    useEffect(() => {
        setRuleNumber(boolArrayToInt(rulesState, true));
    }, [rulesState]);

    return (
        <div className="mt-3">
            <div className="row mx-auto" style={{ width: "60%" }}>
                <RuleNumber value={ruleNumber} />

                <Controls
                    rulesState={{ get: rulesState, set: setRulesState }}
                />
            </div>

            <RulesSet1D
                nbhdType={nbhdType}
                nbhdWidth={nbhdWidth}
                mainCell={mainCell}
                states={{ get: rulesState, set: setRulesState }}
            />
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
