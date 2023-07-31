//

import { useCallback, useReducer, useRef, useState } from "react";

export type StateObjHook = {
    get: any;
    set: (val: any) => void;
};

export function useStateObj(initValue: any): StateObjHook {
    //

    const [getState, setState] = useState(initValue);

    return { get: getState, set: setState };
}

export type RangeReducerHook = {
    get: number;
    prev: () => void;
    next: () => void;
    set: (val: number) => void;
};

export function useRangeReducer(
    min: number,
    max: number,
    init: number,
    cycle: boolean
): RangeReducerHook {
    //

    const reducer = useCallback(
        (
            state: number,
            action: { type: "next" | "prev" | "set"; index?: number }
        ) => {
            switch (action.type) {
                case "next":
                    return state === max ? (cycle ? min : state) : state + 1;
                case "prev":
                    return state === min ? (cycle ? max : state) : state - 1;
                case "set":
                    return Math.max(min, Math.min(action.index ?? 0, max));
            }
        },
        [min, max, cycle]
    );

    const [value, dispatch] = useReducer(
        reducer,
        Math.max(min, Math.min(init, max))
    );

    return {
        get: value,
        prev: () => dispatch({ type: "prev" }),
        next: () => dispatch({ type: "next" }),
        set: (i) => dispatch({ type: "set", index: i }),
    };
}

export type EnumReducerType = {
    get: any;
    index: number;
    length: number;
    prev: () => void;
    next: () => void;
    set: (index: number) => void;
};

export function useEnumReducer(
    enumValues: any[],
    initIndex: number
): EnumReducerType {
    //

    const enums = useRef(enumValues);

    const index = useRangeReducer(
        0,
        enums.current.length - 1,
        initIndex,
        false
    );

    return {
        get: enums.current[index.get],
        index: index.get,
        length: enums.current.length,
        prev: index.prev,
        next: index.next,
        set: index.set,
    };
}

export type BoolState = {
    get: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
};

export function useBoolState(initValue: boolean): BoolState {
    //

    let value = useStateObj(initValue);

    return {
        get: value.get,
        toggle: () => value.set(!value.get),
        setTrue: () => value.set(true),
        setFalse: () => value.set(false),
    };
}

export type ArrayStateHook<T> = {
    get: T[];
    set: (arr: T[]) => void;
    setAt: (val: T, i: number) => void;
};

export function useArrayState<T>(initValue: T[]): ArrayStateHook<T> {
    //

    const array = useStateObj(initValue);

    return {
        get: array.get,
        set: array.set,
        setAt: (val: any, i: number) =>
            array.set(
                array.get.map((e: any, j: number) => (j === i ? val : e))
            ),
    };
}

export type BoolArrHook = {
    get: boolean[];
    set: (arr: boolean[]) => void;
    toggle: (i: number) => void;
    on: (i: number) => void;
    off: (i: number) => void;
};

export function useBoolArrState(initValue: boolean[]): BoolArrHook {
    //

    const arr = useArrayState(initValue);

    return {
        get: arr.get,
        set: arr.set,
        toggle: (i) => arr.setAt(!arr.get[i], i),
        on: (i) => arr.setAt(true, i),
        off: (i) => arr.setAt(false, i),
    };
}
