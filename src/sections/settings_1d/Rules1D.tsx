//

import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare as faSquareRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faArrowRight,
    faRightLeft,
    faShuffle,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import { IconCell, Ellipses } from "src/features/Cells";

import { boolArrayToInt, intToBoolArray } from "../../ts/Utils";

import { useAppSelector, useStateObj } from "src/app/hooks";
import Group from "src/components/deprecated/Group";

import { useAppDispatch } from "src/app/hooks";
import {
    allRulesAlive,
    allRulesDead,
    inverseRules,
    randomRules,
    resizeRules,
    setRulesByNumber,
    toggleRule,
} from "src/app/slices/rules";
import { Box } from "@mui/material";
import RulesSelector from "src/features/RuleSelector";

export default function Rules1D() {
    //

    const onHoverCell = useStateObj(0);

    return (
        <Box className="space-y-2 mb-5">
            <RuleNumber />
            <Controls />
            <RulePreview index={onHoverCell.get} />
            <RulesSelector setHoverCell={onHoverCell.set} />
        </Box>
    );
}

function RuleNumber() {
    //

    const ruleNum = useAppSelector((state) =>
        boolArrayToInt(state.rules.value, true)
    );

    return (
        <Box className="bg-jet text-sunglow w-max p-2 rounded-md">
            Rule number {ruleNum}
        </Box>
    );
}

function Controls() {
    //

    const dispatch = useAppDispatch();

    return (
        <Box className="space-x-2">
            <Button
                tooltipLabel="Random"
                icon={faShuffle}
                size="xl"
                onClick={() => dispatch(randomRules())}
            />
            <Button
                tooltipLabel="Invert"
                icon={faRightLeft}
                size="xl"
                onClick={() => dispatch(inverseRules())}
            />
            <Button
                tooltipLabel="All alive"
                icon={faSquareSolid}
                size="xl"
                onClick={() => dispatch(allRulesAlive())}
            />
            <Button
                tooltipLabel="All dead"
                icon={faSquareRegular}
                size="xl"
                onClick={() => dispatch(allRulesDead())}
            />
        </Box>
    );
}

function RulePreview({ index }: { index: number }) {
    //

    const nbhdType = useAppSelector((state) => state.nbhdType.value);
    const nbhdWidth = useAppSelector((state) => state.nbhdWidth.value);
    const mainCell = useAppSelector((state) => state.mainCell.value);

    let cells = intToBoolArray(index, nbhdWidth).map((e, i) => (
        <IconCell key={i} alive={e} size={i === mainCell ? "2xl" : "lg"} />
    ));

    return (
        <Box
            className="bg-jet text-sunglow rounded-md w-max p-2 space-x-1.5"
            style={{ padding: "8px", width: "max-content" }}
        >
            <Ellipses
                size="xs"
                cells={cells}
                mainCell={mainCell}
                nbhdType={nbhdType}
            />
        </Box>
    );
}
