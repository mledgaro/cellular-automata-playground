import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface _State {
    value: number;
}

export const defaultValue = 0;

const initialState: _State = {
    value: defaultValue,
};

export const _Slice = createSlice({
    name: "template",
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

// export const selectValue = (state: RootState) => state.template.value;

export const { setValue } = _Slice.actions;

export default _Slice.reducer;
