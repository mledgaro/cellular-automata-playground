//

import { useMemo, useReducer, useRef, useState } from "react";

export function useStateObj(initValue) {

    const [getState, setState] = useState(initValue);

    return { get: getState, set: setState };
}

export function useEnumReducer(defaultValueIndex, enumValues) {

    const enums = useRef(enumValues);
    
    const [index, next] = useReducer((state, action) => {
        return state === enums.current.length - 1 ? 0 : state + 1;
    }, defaultValueIndex);

    return { value: enums.current[index], index: index, next: next };
}

