import { setMatrixItem } from "src/ts/Utils";
import { StateHookObj, useStateObj } from "../hooks";

export type InitState2dState = {
    get: boolean[][];
    set: (val: boolean[][]) => void;
    setRandom: () => void;
    toggle: (row: number, col: number) => void;
    resize: (rows: number, cols: number) => void;
    cellsNumber: number;
    liveCells: StateHookObj<number>;
};

export default function useInitState2dState(
    rows: number,
    cols: number
): InitState2dState {
    //
    const initState = useStateObj<boolean[][]>(
        Array(rows).fill(Array(cols).fill(false))
    );
    const liveCells = useStateObj<number>(1);

    return {
        get: initState.get,
        set: initState.set,
        setRandom: () => {
            let nState = Array(rows).fill(Array(cols).fill(false));
            for (let i = 0, r, c; i < liveCells.get; i++) {
                r = Math.floor(Math.random() * rows);
                c = Math.floor(Math.random() * cols);
                nState[r][c] = true;
            }
            initState.set(nState);
        },
        toggle: (row: number, col: number) =>
            initState.set(
                setMatrixItem(row, col, initState.get, !initState.get[row][col])
            ),
        resize: (rows: number, cols: number) => {
            initState.set(Array(rows).fill(Array(cols).fill(false)));
        },
        cellsNumber: initState.get.length * initState.get[0].length,
        liveCells: liveCells,
    };
}
