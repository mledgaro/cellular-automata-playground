//

import { useEffect } from "react";
import Button from "../../components/Button";
import { Cell, Ellipses } from "../../components/Cells";
import { useStateObj } from "../../components/CustomHooks";
import FAIcon from "../../components/FAIcon";
import {
    boolArray,
    boolArrayNot,
    boolArrayToInt,
    inputGroupClasses,
    intToBoolArray,
    randomBoolArray,
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

function Rule({ type, index, nbhdWidth, mainCell, selection }) {
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
                <FAIcon
                    icon={{ id: "arrow-right", style: "solid", size: "sm" }}
                />
            </span>

            <Cell alive={selection.get} />
        </div>
    );
}

function RulesSet1D({ nbhdType, nbhdWidth, mainCell, states }) {
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

export default function Rules1D({ nbhdType, nbhdWidth, mainCell, rulesState }) {
    //

    const ruleNumber = useStateObj(boolArrayToInt(rulesState.get));

    useEffect(() => {
        ruleNumber.set(boolArrayToInt(rulesState.get, true));
    }, [rulesState.get]);

    return (
        <div className="mt-3">
            <div className="row mx-auto" style={{ width: "60%" }}>
                <RuleNumber value={ruleNumber.get} />

                <Controls rulesState={rulesState} />
            </div>

            <RulesSet1D
                nbhdType={nbhdType}
                nbhdWidth={nbhdWidth}
                mainCell={mainCell}
                states={rulesState}
            />
        </div>
    );
}
