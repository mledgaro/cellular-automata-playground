//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DistributionType = "even" | "rand";

interface DistributionTypeState {
    value: DistributionType;
}

export const initialState: DistributionTypeState = {
    value: "even",
};

export const distributionTypeSlice = createSlice({
    name: "distrubutionType",
    initialState,
    reducers: {
        setDistributionType: (
            state,
            action: PayloadAction<DistributionType>
        ) => {
            state.value = action.payload;
        },
    },
});

export const { setDistributionType } = distributionTypeSlice.actions;

export default distributionTypeSlice.reducer;
