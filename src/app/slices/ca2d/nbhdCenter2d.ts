import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { Position } from "src/app/types";

interface NbhdCenter2dState {
    value: Position;
}

const initialState: NbhdCenter2dState = {
    value: { r: 1, c: 1 },
};

export const nbhdCenter2dSlice = createSlice({
    name: "nbhdCenter2d",
    initialState,
    reducers: {
        setNbhdCenter2d: (state, action: PayloadAction<Position>) => {
            state.value = action.payload;
        },
    },
});

export const selectNbhdCenter2d = (state: RootState) =>
    state.nbhdCenter2d.value;

export const { setNbhdCenter2d } = nbhdCenter2dSlice.actions;

export default nbhdCenter2dSlice.reducer;
