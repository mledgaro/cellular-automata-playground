import { createArray2d, setMatrixItem } from "src/ts/Utils";
import { useStateObj } from "../hooks";

export type InitState2dHook = {
    get: boolean[][];
    set: (val: boolean[][]) => void;
    setRandom: () => void;
    toggle: (row: number, col: number) => boolean;
    resize: (rows: number, cols: number) => void;
    cellsNumber: number;
    density: number;
    setDensity: (val: number) => void;
    clear: () => void;
};

export default function useInitState2d(
    rows: number,
    cols: number
): InitState2dHook {
    //
    const initState = useStateObj<boolean[][]>(
        createArray2d(rows, cols, false)
    );
    const density = useStateObj<number>(0.5);

    return {
        get: initState.get,
        set: initState.set,
        setRandom: () => {
            initState.set(
                initState.get.map((row) =>
                    row.map(() => Math.random() < density.get)
                )
            );
        },
        toggle: (row: number, col: number) => {
            const newVal = !initState.get[row][col];
            initState.set(setMatrixItem(row, col, initState.get, newVal));
            return newVal;
        },
        resize: (rows: number, cols: number) => {
            initState.set(createArray2d(rows, cols, false));
        },
        cellsNumber: initState.get.length * initState.get[0].length,
        density: density.get,
        setDensity: (val: number) => {
            density.set(val);
            initState.set(
                initState.get.map((row) => row.map(() => Math.random() < val))
            );
        },
        clear: () => initState.set(createArray2d(rows, cols, false)),
    };
}
