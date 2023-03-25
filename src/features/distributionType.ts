//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export type DistributionType = "even" | "rand";

interface DistributionTypeState {
    value: DistributionType;
}

const initialState: DistributionTypeState = {
    value: "even",
};

export const distributionTypeSlice = createSlice({
    name: "distrubutionType",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<DistributionType>) => {
            state.value = action.payload;
        },
    },
});

export const selectDistributionType = (state: RootState) =>
    state.distributionType.value;

const { set } = distributionTypeSlice.actions;

export const setDistributionType = set;

export default distributionTypeSlice.reducer;
