import { addColumn, addRow, setMatrixItem } from "src/ts/Utils";
import { useStateObj } from "../hooks";
import { NbhdType2D, Position } from "../types";

export type Nbhd2dHook = {
    nbhd: boolean[][];
    mainCell: Position;
    type: NbhdType2D;
    setNbhd: (val: boolean[][]) => void;
    setType: (type: NbhdType2D) => void;
    setMainCell: (r: number, c: number) => void;
    toggle: (pos: Position) => void;
    addRow: (remove: boolean) => void;
    addColumn: (remove: boolean) => void;
    size: number;
};

const mooreNbhd = [
    [true, true, true],
    [true, false, true],
    [true, true, true],
];

const vonNeumannNbhd = [
    [false, true, false],
    [true, false, true],
    [false, true, false],
];

const customNbhd = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
];

export default function useNbhd2d(): Nbhd2dHook {
    //
    const nbhd = useStateObj<boolean[][]>(mooreNbhd);
    const mainCell = useStateObj<Position>({ r: 1, c: 1 });
    const type = useStateObj<NbhdType2D>("moore");

    let size = 0;
    nbhd.get.forEach((row, r) =>
        row.forEach((cell, c) => (size += cell ? 1 : 0))
    );

    return {
        nbhd: nbhd.get,
        mainCell: mainCell.get,
        type: type.get,
        size: size,
        setNbhd: (value: boolean[][]) => {
            nbhd.set(value);
            mainCell.set({ r: 1, c: 1 });
        },
        setMainCell: (r: number, c: number) => {
            mainCell.set({ r: r, c: c });
            nbhd.set(setMatrixItem(r, c, nbhd.get, false));
        },
        setType: (newType: NbhdType2D) => {
            type.set(newType);
            switch (newType) {
                case "moore":
                    nbhd.set(mooreNbhd);
                    break;
                case "vonneumann":
                    nbhd.set(vonNeumannNbhd);
                    break;
                case "custom":
                    nbhd.set(customNbhd);
                    break;
            }
            mainCell.set({ r: 1, c: 1 });
        },
        toggle: (pos: Position) =>
            nbhd.set(
                setMatrixItem(pos.r, pos.c, nbhd.get, !nbhd.get[pos.r][pos.c])
            ),
        addRow: (remove: boolean) => {
            nbhd.set(addRow(nbhd.get, remove));
        },
        addColumn: (remove: boolean) => {
            nbhd.set(addColumn(nbhd.get, remove));
        },
    };
}
