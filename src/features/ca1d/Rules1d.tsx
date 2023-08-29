//
import React from "react";

import { faSquare as faSquareRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faRightLeft,
    faShuffle,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import { RulePreview } from "src/features/ca1d/CellsGroups";

import { useAppSelector, useStateObj } from "src/app/hooks";

import { useAppDispatch } from "src/app/hooks";
import {
    allRulesAlive,
    allRulesDead,
    inverseRules,
    randomRules,
    selectRuleNumber,
    selectRules,
    toggleRule,
} from "src/app/slices/rules";
import { Box, Grid } from "@mui/material";

export default function Rules1d() {
    //
    const onHoverCell = useStateObj<number>(0);

    return (
        <Grid container rowSpacing={2}>
            {/* Row 1 */}
            <Grid
                container
                item
                alignItems="center"
                justifyContent="space-evenly"
            >
                {/* Rule number */}
                <Grid item md="auto">
                    <RuleNumber />
                </Grid>
                {/* Rule preview */}
                <Grid item md="auto">
                    <RulePreview index={onHoverCell.get} />
                </Grid>
                {/* Controls */}
                <Grid item md="auto">
                    <Controls />
                </Grid>
            </Grid>
            {/* Row 2 */}
            <Grid container item className="mx-auto w-fit">
                <RulesSelector setHoverCell={onHoverCell.set} />
            </Grid>
        </Grid>
    );
}

function RuleNumber() {
    //
    const ruleNum = useAppSelector(selectRuleNumber);

    return (
        <Box className="cap-component-container w-max p-2 mx-auto text-center">
            <Box className="cap-component-label">Rule number</Box>{" "}
            <Box className="text-2xl font-light">{ruleNum}</Box>
        </Box>
    );
}

function Controls() {
    //
    const dispatch = useAppDispatch();

    return (
        <Box className="space-x-2 flex justify-center">
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

function RulesSelector({
    setHoverCell,
}: {
    setHoverCell: (val: number) => void;
}) {
    //
    const rules = useAppSelector(selectRules);

    const dispatch = useAppDispatch();

    const cellClasses =
        "inline-block box-border w-8 rounded-sm text-sm text-jet text-center py-1.5 mr-2 mb-2";
    let rulesArr = [];

    for (let i = rules.length - 1; i >= 0; i--) {
        rulesArr.push(
            <Box
                key={i}
                className={
                    cellClasses + (rules[i] ? " bg-sunglow" : " bg-french-gray")
                }
                onClick={() => dispatch(toggleRule(i))}
                onMouseOver={() => setHoverCell(i)}
                onMouseOut={() => setHoverCell(0)}
            >
                {i}
            </Box>
        );
    }

    return (
        <Box className="cap-component-container pl-2 pt-2 pb-0 pr-0 w-fit">
            {rulesArr}
        </Box>
    );
}
