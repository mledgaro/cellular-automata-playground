class CellularAutomaton2D {
    #neighborhoodSize;
    #neighborhoodType;
    #neighborhoodAlignment;
    #rules;

    #countNeighbors;
    #rowMargin;
    #colMargin;

    state;

    constructor() {
        // game of life configuration
        this.config = {
            neighborhoodSize: 3,
            neighborhoodType: "moore",
            neighborhoodAlignment: "topleft", // it does not apply for this case
            rules: [
                false,
                false,
                null,
                true,
                false,
                false,
                false,
                false,
                false,
            ],
        };
    }

    // private

    #countMooreNeighbors(row, col) {
        let count, firstRow, firstCol;

        count = 0;
        firstRow = row - this.rowMargin;
        firstCol = col - this.colMargin;

        for (let r = firstRow, c; r < firstRow + this.#neighborhoodSize; r++) {
            for (c = firstCol; c < firstCol + this.#neighborhoodSize; c++) {
                count += this.#cellState(r, c) ? 1 : 0;
            }
        }

        count -= this.#cellState(row, col) ? 1 : 0;

        return count;
    }

    #countVonNeumannNeighbors(row, col) {
        let count, firstRow, firstCol;

        count = 0;
        firstRow = row - this.rowMargin;
        firstCol = col - this.colMargin;

        for (let r = firstRow; r < firstRow + this.#neighborhoodSize; r++) {
            count += this.#cellState(r, col) ? 1 : 0;
        }

        for (let c = firstCol; c < firstCol + this.#neighborhoodSize; c++) {
            count += this.#cellState(row, c) ? 1 : 0;
        }

        count -= this.#cellState(row, col) ? 2 : 0;

        return count;
    }

    #countDiagonalNeighbors(row, col) {
        let count, firstRow, firstCol, i;

        count = 0;

        firstRow = row - this.rowMargin;
        firstCol = col - this.colMargin;

        for (i = 0; i < size; i++) {
            count += this.#cellState(firstRow + i, firstCol + i) ? 1 : 0;
        }

        firstCol = col + this.#neighborhoodSize - this.colMargin - 1;

        for (i = 0; i < size; i++) {
            count += this.#cellState(firstRow + i, firstCol - i) ? 1 : 0;
        }

        count -= this.#cellState(row, col) ? 2 : 0;

        return count;
    }

    #cellState(row, col) {
        row =
            row < 0
                ? this.numRows + row
                : row >= this.numRows
                ? row - this.numRows
                : row;

        col =
            col < 0
                ? this.numCols + col
                : col >= this.numCols
                ? col - this.numCols
                : col;

        return this.state[row][col];
    }

    #cellNextState(row, col) {
        let nneighbors, nstate;

        nneighbors = this.#countNeighbors(row, col);

        nstate = this.#rules[nneighbors];
        nstate = nstate == null ? this.state[row][col] : nstate;

        return nstate;
    }

    // public functions

    nextState(replace) {
        let nstate;

        nstate = this.state.map((row, r) =>
            row.map((cell, c) => this.#cellNextState(r, c))
        );

        if (replace) {
            this.state = nstate;
        }

        return nstate;
    }

    // getters

    get neighborhoodSize() {
        return this.#neighborhoodSize;
    }

    get neighborhoodType() {
        return this.#neighborhoodType;
    }

    get neighborhoodAlignment() {
        return this.#neighborhoodAlignment;
    }

    get rules() {
        return this.#rules;
    }

    get rowMargin() {
        return this.#rowMargin;
    }

    get colMargin() {
        return this.#colMargin;
    }

    get numRows() {
        return this.state.length;
    }

    get numCols() {
        return this.state[0].length;
    }

    // setters

    set config(config) {
        this.#neighborhoodSize = config.neighborhoodSize;
        this.#neighborhoodType = config.neighborhoodType;
        this.#neighborhoodAlignment = config.neighborhoodAlignment;
        this.#rules = config.rules;

        switch (config.neighborhoodType) {
            case "moore":
                this.#countNeighbors = this.#countMooreNeighbors;
                break;

            case "vonneumann":
                this.#countNeighbors = this.#countVonNeumannNeighbors;
                break;

            case "diagonal":
                this.#countNeighbors = this.#countDiagonalNeighbors;
                break;
        }

        let margin = Math.floor((this.#neighborhoodSize - 1) / 2);

        this.#rowMargin = margin;
        this.#colMargin = margin;

        if (this.#neighborhoodSize % 2 == 0) {
            this.#rowMargin += this.#neighborhoodAlignment.includes("bottom")
                ? 1
                : 0;

            this.#colMargin += this.#neighborhoodAlignment.includes("right")
                ? 1
                : 0;
        }
    }
}
