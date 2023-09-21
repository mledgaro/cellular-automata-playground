import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { createArray, intToBoolArray, setArrayItem } from "src/ts/Utils";
import { defaultValue as nbhdWidthDefault } from "src/app/slices/ca1d/nbhdWidth";

interface RulesState {
    value: boolean[];
}

export const defaultValue = createArray(Math.pow(2, nbhdWidthDefault), false);

const initialState: RulesState = {
    value: defaultValue,
};

export const rulesSlice = createSlice({
    name: "rules",
    initialState,
    reducers: {
        setRules: (state, action: PayloadAction<boolean[]>) => {
            state.value = action.payload;
        },
        toggleRule: (state, action: PayloadAction<number>) => {
            state.value = setArrayItem(
                state.value,
                action.payload,
                !state.value[action.payload]
            );
        },
        turnOnRules: (state) => {
            state.value = createArray(state.value.length, true);
        },
        turnOffRules: (state) => {
            state.value = createArray(state.value.length, false);
        },
        invertRules: (state) => {
            state.value = state.value.map((rule) => !rule);
        },
        randomRules: (state, action: PayloadAction<number>) => {
            state.value = state.value.map(() => Math.random() < action.payload);
        },
        resizeRules: (state, action: PayloadAction<number>) => {
            state.value = createArray(action.payload, false);
        },
        setRulesByNumber: (state, action: PayloadAction<number>) => {
            state.value = intToBoolArray(
                action.payload,
                state.value.length,
                false
            );
        },
    },
});

export const selectRules = (state: RootState) => state.rules.value;

export const {
    setRules,
    toggleRule,
    turnOnRules,
    turnOffRules,
    invertRules,
    randomRules,
    resizeRules,
    setRulesByNumber,
} = rulesSlice.actions;

export default rulesSlice.reducer;
