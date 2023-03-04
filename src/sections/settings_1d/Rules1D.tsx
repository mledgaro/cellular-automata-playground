//

import React from "react";

import { faSquare as faSquareRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faArrowRight,
    faRightLeft,
    faShuffle,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { BoolArrHook } from "src/CustomHooks";
import Button from "../../components/Button";
import { Cell, Ellipses, EllipsesStyle } from "../../components/Cells";
import { useStateObj } from "../../CustomHooks";
import {
    boolArray,
    boolArrayNot,
    boolArrayToInt,
    inputGroupClasses,
    intToBoolArray,
    randomBoolArray,
} from "../../ts/Utils";

function RuleNumber({ num }: { num: number }) {
    //

    return (
        <div className="col-lg">
            <div
                className="cap-container-dark-1 px-3 py-1 mx-auto"
                style={{ width: "fit-content" }}
            >
                Rule number {num}
            </div>
        </div>
    );
}

function Controls({ rules }: { rules: BoolArrHook }) {
    //

    return (
        <div className="col-lg">
            <div className={inputGroupClasses("md", "center", "")}>
                <Button
                    tooltipLabel="Random"
                    icon={faShuffle}
                    onClick={() => rules.set(randomBoolArray(rules.get.length))}
                />

                <Button
                    tooltipLabel="Swap"
                    icon={faRightLeft}
                    onClick={() => rules.set(boolArrayNot(rules.get))}
                />

                <Button
                    tooltipLabel="All alive"
                    icon={faSquareSolid}
                    onClick={() => rules.set(boolArray(rules.get.length, true))}
                />

                <Button
                    tooltipLabel="All dead"
                    icon={faSquareRegular}
                    onClick={() =>
                        rules.set(boolArray(rules.get.length, false))
                    }
                />
            </div>
        </div>
    );
}

function Rule({
    type,
    index,
    nbhdWidth,
    mainCell,
    selection,
}: {
    type: EllipsesStyle;
    index: number;
    nbhdWidth: number;
    mainCell: number;
    selection: { get: boolean; change: () => void };
}) {
    //

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <Cell key={i} alive={e} lg={i === mainCell} />
    ));

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "max-content" }}
            onClick={selection.change}
        >
            <Ellipses cells={cells} mainCell={mainCell} style={type} />

            <span className="cap-icon-cell">
                <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </span>

            <Cell alive={selection.get} />
        </div>
    );
}

function RulesSet1D({
    nbhdType,
    nbhdWidth,
    mainCell,
    states,
}: {
    nbhdType: EllipsesStyle;
    nbhdWidth: number;
    mainCell: number;
    states: BoolArrHook;
}) {
    //

    return (
        <div className="row mt-3 w-75 mx-auto">
            {states.get.map((e, i) => {
                return (
                    <div className="col-3 my-1">
                        <Rule
                            key={i}
                            type={nbhdType}
                            index={i}
                            nbhdWidth={nbhdWidth}
                            mainCell={mainCell}
                            selection={{
                                get: e,
                                change: () =>
                                    states.set(
                                        states.get.map((e, j) =>
                                            j === i ? !e : e
                                        )
                                    ),
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default function Rules1D({
    nbhdType,
    nbhdWidth,
    mainCell,
    rules,
}: {
    nbhdType: EllipsesStyle;
    nbhdWidth: number;
    mainCell: number;
    rules: BoolArrHook;
}) {
    //

    const ruleNumber = useStateObj(boolArrayToInt(rules.get));

    useEffect(() => {
        ruleNumber.set(boolArrayToInt(rules.get, true));
    }, [rules.get]);

    return (
        <div className="mt-3">
            <div className="row mx-auto" style={{ width: "60%" }}>
                <RuleNumber num={ruleNumber.get} />

                <Controls rules={rules} />
            </div>

            <RulesSet1D
                nbhdType={nbhdType}
                nbhdWidth={nbhdWidth}
                mainCell={mainCell}
                states={rules}
            />
        </div>
    );
}
