//
import { useArrayState } from "../hooks";

export type Rule2dState = true | false | undefined;

export type Rules2dState = {
    get: Rule2dState[];
    toggle: (i: number) => void;
    resize: (num: number) => void;
};

// classic game of life rules
const defaultVal = [
    false,
    false,
    undefined,
    true,
    false,
    false,
    false,
    false,
    false,
];

export function useRules2dState(): Rules2dState {
    //
    let rules = useArrayState<Rule2dState>(defaultVal);

    return {
        get: rules.get,
        toggle: (i: number) =>
            rules.setAt(
                rules.get[i] === undefined
                    ? true
                    : rules.get[i]
                    ? false
                    : undefined,
                i
            ),
        resize: (num: number) => rules.set(Array(num + 1).fill(undefined)),
    };
}
