import { boolArrayToInt } from "./Utils";

export default class CellularAutomaton1d {
    //
    private _iterations: number;
    private _state: boolean[];

    constructor() {
        this._iterations = 0;
        this._state = Array(false);
    }

    public nextState(cellsNbhds: number[][], rules: boolean[]): boolean[] {
        //
        this._state = this._state.map(
            (_, i, row) =>
                rules[
                    boolArrayToInt(
                        cellsNbhds[i].map((e) => row[e]),
                        false
                    )
                ]
        );

        this._iterations++;

        return this._state;
    }

    set initState(state: boolean[]) {
        //
        this._iterations = 0;
        this._state = state;
    }

    get iterations() {
        return this._iterations;
    }

    get state() {
        return this._state;
    }
}
