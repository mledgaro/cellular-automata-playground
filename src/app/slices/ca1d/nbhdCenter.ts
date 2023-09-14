import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface NbhdCenterState {
    value: number;
}

export const defaultValue = 1;

const initialState: NbhdCenterState = {
    value: defaultValue,
};

export const nbhdCenterSlice = createSlice({
    name: "nbhdCenter",
    initialState,
    reducers: {
        setNbhdCenter: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const selectNbhdCenter = (state: RootState) => state.nbhdCenter.value;

export const { setNbhdCenter } = nbhdCenterSlice.actions;

export default nbhdCenterSlice.reducer;
