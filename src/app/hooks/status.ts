import { useRef } from "react";
import { useStateObj } from "../hooks";

export type StatusType = "stopped" | "paused" | "running";

export type StatusHook = {
    get: StatusType;
    prev: { stopped: boolean; paused: boolean; running: boolean };
    stop: () => void;
    pause: () => void;
    run: () => void;
    stopped: boolean;
    paused: boolean;
    running: boolean;
};

export function useStatus(): StatusHook {
    //
    const state = useStateObj<StatusType>("stopped");
    const prev = useRef<StatusType | null>(null);

    return {
        get: state.get,
        prev: {
            stopped: prev.current === "stopped",
            paused: prev.current === "paused",
            running: prev.current === "running",
        },
        stop: () => {
            prev.current = state.get;
            state.set("stopped");
        },
        pause: () => {
            prev.current = state.get;
            state.set("paused");
        },
        run: () => {
            prev.current = state.get;
            state.set("running");
        },
        stopped: state.get === "stopped",
        paused: state.get === "paused",
        running: state.get === "running",
    };
}
