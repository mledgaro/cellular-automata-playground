//
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState } from "react";
import {
    createArray,
    createArray2d,
    setArray2dItem,
    setArrayItem,
} from "src/ts/Utils";

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

export type Array2dHook<T> = {
    get: T[][];
    set: (arr: T[][]) => void;
    setAt: (val: T, row: number, col: number) => void;
};

export function useArray2d<T>(
    rows: number,
    cols: number,
    fill: T
): Array2dHook<T> {
    //
    const array = useStateObj<T[][]>(createArray2d(rows, cols, fill));

    return {
        get: array.get,
        set: array.set,
        setAt: (val: T, row: number, col: number) =>
            array.set(setArray2dItem(row, col, array.get, val)),
    };
}

export type BoolArrHook = {
    get: boolean[];
    set: (arr: boolean[]) => void;
    setAt: (val: boolean, i: number) => void;
    toggle: (i: number) => void;
    on: (i: number) => void;
    off: (i: number) => void;
    clear: () => void;
    resize: (size: number) => void;
    random: (trueDensity: number) => void;
};

export function useBoolArr(size: number): BoolArrHook {
    //
    const arr = useArray<boolean>(createArray(size, false));

    return {
        get: arr.get,
        set: arr.set,
        setAt: arr.setAt,
        toggle: (i: number) => arr.setAt(!arr.get[i], i),
        on: (i) => arr.setAt(true, i),
        off: (i) => arr.setAt(false, i),
        clear: () => arr.set(createArray(arr.get.length, false)),
        resize: (size: number) => arr.set(createArray(size, false)),
        random: (trueDensity: number) =>
            arr.set(arr.get.map(() => Math.random() < trueDensity)),
    };
}

export type BoolArray2dHook = {
    get: boolean[][];
    set: (arr: boolean[][]) => void;
    setAt: (val: boolean, row: number, col: number) => void;
    on: (row: number, col: number) => void;
    off: (row: number, col: number) => void;
    toggle: (row: number, col: number) => void;
    clear: () => void;
    resize: (rows: number, cols: number) => void;
    random: (trueDensity: number) => void;
};

export function useBoolArray2d(rows: number, cols: number): BoolArray2dHook {
    //
    const array = useStateObj<boolean[][]>(createArray2d(rows, cols, false));

    return {
        get: array.get,
        set: array.set,
        setAt: (val: boolean, row: number, col: number) =>
            array.set(setArray2dItem(row, col, array.get, val)),
        on: (row: number, col: number) =>
            array.set(setArray2dItem(row, col, array.get, true)),
        off: (row: number, col: number) =>
            array.set(setArray2dItem(row, col, array.get, false)),
        toggle: (row: number, col: number) =>
            array.set(
                setArray2dItem(row, col, array.get, !array.get[row][col])
            ),
        clear: () =>
            array.set(
                createArray2d(array.get.length, array.get[0].length, false)
            ),
        resize: (rows: number, cols: number) =>
            array.set(createArray2d(rows, cols, false)),
        random: (trueDensity: number) =>
            array.set(
                array.get.map((row) =>
                    row.map(() => Math.random() < trueDensity)
                )
            ),
    };
}
