//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { intToBoolArray } from "src/ts/Utils";

import { initialState as nbhdWidth } from "./nbhdWidth";

interface RulesState {
    value: boolean[];
}

export const initialState: RulesState = {
    value: intToBoolArray(90, Math.pow(2, nbhdWidth.value)),
};

export const rulesSlice = createSlice({
    name: "rules",
    initialState,
    reducers: {
        resizeRules: (state, action: PayloadAction<number>) => {
            state.value = Array(action.payload).fill(false);
        },
        setRulesByNumber: (state, action: PayloadAction<number>) => {
            state.value = intToBoolArray(action.payload, state.value.length);
        },
        allRulesAlive: (state) => {
            state.value = Array(state.value.length).fill(true);
        },
        allRulesDead: (state) => {
            state.value = Array(state.value.length).fill(false);
        },
        randomRules: (state) => {
            state.value = state.value.map(() => Math.random() <= 0.5);
        },
        inverseRules: (state) => {
            state.value = state.value.map((e) => !e);
        },
        toggleRule: (state, action: PayloadAction<number>) => {
            state.value = state.value.map((e, i) =>
                i === action.payload ? !e : e
            );
        },
    },
});

export const {
    resizeRules,
    setRulesByNumber,
    allRulesAlive,
    allRulesDead,
    randomRules,
    inverseRules,
    toggleRule,
} = rulesSlice.actions;

export default rulesSlice.reducer;
