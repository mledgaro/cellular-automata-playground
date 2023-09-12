import { Position } from "src/app/types";
import { countNotNullArray2d } from "./Utils";

//
export class CellularAutomaton2d {
    //
    private _nbhd: (Position | null)[][];
    private _rules: (boolean | null)[];
    public state: boolean[][];

    constructor() {
        //
        this._nbhd = [];
        this._rules = [];
        this.state = [];

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

    private cellState(row: number, col: number): boolean {
        let rows, cols;
        rows = this.state.length;
        cols = this.state[0].length;
        row = row < 0 ? rows + row : row >= rows ? row - rows : row;
        col = col < 0 ? cols + col : col >= cols ? col - cols : col;
        return this.state[row][col];
    }

    private cellNextState(row: number, col: number): boolean {
        //
        let numNbrs = 0;
        this._nbhd.forEach((nbhdRow) => {
            nbhdRow.forEach((nbr) => {
                numNbrs +=
                    nbr !== null
                        ? this.cellState(row + nbr.r, col + nbr.c)
                            ? 1
                            : 0
                        : 0;
            });
        });
        return this._rules[numNbrs] ?? this.state[row][col];
    }

    public nextState(): boolean[][] {
        //
        this.state = this.state.map((row, r) =>
            row.map((_, c) => this.cellNextState(r, c))
        );
        return this.state;
    }

    get nbhd() {
        return this._nbhd;
    }

    get rules() {
        return this._rules;
    }

    public setNbhd(newNbhd: boolean[][], mainCell: Position) {
        //
        let nbhd = CellularAutomaton2d.calcNbhd(newNbhd, mainCell);

        this._nbhd = nbhd;
        this._rules = Array(countNotNullArray2d(nbhd) + 1).fill(null);
    }

    set rules(newRules: (boolean | null)[]) {
        if (newRules.length >= this._rules.length) {
            this._rules = this._rules.map((_, i) => newRules[i]);
        } else {
            newRules.forEach((v, i) => (this._rules[i] = v));
        }
    }

    public static calcNbhd(newNbhd: boolean[][], mainCell: Position) {
        //
        let pr: number;
        let nbhd = newNbhd.map((row, ri) => {
            pr = ri - mainCell.r;
            return row.map((n) => (n ? { r: pr, c: 0 } : null));
        });
        nbhd[mainCell.r][mainCell.c] = null;

        for (let ci = 0, pc, ri; ci < nbhd[0].length; ci++) {
            pc = ci - mainCell.c;
            for (ri = 0; ri < nbhd.length; ri++) {
                if (nbhd[ri][ci] !== null) {
                    nbhd[ri][ci]!.c = pc;
                }
            }
        }
        return nbhd;
    }
}
