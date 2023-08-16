//

import React from "react";

import { faSquare as faSquareRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faRightLeft,
    faShuffle,
    faSquare as faSquareSolid,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import { IconCell, Ellipses } from "src/features/Cells";

import { boolArrayToInt, intToBoolArray } from "../../ts/Utils";

import { useAppSelector, useStateObj } from "src/app/hooks";

import { useAppDispatch } from "src/app/hooks";
import {
    allRulesAlive,
    allRulesDead,
    inverseRules,
    randomRules,
} from "src/app/slices/rules";
import { Box, Grid } from "@mui/material";
import RulesSelector from "src/features/RuleSelector";

export default function Rules1D() {
    //

    const onHoverCell = useStateObj(0);

    return (
        <Grid container rowSpacing={2}>
            {/* Row 1 */}
            <Grid container item alignItems="center">
                {/* Rule number */}
                <Grid item md>
                    <RuleNumber />
                </Grid>
                {/* Rule preview */}
                <Grid item md>
                    <RulePreview index={onHoverCell.get} />
                </Grid>
                {/* Controls */}
                <Grid item md>
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
    const ruleNum = useAppSelector((state) =>
        boolArrayToInt(state.rules.value, true)
    );

    return (
        <Box className="cap-component-container w-max p-2 mx-auto text-center">
            <Box className="cap-component-label">Rule number</Box>{" "}
            <Box className="text-2xl font-light">{ruleNum}</Box>
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
        <Box className="cap-component-container w-max p-2 space-x-1.5 mx-auto">
            <Ellipses
                size="xs"
                cells={cells}
                mainCell={mainCell}
                nbhdType={nbhdType}
            />
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
