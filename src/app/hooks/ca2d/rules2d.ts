//
import { createArray } from "src/ts/Utils";
import { useArray } from "../../hooks";

export type Rule2dState = boolean | null;

export type Rules2dHook = {
    get: Rule2dState[];
    set: (newRules: Rule2dState[]) => void;
    toggle: (i: number) => void;
    resize: (num: number) => void;
    allKeep: () => void;
    allDead: () => void;
    allAlive: () => void;
    random: () => void;
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
        resize: (num: number) => {
            const diff = num - rules.get.length;
            if (diff > 0) {
                rules.set(rules.get.concat(createArray(diff, false)));
            } else if (diff < 0) {
                rules.set(rules.get.slice(0, num));
            }
        },
        allKeep: () => rules.set(rules.get.map(() => null)),
        allAlive: () => rules.set(rules.get.map(() => true)),
        allDead: () => rules.set(rules.get.map(() => false)),
        random: () => rules.set(rules.get.map(() => randomRule())),
    };
}

function randomRule() {
    return Math.random() <= 0.33 ? true : Math.random() <= 0.33 ? false : null;
}
