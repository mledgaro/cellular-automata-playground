//
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState } from "react";
import { setArrayItem } from "src/ts/Utils";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type StateObjHook<T> = {
    get: T;
    set: (val: T) => void;
};

export function useStateObj<T>(initValue: T): StateObjHook<T> {
    const [getState, setState] = useState(initValue);
    return { get: getState, set: setState };
}

export type BoolHook = {
    get: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
};

export function useBool(initValue: boolean): BoolHook {
    //
    let value = useStateObj<boolean>(initValue);

    return {
        get: value.get,
        toggle: () => value.set(!value.get),
        setTrue: () => value.set(true),
        setFalse: () => value.set(false),
    };
}

export type ArrayHook<T> = {
    get: T[];
    set: (arr: T[]) => void;
    setAt: (val: T, i: number) => void;
};

export function useArray<T>(initValue: T[]): ArrayHook<T> {
    //
    const array = useStateObj<Array<T>>(initValue);

    return {
        get: array.get,
        set: array.set,
        setAt: (val: T, i: number) =>
            array.set(setArrayItem(array.get, i, val)),
    };
}

export type BoolArrHook = {
    get: boolean[];
    set: (arr: boolean[]) => void;
    toggle: (i: number) => void;
    on: (i: number) => void;
    off: (i: number) => void;
};

export function useBoolArr(initValue: boolean[]): BoolArrHook {
    //
    const arr = useArray<boolean>(initValue);

    return {
        get: arr.get,
        set: arr.set,
        toggle: (i) => arr.setAt(!arr.get[i], i),
        on: (i) => arr.setAt(true, i),
        off: (i) => arr.setAt(false, i),
    };
}
