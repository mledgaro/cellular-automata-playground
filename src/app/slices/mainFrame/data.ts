import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { DataFileObj } from "src/app/types";

interface DataState {
    value: DataFileObj;
}

const initialState: DataState = {
    value: null,
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<DataFileObj>) => {
            state.value = action.payload;
        },
    },
});

export const selectData = (state: RootState) => state.data.value;

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
