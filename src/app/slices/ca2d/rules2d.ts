import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { resizeArray, setArrayItem } from "src/ts/Utils";

interface Rules2dState {
    value: (boolean | null)[];
}

const initialState: Rules2dState = {
    value: [],
};

export const rules2dSlice = createSlice({
    name: "rules2d",
    initialState,
    reducers: {
        setRules2d: (state, action: PayloadAction<(boolean | null)[]>) => {
            state.value = action.payload;
        },
        toggleRule2d: (state, action: PayloadAction<number>) => {
            const idx = action.payload;
            state.value = setArrayItem(
                state.value,
                idx,
                state.value[idx] === null
                    ? true
                    : state.value[idx]
                    ? false
                    : null
            );
        },
        setRules2dKeepAll: (state) => {
            state.value = state.value.map(() => null);
        },
        setRules2dTurnOnAll: (state) => {
            state.value = state.value.map(() => true);
        },
        setRules2dTurnOffAll: (state) => {
            state.value = state.value.map(() => false);
        },
        setRules2dRandom: (state) => {
            state.value = state.value.map(() => randomRule());
        },
        resizeRules2d: (state, action: PayloadAction<number>) => {
            state.value = resizeArray(state.value, action.payload, false);
        },
    },
});

export const selectRules2d = (state: RootState) => state.rules2d.value;

export const {
    setRules2d,
    toggleRule2d,
    setRules2dKeepAll,
    setRules2dTurnOnAll,
    setRules2dTurnOffAll,
    setRules2dRandom,
    resizeRules2d,
} = rules2dSlice.actions;

export default rules2dSlice.reducer;

function randomRule() {
    return Math.random() <= 0.33 ? true : Math.random() <= 0.33 ? false : null;
}
