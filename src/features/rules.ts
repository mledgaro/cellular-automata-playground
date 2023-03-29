//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RulesState {
    value: boolean[];
}

const initialState: RulesState = {
    value: [],
};

export const rulesSlice = createSlice({
    name: "rules",
    initialState,
    reducers: {
        resize: (state, action: PayloadAction<number>) => {
            state.value = Array(action.payload).fill(false);
        },
        allAlive: (state) => {
            state.value = Array(state.value.length).fill(true);
        },
        allDead: (state) => {
            state.value = Array(state.value.length).fill(false);
        },
        random: (state) => {
            state.value = state.value.map(() => Math.random() <= 0.5);
        },
        inverse: (state) => {
            state.value = state.value.map((e) => !e);
        },
        toggle: (state, action: PayloadAction<number>) => {
            state.value = state.value.map((e, i) =>
                i === action.payload ? !e : e
            );
        },
    },
});

const { resize, allAlive, allDead, random, inverse, toggle } =
    rulesSlice.actions;

export const resizeRules = resize;
export const allAliveRules = allAlive;
export const allDeadRules = allDead;
export const randomRules = random;
export const inverseRules = inverse;
export const toggleRule = toggle;

export default rulesSlice.reducer;
