import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface NbhdWidthState {
    value: number;
}

export const defaultValue = 3;

const initialState: NbhdWidthState = {
    value: defaultValue,
};

export const nbhdWidthSlice = createSlice({
    name: "nbhdWidth",
    initialState,
    reducers: {
        setNbhdWidth: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const selectNbhdWidth = (state: RootState) => state.nbhdWidth.value;

export const { setNbhdWidth } = nbhdWidthSlice.actions;

export default nbhdWidthSlice.reducer;
