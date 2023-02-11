class CAPCellsState {
    #container;
    #arr;

    constructor(containerId, cellsNum) {
        this.#container = $("#" + containerId);

        this.#arr = [];

        for (let i = 0, cell; i < cellsNum; i++) {
            cell = new CAPCellButton(i);
            this.#arr.push(cell);
            this.#container.append(cell.element);
        }
    }

    setRandomState(density) {
        let state = CellularAutomaton.randomState(this.size, density);

        this.#arr.forEach((e, i) => (e.checked = state[i]));
    }

    clearState() {
        this.#arr.forEach((e, i, arr) => (e.checked = false));
    }

    setInSituNeighborhoods(size, alignment) {
        this.neighborhoods = CellularAutomaton.inSituNeighborhoods(
            this.size,
            size,
            alignment
        );
    }

    setGroupedNeighborhoods(size) {
        this.neighborhoods = CellularAutomaton.randomGroupedNeighborhoods(
            this.size,
            size
        );
    }

    setScatteredNeighborhood(size) {
        this.neighborhoods = CellularAutomaton.randomScatteredNeighborhoods(
            this.size,
            size
        );
    }

    get size() {
        return this.#arr.length;
    }

    get state() {
        return this.#arr.map((e) => e.checked);
    }

    get neighborhoods() {
        return this.#arr.map((e) => e.neighborhood.map((e) => e.id));
    }

    set neighborhoods(conns) {
        this.#arr.forEach(
            (e, i, arr) => (e.neighborhood = conns[i].map((e2) => arr[e2]))
        );
    }

    set enabled(bool) {
        this.#arr.forEach((e, i, arr) => (e.enabled = bool));
    }
}
