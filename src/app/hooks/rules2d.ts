//
import { useArray } from "../hooks";

export type Rule2dState = boolean | null;

export type Rules2dHook = {
    get: Rule2dState[];
    set: (newRules: Rule2dState[]) => void;
    toggle: (i: number) => void;
    resize: (num: number) => void;
    allKeep: () => void;
    allDead: () => void;
    allAlive: () => void;
};

export function useRules2d(): Rules2dHook {
    //
    let rules = useArray<Rule2dState>([]);

    return {
        get: rules.get,
        set: rules.set,
        toggle: (i: number) =>
            rules.setAt(
                rules.get[i] === null ? true : rules.get[i] ? false : null,
                i
            ),
        resize: (num: number) => rules.set(Array(num + 1).fill(null)),
        allKeep: () => rules.set(rules.get.map(() => null)),
        allAlive: () => rules.set(rules.get.map(() => true)),
        allDead: () => rules.set(rules.get.map(() => false)),
    };
}
