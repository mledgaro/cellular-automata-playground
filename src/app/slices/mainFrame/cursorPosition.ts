import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { Position } from "src/app/types";

interface CursorPositionState {
    value: Position;
}

export const defaultValue = { r: 0, c: 0 };

const initialState: CursorPositionState = {
    value: defaultValue,
};

export const cursorPositionSlice = createSlice({
    name: "cursorPosition",
    initialState,
    reducers: {
        setCursorPosition: (state, action: PayloadAction<Position>) => {
            state.value = action.payload;
        },
    },
});

export const selectCursorPosition = (state: RootState) =>
    state.cursorPosition.value;

export const { setCursorPosition } = cursorPositionSlice.actions;

export default cursorPositionSlice.reducer;
