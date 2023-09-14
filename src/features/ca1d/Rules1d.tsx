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

import { useAppDispatch, useAppSelector, useStateObj } from "src/app/hooks";

import { Box, Grid } from "@mui/material";
import InputNumber from "src/components/InputNumber";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { selectNbhdWidth } from "src/app/slices/ca1d/nbhdWidth";
import {
    invertRules,
    randomRules,
    resizeRules,
    selectRules,
    setRulesByNumber,
    toggleRule,
    turnOffRules,
    turnOnRules,
} from "src/app/slices/ca1d/rules";
import { boolArrayToInt } from "src/ts/Utils";

export default function Rules1d() {
    //
    const nbhdWidth = useAppSelector(selectNbhdWidth);
    const rules = useAppSelector(selectRules);

    const dispatch = useAppDispatch();

    const onHoverCell = useStateObj<number>(0);
    const numRule = useStateObj<number>(boolArrayToInt(rules, true));

    useEffect(() => {
        const rulesNum = Math.pow(2, nbhdWidth);
        if (rules.length !== rulesNum) {
            dispatch(resizeRules(rulesNum));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        numRule.set(boolArrayToInt(rules, true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rules]);

    return (
        <Box className="space-y-4">
            <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid item md="auto" className="">
                    <InputNumber
                        state={numRule}
                        min={0}
                        max={100_000_000}
                        label="Rule number"
                        onBlur={() => dispatch(setRulesByNumber(numRule.get))}
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

function Controls({ size = "xl", gap = 2 }: { size?: SizeProp; gap?: number }) {
    //
    const dispatch = useAppDispatch();

    return (
        <Box className={`space-x-${gap}`}>
            <IconButton
                tooltipLabel="Random"
                icon={faShuffle}
                iconSize={size}
                onClick={() => dispatch(randomRules(0.5))}
            />
            <IconButton
                tooltipLabel="Invert"
                icon={faRightLeft}
                iconSize={size}
                onClick={() => dispatch(invertRules())}
            />
            <IconButton
                tooltipLabel="All alive"
                icon={faSquareSolid}
                iconSize={size}
                onClick={() => dispatch(turnOnRules())}
            />
            <IconButton
                tooltipLabel="All dead"
                icon={faSquareRegular}
                iconSize={size}
                onClick={() => dispatch(turnOffRules())}
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

    const toggle = (idx: number) => dispatch(toggleRule(idx));

    let rulesArr = [];

    for (let i = rules.length - 1; i >= 0; i--) {
        rulesArr.push(
            <Box
                key={i}
                className={`rule-1d-cell ${rules[i] ? "on" : "off"}`}
                onClick={() => toggle(i)}
                onMouseOver={() => setHoverCell(i)}
                onMouseOut={() => setHoverCell(0)}
            >
                {i}
            </Box>
        );
    }

    return <Box className="w-fit">{rulesArr}</Box>;
}
