class CellularAutomaton
{
    #neighborhoodSize;
    #ruleNum;

    #atomicRulesNum;
    #maxRuleNum;

    #rules;

    state;
    neighborhoods;
    

    constructor()
    {

    }


    // private

    #cellNextState(index)
    {
        let nstate;

        nstate = this.neighborhoods[index];
        nstate = nstate.map((e) => this.state[e]);
        nstate = CellularAutomaton.boolArrayToInt(nstate, false);
        nstate = this.#rules[nstate];

        return nstate;
    }


    //public

    setRandomNeighborhoods()
    {
        this.neighborhoods = CellularAutomaton.randomScatteredNeighborhoods(
            this.state.length, this.neighborhoodSize)
    }

    setRandomContiguousNeighborhoods()
    {
        this.neighborhoods =
            CellularAutomaton.randomGroupedNeighborhoods(
                this.state.length, this.neighborhoodSize)
    }

    setContiguousNeighborhoods(alignment)
    {
        this.neighborhoods =
            CellularAutomaton.inSituNeighborhoods(
                this.state.length,
                this.neighborhoodSize, alignment);
    }

    nextState()
    {
        let nstate = this.state.map((cell, i, state_) => this.#cellNextState(i));

        this.state = nstate;

        return nstate;
    }


    // getters

    get ruleNumber()
    {
        return this.#ruleNum;
    }

    get neighborhoodSize()
    {
        return this.#neighborhoodSize;
    }

    get rules()
    {
        return this.#rules;
    }


    // setters

    set neighborhoodSize(size)
    {
        this.#neighborhoodSize = size;
        this.#atomicRulesNum = Math.pow(2, size);
        this.#maxRuleNum = Math.pow(2, this.#atomicRulesNum) - 1;
    }

    set rules(ruleNumber)
    {
        this.#ruleNum = Math.max(ruleNumber, 0);
        this.#ruleNum = Math.min(this.#ruleNum, this.#maxRuleNum);

        this.#rules = CellularAutomaton.intToBoolArray(
            ruleNumber, this.#atomicRulesNum);
    }


    /**
     * Converts an integer number to an array of booleans that represents
     * the digits of its binary representation. 
     * E.G.
     * 30 -> 00011110_b -> [false, true, true, true, true, false, false, false]
     * @param {int} int integer number
     * @param {int} size array size
     * @returns {Array} array of booleans
     */
    static intToBoolArray(int, size)
    {
        let arr;

        arr = "0".repeat(size) + int.toString(2);
        arr = arr.slice(-size);
        arr = arr.split("");
        arr = arr.map((e) => e == "1");
        arr = arr.reverse();

        return arr;
    }

    /**
     * Converts a boolean array to an integer number whose binary digits are
     * the booleans of the array.
     * E.G.
     * [false, true, true, true, true, false, false, false] -> 00011110_b -> 30
     * @param {Array} arr boolean array
     * @returns {int} integer number
     */
    static boolArrayToInt(arr, reverse)
    {
        let int;

        int = reverse ? arr.reverse() : arr;
        int = int.map((e) => e ? "1" : "0");
        int = int.join("");
        int = parseInt(int, 2);

        return int;
    }

    static randomState(cellsNumber, density)
    {
        return Array(cellsNumber).fill().map(() => Math.random() < density);
    }

    static cellsGroup(index, cellsNumber, neighboorhoodSize, alignment)
    {
        let offset;

        offset = Math.floor((neighboorhoodSize - 1) / 2);
        offset += (neighboorhoodSize % 2 == 0 && alignment == "right") ? 1 : 0;
        offset = index - offset;

        return Array(neighboorhoodSize).fill().map(
            (e, i, arr) =>
            {
                let n;
                n = i + offset;
                n = n < 0 ? cellsNumber + n : n;
                n = n >= cellsNumber ? n % cellsNumber : n;

                return n;
            });
    }

    static randomScatteredNeighborhoods(cellsNumber, neighborhoodSize)
    {
        return Array(cellsNumber).fill().map(
            () => Array(neighborhoodSize).fill().map(
                () => Math.floor(Math.random() * cellsNumber)
            ));
    }

    static randomGroupedNeighborhoods(cellsNumber, neighborhoodSize)
    {
        let func = () => 
                CellularAutomaton.cellsGroup(
                    Math.floor(Math.random() * cellsNumber), cellsNumber, 
                    neighborhoodSize, "left");

        return Array(cellsNumber).fill().map(() => func());
    }

    static inSituNeighborhoods(cellsNumber, neighboorhoodSize, alignment)
    {
        let func = (i) => 
                CellularAutomaton.cellsGroup(i, cellsNumber, neighboorhoodSize, 
                    alignment);

        return Array(cellsNumber).fill().map((e, i, arr) => func(i));
    }

}
