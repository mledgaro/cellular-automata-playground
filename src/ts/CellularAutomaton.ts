//

import { boolArrayToInt, randomBoolArray } from "./Utils";

export default class CellularAutomaton {
    //

    #MAX_CELLS = 512;

    #cellsNumber: number = 256; // Integer
    #nbhdWidth: number = 3; // Integer
    #cellsNbhd: number[][] = CellularAutomaton.cellsNbhds(
        "adjacent",
        this.#cellsNumber,
        this.#nbhdWidth,
        1
    ); // Array(Array(Integer))[cellsNumber][nbhdWidth]
    #numRules: number = Math.pow(2, this.#nbhdWidth); // Int = 2^nbhdWidth
    #rules: boolean[] = randomBoolArray(this.#numRules); // Array(Bool)[numRules]
    #state: boolean[] = randomBoolArray(this.#cellsNumber); // Array(Bool)[cellsNumber]

    // constructor() {
    //     //
    // }

    get cellsNumber(): number {
        return this.#cellsNumber;
    }

    set cellsNumber(number: number) {
        this.#cellsNumber = Math.min(Math.max(number, 0), this.#MAX_CELLS);
    }

    get nbhdWidth(): number {
        return this.#nbhdWidth;
    }

    set nbhdWidth(width: number) {
        this.#nbhdWidth = width;
        this.#numRules = Math.pow(2, width);
    }

    cellNbhd(index: number): number[] {
        return this.#cellsNbhd[index];
    }

    setNbhds(type: NbhdType, mainCell: number) {}

    get numRules(): number {
        return this.#numRules;
    }

    ruleState(rule: number) {}

    setRule(rule: number, state: boolean) {}

    get state(): boolean[] {
        return this.#state;
    }

    set state(state: boolean[]) {}

    #cellNextState(index: number): boolean {
        //

        let nstate;

        nstate = this.#cellsNbhd[index];
        nstate = nstate.map((e) => this.state[e]);
        nstate = boolArrayToInt(nstate, false);
        nstate = this.#rules[nstate];

        return nstate;
    }

    nextState(): boolean[] {
        //

        let nstate = this.state.map((cell, i, state_) =>
            this.#cellNextState(i)
        );

        this.state = nstate;

        return nstate;
    }

    // static functions

    static adjacentNbhd(
        index: number,
        width: number,
        main: number,
        numCells: number
    ): number[] {
        //

        let nbhd = [];
        let a = index - main;
        let b = a + width;

        for (let i = a; i < b; i++) {
            nbhd.push(i);
        }

        if (a < 0) {
            nbhd = nbhd.map((e) => (e < 0 ? numCells + e : e));
        }

        if (b >= numCells) {
            nbhd = nbhd.map((e) => e % numCells);
        }

        return nbhd;
    }

    static groupedNbhd(
        index: number,
        width: number,
        main: number,
        numCells: number
    ): number[] {
        //

        let nbhd = [];
        let a = Math.round(Math.random() + numCells);
        let b = a + width;

        for (let i = a; i < b; i++) {
            nbhd.push(i);
        }

        if (a < 0) {
            nbhd = nbhd.map((e) => (e < 0 ? numCells + e : e));
        }

        if (b >= numCells) {
            nbhd = nbhd.map((e) => e % numCells);
        }

        if (main >= 0) {
            nbhd.splice(main, 1, index);
        }

        return nbhd;
    }

    static scatteredNbhd(
        index: number,
        width: number,
        main: number,
        numCells: number
    ): number[] {
        //

        let nbhd = [];

        for (let i = 0; i < width; i++) {
            nbhd.push(Math.round(Math.random() + numCells));
        }

        if (main >= 0) {
            nbhd.splice(main, 1, index);
        }

        return nbhd;
    }

    static cellsNbhds(
        type: NbhdType,
        numCells: number,
        nbhdWidth: number,
        mainCell: number
    ): number[][] {
        //

        let nbhds = [];

        switch (type) {
            case "adjacent":
                for (let i = 0; i < numCells; i++) {
                    nbhds.push(
                        CellularAutomaton.adjacentNbhd(
                            i,
                            nbhdWidth,
                            mainCell,
                            numCells
                        )
                    );
                }
                break;
            case "grouped":
                for (let i = 0; i < numCells; i++) {
                    nbhds.push(
                        CellularAutomaton.groupedNbhd(
                            i,
                            nbhdWidth,
                            mainCell,
                            numCells
                        )
                    );
                }
                break;
            case "scattered":
                for (let i = 0; i < numCells; i++) {
                    nbhds.push(
                        CellularAutomaton.scatteredNbhd(
                            i,
                            nbhdWidth,
                            mainCell,
                            numCells
                        )
                    );
                }
                break;
        }

        return nbhds;
    }
}

export type NbhdType = "adjacent" | "grouped" | "scattered";
