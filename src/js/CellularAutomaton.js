//

export default class CellularAutomaton {
    //

    #MAX_CELLS = 512;

    #cellsNumber; // Integer
    #nbhdWidth; // Integer
    #cellsNbhd; // Array(Array(Integer))[cellsNumber][nbhdWidth]
    #numRules; // Int = 2^nbhdWidth
    #rules; // Array(Bool)[numRules]
    #state; // Array(Bool)[cellsNumber]

    constructor() {
        //

        this.#nbhdWidth = 3;
        // this.#nbhdType = "insitu";
        // this.#nbhdMainCell;
    }

    get cellsNumber() {
        return this.#cellsNumber;
    }

    set cellsNumber(number) {
        this.#cellsNumber = Math.min(Math.max(number, 0), this.#MAX_CELLS);
    }

    get nbhdWidth() {
        return this.#nbhdWidth;
    }

    set nbhdWidth(width) {
        this.#nbhdWidth = width;
        this.#numRules = Math.pow(2, width);
    }

    cellNbhd(index) {
        return this.#cellsNbhd[index];
    }

    setNbhds(type, subtype, mainCell) {}

    get numRules() {
        return this.#numRules;
    }

    ruleState(rule) {}

    setRule(rule, state) {}

    get state() {
        return this.#state;
    }

    set state(state) {}

    #cellNextState(index) {
        //

        let nstate;

        nstate = this.neighborhoods[index];
        nstate = nstate.map((e) => this.state[e]);
        nstate = CellularAutomaton.boolArrayToInt(nstate, false);
        nstate = this.#rules[nstate];

        return nstate;
    }

    nextState() {
        let nstate = this.state.map((cell, i, state_) =>
            this.#cellNextState(i)
        );

        this.state = nstate;

        return nstate;
    }

    // static functions

    static adjacentNbhd(index, width, main, numCells) {
        //

        let nbhd = [];
        let a = index - main;
        let b = a + width;

        for (let i = a; i < b; i++) {
            nbhd.push(i);
        }

        if (a < 0) {
            nbhd = nbhd.map((e) => e < 0 ? numCells + e : e);
        }

        if (b >= numCells) {
            nbhd = nbhd.map((e) => e % numCells);
        }

        return nbhd;
    }

    static groupedNbhd(index, width, main, numCells) {
        //

        let nbhd = [];
        let a = Math.round(Math.random() + numCells);
        let b = a + width;

        for (let i = a; i < b; i++) {
            nbhd.push(i);
        }

        if (a < 0) {
            nbhd = nbhd.map((e) => e < 0 ? numCells + e : e);
        }
        
        if (b >= numCells) {
            nbhd = nbhd.map((e) => e % numCells);
        }

        if (main >= 0) {
            nbhd.splice(main, 1, index);
        }

        return nbhd;
    }

    static scatteredNbhd(index, width, main, numCells) {
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

    static cellsNbhds(type, numCells, nbhdWidth, mainCell) {
        //

        let nbhds = [];
        let nbhdFunc;

        switch (type) {
            case "grouped":
                nbhdFunc = this.groupedNbhd;
                break;
            case "scattered":
                nbhdFunc = this.scatteredNbhd;
                break;
            default:
                // "adjacent"
                nbhdFunc = this.adjacentNbhd;
        }

        for (let i = 0; i < numCells; i++) {
            nbhds.push(nbhdFunc(i, nbhdWidth, mainCell, numCells));
        }

        console.log(nbhds);

        return nbhds;
    }
}
