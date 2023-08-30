//
import { useArray } from "../hooks";

export type Rule2dState = boolean | null;

export type Rules2dHook = {
    get: Rule2dState[];
    toggle: (i: number) => void;
    resize: (num: number) => void;
};

// classic game of life rules
const defaultVal = [
    false,
    false,
    null,
    true,
    false,
    false,
    false,
    false,
    false,
];

export function useRules2d(): Rules2dHook {
    //
    let rules = useArray<Rule2dState>(defaultVal);

    return {
        get: rules.get,
        toggle: (i: number) =>
            rules.setAt(
                rules.get[i] === null ? true : rules.get[i] ? false : null,
                i
            ),
        resize: (num: number) => rules.set(Array(num + 1).fill(null)),
    };
}
