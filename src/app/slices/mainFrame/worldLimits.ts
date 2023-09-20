import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Limit } from "../../types";

interface WorldLimitsState {
    value: {
        horizontal: Limit;
        vertical: Limit;
    };
}

const initialState: WorldLimitsState = {
    value: {
        horizontal: "continuous" as Limit,
        vertical: "continuous" as Limit,
    },
};

export const worldLimitsSlice = createSlice({
    name: "worldLimits",
    initialState,
    reducers: {
        setWorldLimits: (
            state,
            action: PayloadAction<{
                horizontal: Limit;
                vertical: Limit;
            }>
        ) => {
            state.value = action.payload;
        },
    },
});

export const selectWorldLimits = (state: RootState) => state.worldLimits.value;

export const selectWorldLimitsGetCell = (state: RootState) => {
    const normV =
        state.worldLimits.value.vertical === "continuous"
            ? normContinuous
            : normBounded;
    const normH =
        state.worldLimits.value.horizontal === "continuous"
            ? normContinuous
            : normBounded;
    return (r: number, c: number) => {
        const normVIdx = normV(r, state.worldSize.value.rows);
        const normHIdx = normH(c, state.worldSize.value.cols);
        return normVIdx < 0 || normHIdx < 0
            ? false
            : state.cells.value[normVIdx][normHIdx];
    };
};

export const { setWorldLimits } = worldLimitsSlice.actions;

export default worldLimitsSlice.reducer;

function normContinuous(idx: number, max: number): number {
    if (idx < 0) {
        return max + idx;
    } else if (idx >= max) {
        return idx - max;
    } else {
        return idx;
    }
}

function normBounded(idx: number, max: number): number {
    if (idx < 0 || idx >= max) {
        return -1;
    } else {
        return idx;
    }
}
