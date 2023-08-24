import { useStateObj } from "../hooks";

export type StatusType = "stopped" | "paused" | "running";

export type StatusHook = {
    get: StatusType;
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

    return {
        get: state.get,
        stop: () => state.set("stopped"),
        pause: () => state.set("paused"),
        run: () => state.set("running"),
        stopped: state.get === "stopped",
        paused: state.get === "paused",
        running: state.get === "running",
    };
}
