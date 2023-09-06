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
        <Box className="space-y-2">
            <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid item md={4}>
                    <RuleNumber />
                </Grid>

                <Grid item md={4}>
                    <RulePreview index={onHoverCell.get} />
                </Grid>

                <Grid item md="auto">
                    <Controls />
                </Grid>
            </Grid>

            <Box className="flex justify-center">
                <RulesSelector setHoverCell={onHoverCell.set} />
            </Box>
        </Box>
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

function RulesSelector({
    setHoverCell,
}: {
    setHoverCell: (val: number) => void;
}) {
    //
    const rules = useAppSelector(selectRules);

    const dispatch = useAppDispatch();

    let rulesArr = [];

    for (let i = rules.length - 1; i >= 0; i--) {
        rulesArr.push(
            <Box
                key={i}
                className={`rule-1d-cell ${rules[i] ? "on" : "off"}`}
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
