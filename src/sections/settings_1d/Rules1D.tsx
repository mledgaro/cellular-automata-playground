//

import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare as faSquareRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faArrowRight,
    faRightLeft,
    faShuffle,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import { IconCell, Ellipses } from "../../components/Cells";

import { intToBoolArray } from "../../ts/Utils";

import { useStateObj } from "src/ts/CustomHooks";
import Group from "src/components/Group";
import { dataStore } from "src/app/store";
import { useAppDispatch } from "src/app/hooks";
import {
    allAliveRules,
    allDeadRules,
    inverseRules,
    randomRules,
    toggleRule,
} from "src/features/rules";

export default function Rules1D() {
    //

    const onHoverCell = useStateObj(0);

    return (
        <div className="mt-3">
            <div className="row mx-auto" style={{ width: "60%" }}>
                {/*  */}

                <RuleNumber />

                <Controls />
            </div>

            <div className="mt-2 mx-auto" style={{ width: "max-content" }}>
                <RulePreview index={onHoverCell.get} />
            </div>

            <RulesSet setHoverCell={onHoverCell.set} />
        </div>
    );
}

function RuleNumber() {
    //

    const ruleNum = dataStore.rules.integer;

    return (
        <div className="col-lg">
            <div
                className="cap-container-dark-1 px-3 py-1 mx-auto"
                style={{ width: "fit-content" }}
            >
                Rule number {ruleNum}
            </div>
        </div>
    );
}

function Controls() {
    //

    const dispatch = useAppDispatch();

    return (
        <div className="col-lg">
            <Group
                elements={[
                    <Button
                        tooltipLabel="Random"
                        icon={faShuffle}
                        onClick={() => dispatch(randomRules())}
                    />,
                    <Button
                        tooltipLabel="Invert"
                        icon={faRightLeft}
                        onClick={() => dispatch(inverseRules())}
                    />,
                    <Button
                        tooltipLabel="All alive"
                        icon={faSquareSolid}
                        onClick={() => dispatch(allAliveRules())}
                    />,
                    <Button
                        tooltipLabel="All dead"
                        icon={faSquareRegular}
                        onClick={() => dispatch(allDeadRules())}
                    />,
                ]}
            />
        </div>
    );
}

function RulePreview({ index }: { index: number }) {
    //

    const nbhdType = dataStore.nbhdType;
    const nbhdWidth = dataStore.nbhdWidth;
    const mainCell = dataStore.mainCell;

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <IconCell key={i} alive={e} size={i === mainCell ? "2xl" : "lg"} />
    ));

    return (
        <div
            className="cap-container-dark-1"
            style={{ padding: "8px", width: "max-content" }}
        >
            <Ellipses cells={cells} mainCell={mainCell} nbhdType={nbhdType} />
        </div>
    );
}

function RuleCell({
    index,
    on,
    toggle,
    onMouseOver,
    onMouseOut,
}: {
    index: number;
    on: boolean;
    toggle: () => void;
    onMouseOver: () => void;
    onMouseOut: () => void;
}) {
    //

    const classes = `cap-rule-cell cap-rule-cell-${on ? "on" : "off"}`;

    return (
        <span
            className={classes}
            onClick={toggle}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            {index}
        </span>
    );
}

function RulesSet({ setHoverCell }: { setHoverCell: (val: number) => void }) {
    //

    const rules = dataStore.rules.arr;

    const dispatch = useAppDispatch();

    let rulesArr = [];

    for (let i = rules.length - 1; i >= 0; i--) {
        rulesArr.push(
            <RuleCell
                key={i}
                index={i}
                on={rules[i]}
                toggle={() => dispatch(toggleRule(i))}
                onMouseOver={() => setHoverCell(i)}
                onMouseOut={() => setHoverCell(0)}
            />
        );
    }

    return (
        <div
            className="row mx-auto my-2 d-flex justify-content-center"
            style={{ width: "85%" }}
        >
            {rulesArr}
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RuleToggle({ index }: { index: number }) {
    //

    const nbhdType = dataStore.nbhdType;
    const nbhdWidth = dataStore.nbhdWidth;
    const mainCell = dataStore.mainCell;
    const rules = dataStore.rules.arr;

    const dispatch = useAppDispatch();

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <IconCell key={i} alive={e} size={i === mainCell ? "lg" : "xs"} />
    ));

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "max-content" }}
            onClick={() => dispatch(toggleRule(index))}
        >
            <Ellipses cells={cells} mainCell={mainCell} nbhdType={nbhdType} />

            <span className="cap-icon-cell">
                <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </span>

            <IconCell alive={rules[index]} />
        </div>
    );
}
