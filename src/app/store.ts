//

import { configureStore } from "@reduxjs/toolkit";
import nbhdWidthReducer from "src/features/nbhdWidth";

export const store = configureStore({
    reducer: { nbhdWidth: nbhdWidthReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
