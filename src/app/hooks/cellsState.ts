import { createArray2d, setArray2dItem } from "src/ts/Utils";
import { useStateObj } from "../hooks";

export type CellsStateHook = {
    get: boolean[][];
    cellsNumber: number;
    liveCells: number;
    liveCellsLastRow: number;
    set: (val: boolean[][]) => void;
    toggle: (row: number, col: number) => boolean;
    setRandom: () => void;
    clear: () => void;
    resize: (rows: number, cols: number) => void;
    density: number;
    setDensity: (val: number) => void;
};

export default function useCellsState(
    rows: number,
    cols: number
): CellsStateHook {
    //
    const cellsState = useStateObj<boolean[][]>(
        createArray2d(rows, cols, false)
    );
    const density = useStateObj<number>(0.1);

    return {
        get: cellsState.get,
        cellsNumber: cellsState.get.length * cellsState.get[0].length,
        liveCells: cellsState.get.reduce(
            (count, curr) =>
                count +
                curr.reduce((rCount, cell) => rCount + (cell ? 1 : 0), 0),
            0
        ),
        liveCellsLastRow: cellsState.get[cellsState.get.length - 1].reduce(
            (rCount, cell) => rCount + (cell ? 1 : 0),
            0
        ),
        set: cellsState.set,
        toggle: (row: number, col: number) => {
            const newVal = !cellsState.get[row][col];
            cellsState.set(setArray2dItem(row, col, cellsState.get, newVal));
            return newVal;
        },
        setRandom: () => {
            cellsState.set(
                cellsState.get.map((row) =>
                    row.map(() => Math.random() < density.get)
                )
            );
        },
        clear: () => cellsState.set(createArray2d(rows, cols, false)),
        resize: (rows: number, cols: number) => {
            cellsState.set(createArray2d(rows, cols, false));
        },
        density: density.get,
        setDensity: (val: number) => {
            density.set(val);
            cellsState.set(
                cellsState.get.map((row) => row.map(() => Math.random() < val))
            );
        },
    };
}
