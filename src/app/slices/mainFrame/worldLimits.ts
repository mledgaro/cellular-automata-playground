import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Limit } from "../../types";

interface WorldLimitsState {
    value: {
        horizontal: Limit;
        vertical: Limit;
    };
}

export const defaultVal = {
    horizontal: "continuous" as Limit,
    vertical: "continuous" as Limit,
};

const initialState: WorldLimitsState = {
    value: defaultVal,
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
export const selectWorldHorizontalLimit = (state: RootState) =>
    state.worldLimits.value.horizontal;
export const selectWorldVerticalLimit = (state: RootState) =>
    state.worldLimits.value.vertical;

export const { setWorldLimits } = worldLimitsSlice.actions;

export default worldLimitsSlice.reducer;
