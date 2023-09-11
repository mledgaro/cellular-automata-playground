//
import React, { useEffect } from "react";

import { faSquare as faSquareRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faRightLeft,
    faShuffle,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "src/components/Button";
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
    setRulesByNumber,
    toggleRule,
} from "src/app/slices/ca1d/rules";
import { Box, Grid } from "@mui/material";
import InputNumber from "src/components/InputNumber";

export default function Rules1d() {
    //
    const onHoverCell = useStateObj<number>(0);
    const ruleNum = useAppSelector(selectRuleNumber);
    const ruleNum_ = useStateObj(ruleNum);
    const dispatch = useAppDispatch();

    useEffect(() => {
        ruleNum_.set(ruleNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ruleNum]);

    return (
        <Box className="space-y-4">
            <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid item md="auto" className="">
                    <InputNumber
                        state={ruleNum_}
                        min={0}
                        max={100_000_000}
                        label="Rule number"
                        onBlur={() => dispatch(setRulesByNumber(ruleNum_.get))}
                    />
                </Grid>

                <Grid item md={4} className="flex justify-center">
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

function Controls() {
    //
    const dispatch = useAppDispatch();

    return (
        <Box className="space-x-2">
            <IconButton
                tooltipLabel="Random"
                icon={faShuffle}
                iconSize="xl"
                onClick={() => dispatch(randomRules())}
            />
            <IconButton
                tooltipLabel="Invert"
                icon={faRightLeft}
                iconSize="xl"
                onClick={() => dispatch(inverseRules())}
            />
            <IconButton
                tooltipLabel="All alive"
                icon={faSquareSolid}
                iconSize="xl"
                onClick={() => dispatch(allRulesAlive())}
            />
            <IconButton
                tooltipLabel="All dead"
                icon={faSquareRegular}
                iconSize="xl"
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

    return <Box className="w-fit">{rulesArr}</Box>;
}
