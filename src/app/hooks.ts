//

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type StateHookObj = {
    get: any;
    set: (val: any) => void;
};

export function useStateObj(initValue: any): StateHookObj {
    //

    const [getState, setState] = useState(initValue);

    return { get: getState, set: setState };
}
