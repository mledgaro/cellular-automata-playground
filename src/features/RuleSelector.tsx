//
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
    resizeRules,
    setRulesByNumber,
    toggleRule,
} from "src/app/slices/rules";

export default function RulesSelector({
    setHoverCell,
}: {
    setHoverCell: (val: number) => void;
}) {
    //

    const nbhdWidth = useAppSelector((state) => state.nbhdWidth.value);
    const rules = useAppSelector((state) => state.rules.value);

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
    let classes =
        "inline-block box-border w-8 rounded-sm text-sm text-jet text-center py-1.5 mr-2 mb-2 " +
        (on ? "bg-sunglow" : "bg-french-gray");

    return (
        <Box
            className={classes}
            onClick={toggle}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            {index}
        </Box>
    );
}
