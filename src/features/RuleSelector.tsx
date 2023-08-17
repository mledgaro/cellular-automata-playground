//
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { selectNbhdWidth } from "src/app/slices/nbhdWidth";
import {
    resizeRules,
    selectRules,
    setRulesByNumber,
    toggleRule,
} from "src/app/slices/rules";

export default function RulesSelector({
    setHoverCell,
}: {
    setHoverCell: (val: number) => void;
}) {
    //
    const nbhdWidth = useAppSelector(selectNbhdWidth);
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

    useEffect(() => {
        //
        dispatch(resizeRules(Math.pow(2, nbhdWidth)));
        dispatch(setRulesByNumber(90));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbhdWidth]);

    return (
        <Box className="cap-component-container pl-2 pt-2 pb-0 pr-0 w-fit">
            {rulesArr}
        </Box>
    );
}
