//

import { useCallback, useMemo, useReducer, useRef, useState } from "react";

export function useStateObj(initValue) {
    const [getState, setState] = useState(initValue);

    return { get: getState, set: setState };
}

export function useRangeReducer(min, max, init, cycle) {
    //

    const reducer = useCallback(
        (state, action) => {
            switch (action.type) {
                case "next":
                    return state === max ? (cycle ? min : state) : state + 1;
                case "prev":
                    return state === min ? (cycle ? max : state) : state - 1;
                case "set":
                    return Math.max(min, Math.min(action.index, max));
                default:
                    return state;
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

export function useEnumReducer(enumValues, initIndex) {
    //

    const enums = useRef(enumValues);

    const index = useRangeReducer(0, enums.current.length - 1, initIndex, true);
    
    return {
        get: enums.current[index],
        index: index.get,
        prev: index.prev,
        next: index.next,
        set: index.set,
    };
}
