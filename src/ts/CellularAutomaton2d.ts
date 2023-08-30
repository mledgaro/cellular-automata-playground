import { Position } from "src/app/types";

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
        let nbhdSize = 0;
        let pr: number;
        this._nbhd = newNbhd.map((row, ri) => {
            pr = ri - mainCell.r;
            return row.map((n) => (n ? { r: pr, c: 0 } : null));
        });
        this._nbhd[mainCell.r][mainCell.c] = null;

        for (
            let ci = 0, pc = ci - mainCell.c, ri;
            ci < this._nbhd[0].length;
            ci++
        ) {
            for (ri = 0; ri < this._nbhd.length; ri++) {
                if (this._nbhd[ri][ci] !== null) {
                    nbhdSize++;
                    this._nbhd[ri][ci]!.c = pc;
                }
            }
        }

        this._rules = Array(nbhdSize + 1).fill(null);
    }

    set rules(newRules: (boolean | null)[]) {
        if (newRules.length >= this._rules.length) {
            this._rules = this._rules.map((_, i) => newRules[i]);
        } else {
            newRules.forEach((v, i) => (this._rules[i] = v));
        }
    }
}
