import { Position, Size } from "src/app/types";

export class CellularAutomaton2d {
    //
    private _nbhd: (Position | null)[][];
    public rules: (boolean | null)[];
    public getCell: (row: number, col: number) => boolean;
    public size: Size;

    constructor(size: Size) {
        //
        this._nbhd = [];

        this.getCell = () => false;
        this.size = size;

        this.setNbhd(
            [
                [true, true, true],
                [true, false, true],
                [true, true, true],
            ],
            { r: 1, c: 1 }
        );
        this.rules = [
            false,
            false,
            null,
            true,
            false,
            false,
            false,
            false,
            false,
        ];
    }

    private cellNextState(row: number, col: number): boolean {
        //
        let numNbrs = 0;
        this._nbhd.forEach((nbhdRow) => {
            nbhdRow.forEach((nbr) => {
                numNbrs +=
                    nbr !== null
                        ? this.getCell(row + nbr.r, col + nbr.c)
                            ? 1
                            : 0
                        : 0;
            });
        });
        return this.rules[numNbrs] ?? this.getCell(row, col);
    }

    public nextState(): boolean[][] {
        //
        const nstate = [];
        let row;
        for (let r = 0, c; r < this.size.rows; r++) {
            row = [];
            for (c = 0; c < this.size.cols; c++) {
                row.push(this.cellNextState(r, c));
            }
            nstate.push(row);
        }
        return nstate;
    }

    public setNbhd(nbhd: boolean[][], center: Position) {
        //
        let pr: number;
        let cnbhd = nbhd.map((row, ri) => {
            pr = ri - center.r;
            return row.map((n) => (n ? { r: pr, c: 0 } : null));
        });
        cnbhd[center.r][center.c] = null;

        for (let ci = 0, pc, ri; ci < cnbhd[0].length; ci++) {
            pc = ci - center.c;
            for (ri = 0; ri < cnbhd.length; ri++) {
                if (cnbhd[ri][ci] !== null) {
                    cnbhd[ri][ci]!.c = pc;
                }
            }
        }
        this._nbhd = cnbhd;
    }
}
