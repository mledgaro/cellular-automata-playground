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
import { IconCell, Ellipses, RoundCell } from "../../components/Cells";

import { inputGroupClasses, intToBoolArray } from "../../ts/Utils";
import { NbhdType } from "src/ts/CellularAutomaton";

import {
    APICtx,
    MainCellCtx,
    NbhdTypeCtx,
    NbhdWidthCtx,
    RulesCtx,
} from "src/App";
import { useStateObj } from "src/ts/CustomHooks";

function RuleNumber() {
    //

    const rules = useContext(RulesCtx);

    return (
        <div className="col-lg">
            <div
                className="cap-container-dark-1 px-3 py-1 mx-auto"
                style={{ width: "fit-content" }}
            >
                Rule number {rules.asNum}
            </div>
        </div>
    );
}

function Controls() {
    //

    const api = useContext(APICtx);

    return (
        <div className="col-lg">
            <div className={inputGroupClasses("md", "center", "")}>
                <Button
                    tooltipLabel="Random"
                    icon={faShuffle}
                    onClick={api.rules.random}
                />

                <Button
                    tooltipLabel="Swap"
                    icon={faRightLeft}
                    onClick={api.rules.invert}
                />

                <Button
                    tooltipLabel="All alive"
                    icon={faSquareSolid}
                    onClick={api.rules.allAlive}
                />

                <Button
                    tooltipLabel="All dead"
                    icon={faSquareRegular}
                    onClick={api.rules.allDead}
                />
            </div>
        </div>
    );
}

function Rule({ index }: { index: number }) {
    //

    const nbhdType = useContext(NbhdTypeCtx) as NbhdType;
    const nbhdWidth = useContext(NbhdWidthCtx);
    const mainCell = useContext(MainCellCtx);
    const rules = useContext(RulesCtx);
    const api = useContext(APICtx);

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <IconCell key={i} alive={e} size={i === mainCell ? "lg" : "xs"} />
    ));

    return (
        <div
            className="cap-container-dark-1 mx-auto"
            style={{ padding: "8px", width: "max-content" }}
            onClick={() => api.rules.toggle(index)}
        >
            <Ellipses cells={cells} mainCell={mainCell} nbhdType={nbhdType} />

            <span className="cap-icon-cell">
                <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </span>

            <IconCell alive={rules.get(index)} />
        </div>
    );
}

function RulesSet1D() {
    //

    const rules = useContext(RulesCtx);

    let rulesArr = [];

    for (let i = 0; i < rules.num; i++) {
        rulesArr.push(
            <div className="col-3 my-1">
                <Rule key={i} index={i} />
            </div>
        );
    }

    return <div className="row mt-3 w-75 mx-auto">{rulesArr}</div>;
}

function RulePreview({ index }: { index: number }) {
    //

    const nbhdType = useContext(NbhdTypeCtx) as NbhdType;
    const nbhdWidth = useContext(NbhdWidthCtx);
    const mainCell = useContext(MainCellCtx);

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

function RulesSet({ setHoverCell }: { setHoverCell: (val: number) => void }) {
    //

    const rules = useContext(RulesCtx);
    const api = useContext(APICtx);

    let rulesArr = [];

    for (let i = rules.num - 1; i >= 0; i--) {
        rulesArr.push(
            <RoundCell
                key={i}
                alive={rules.get(i)}
                toggle={() => api.rules.toggle(i)}
                onMouseOver={() => setHoverCell(i)}
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

export default function Rules1D() {
    //

    // const api = useContext(APICtx);

    // api.rules.random();

    const onHoverCell = useStateObj(0);

    return (
        <div className="mt-3">
            <div className="row mx-auto" style={{ width: "60%" }}>
                {/*  */}

                <RuleNumber />

                <Controls />
            </div>

            <RulesSet setHoverCell={onHoverCell.set} />

            <div className="mt-2 mx-auto" style={{ width: "max-content" }}>
                <RulePreview index={onHoverCell.get} />
            </div>
        </div>
    );
}
