class GUISectionInitialState {
    static IDS = {
        container: "section-initial-state",
        class: "cap-section-initial-state",
        clearBtn: "initial-state-clear-btn",
        random: {
            density: "initial-state-random-density",
            btn: "initial-state-random-btn",
        },
        neighborhoodsBtn: "initial-state-neighborhoods-btn",
        cells: "initial-state-cells",
    };

    container;
    clearBtn;
    random;
    neighborhoodsBtn;
    cells;

    constructor(cellsNumber) {
        this.container = $("#" + GUISectionInitialState.IDS.container);

        this.clearBtn = new CAPButton(
            GUISectionInitialState.IDS.clearBtn,
            "Clear",
            "broom",
            "lg"
        );

        this.random = {
            density: $("#" + GUISectionInitialState.IDS.random.density),
            btn: new CAPButton(
                GUISectionInitialState.IDS.random.btn,
                "Random",
                "shuffle",
                "lg"
            ),
        };

        this.neighborhoodsBtn = new CAPButton(
            GUISectionInitialState.IDS.neighborhoodsBtn,
            "Neighborhoods",
            "circle-nodes",
            "lg"
        );

        this.cells = new CAPCellsState(
            GUISectionInitialState.IDS.cells,
            cellsNumber
        );

        this.clearBtn.onClick = () => this.cells.clearState();

        this.random.density.val(0.3);

        this.random.btn.onClick = () =>
            this.cells.setRandomState(Number(this.random.density.val()));

        this.cells.setRandomState(Number(this.random.density.val()));
    }

    reloadNeighborhoods(
        neighborhoodSize,
        neighborhoodType,
        neighborhoodAlignment
    ) {
        switch (neighborhoodType) {
            case "insitu":
                this.cells.setInSituNeighborhoods(
                    neighborhoodSize,
                    neighborhoodAlignment
                );
                break;

            case "grouped":
                this.cells.setGroupedNeighborhoods(neighborhoodSize);
                break;

            case "scattered":
                this.cells.setScatteredNeighborhood(neighborhoodSize);
                break;
        }
    }

    enableNeighborhoodsBtn(neighborhoodType) {
        this.neighborhoodsBtn.enabled = neighborhoodType != "insitu";
    }

    get neighborhoods() {
        return this.cells.neighborhoods;
    }

    get state() {
        return this.cells.state;
    }

    set enabled(bool) {
        GUI.setEnabled($("." + GUISectionInitialState.IDS.class), bool);
        this.cells.enabled = bool;
    }
}
