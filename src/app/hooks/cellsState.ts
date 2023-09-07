import { createArray2d, setArray2dItem } from "src/ts/Utils";
import { useStateObj } from "../hooks";

export type CellsStateHook = {
    get: boolean[][];
    set: (val: boolean[][]) => void;
    toggle: (row: number, col: number) => boolean;
    clear: () => void;
};

export default function useCellsState(
    rows: number,
    cols: number
): CellsStateHook {
    //
    const cellsState = useStateObj<boolean[][]>(
        createArray2d(rows, cols, false)
    );

    return {
        get: cellsState.get,
        set: cellsState.set,
        toggle: (row: number, col: number) => {
            const newVal = !cellsState.get[row][col];
            cellsState.set(setArray2dItem(row, col, cellsState.get, newVal));
            return newVal;
        },
        clear: () =>
            cellsState.set(
                createArray2d(
                    cellsState.get.length,
                    cellsState.get[0].length,
                    false
                )
            ),
    };
}
