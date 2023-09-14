import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

interface TemplateState {
    value: number;
}

export const defaultValue = 0;

const initialState: TemplateState = {
    value: defaultValue,
};

export const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

// export const selectValue = (state: RootState) => state.template.value;

export const { setValue } = templateSlice.actions;

export default templateSlice.reducer;
