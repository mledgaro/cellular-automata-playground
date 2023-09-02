import { setMatrixItem } from "src/ts/Utils";
import { StateObjHook, useStateObj } from "../hooks";

export type InitState2dHook = {
    get: boolean[][];
    set: (val: boolean[][]) => void;
    setRandom: () => void;
    toggle: (row: number, col: number) => void;
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
        Array(rows)
            .fill(null)
            .map(() =>
                Array(cols)
                    .fill(null)
                    .map(() => false)
            )
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
        toggle: (row: number, col: number) =>
            initState.set(
                setMatrixItem(row, col, initState.get, !initState.get[row][col])
            ),
        resize: (rows: number, cols: number) => {
            initState.set(Array(rows).fill(Array(cols).fill(false)));
        },
        cellsNumber: initState.get.length * initState.get[0].length,
        density: density.get,
        setDensity: (val: number) => {
            density.set(val);
            initState.set(
                initState.get.map((row) => row.map(() => Math.random() < val))
            );
        },
        clear: () =>
            initState.set(
                Array(rows)
                    .fill(null)
                    .map(() =>
                        Array(cols)
                            .fill(null)
                            .map(() => false)
                    )
            ),
    };
}
