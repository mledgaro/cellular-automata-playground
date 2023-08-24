//
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState } from "react";
import { setArrayItem } from "src/ts/Utils";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type StateHookObj<T> = {
    get: T;
    set: (val: T) => void;
};

export function useStateObj<T>(initValue: T): StateHookObj<T> {
    const [getState, setState] = useState(initValue);
    return { get: getState, set: setState };
}

export type BoolState = {
    get: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
};

export function useBoolState(initValue: boolean): BoolState {
    //
    let value = useStateObj<boolean>(initValue);

    return {
        get: value.get,
        toggle: () => value.set(!value.get),
        setTrue: () => value.set(true),
        setFalse: () => value.set(false),
    };
}

export type ArrayState<T> = {
    get: T[];
    set: (arr: T[]) => void;
    setAt: (val: T, i: number) => void;
};

export function useArrayState<T>(initValue: T[]): ArrayState<T> {
    //
    const array = useStateObj<Array<T>>(initValue);

    return {
        get: array.get,
        set: array.set,
        setAt: (val: T, i: number) =>
            array.set(setArrayItem(array.get, i, val)),
    };
}

export type BoolArrState = {
    get: boolean[];
    set: (arr: boolean[]) => void;
    toggle: (i: number) => void;
    on: (i: number) => void;
    off: (i: number) => void;
};

export function useBoolArrState(initValue: boolean[]): BoolArrState {
    //
    const arr = useArrayState<boolean>(initValue);

    return {
        get: arr.get,
        set: arr.set,
        toggle: (i) => arr.setAt(!arr.get[i], i),
        on: (i) => arr.setAt(true, i),
        off: (i) => arr.setAt(false, i),
    };
}
