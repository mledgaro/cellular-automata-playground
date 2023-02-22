class GUI {
    static IDS = {
        components1D: "cap-1d-component",
        components2D: "cap-2d-component",
        dimensionSelectorBtn: "dimension-selector-btn",
        canvasContainer: "canvas-container-1d",
        sectionSelector: "section-selector-container",
        sectionClass: "cap-section",
    };

    static COLORS = {
        background: "#6c757d",
        cellOff: "#212529",
        cellOn: "#ffc107",
        highlight: "#f8f9fa",
    };

    dimensionSelectorBtn;
    canvas;
    controls;
    sectionSelector;
    neighborhood;
    rules;
    initialState;

    constructor() {
        this.dimensionSelectorBtn = new CAPToggleButton(
            GUI.IDS.dimensionSelectorBtn,
            ["1", "2"],
            "solid",
            "2xl"
        );

        this.canvas = new CAPCanvas(GUI.IDS.canvasContainer, 0.95, 0.7);

        this.controls = new GUIControls();

        this.sectionSelector = new CAPButtonGroupSelector(
            GUI.IDS.sectionSelector,
            ["Neighborhood", "Rules", "Initial state"]
        );

        this.neighborhood = new GUISectionNeighborhood();

        this.rules = new GUISectionRules();

        this.initialState = new GUISectionInitialState(this.canvas.maxColumns);

        this.#initComponents();

        this.#initControls();

        this.#initSections();
    }

    #initComponents() {
        this.setMode1D();
        // this.setMode2D();
        this.dimensionSelectorBtn.state = 0;

        this.dimensionSelectorBtn.onClick = () => this.toggleDimensionMode();

        this.canvas.clear();
    }

    #initControls() {
        this.controls.canvas.clear.onClick = () => {
            if (this.dimensionSelectorBtn.state == 0) {
                this.canvas.clearBuffer();
            } else {
                this.canvas.initBuffer();
            }

            this.canvas.clear();
        };

        this.controls.canvas.screenshot.onClick = () => {
            this.canvas.saveScene("cellular_automaton_playground");
        };

        this.controls.zoom.decreaseBtnOnClick = () => this.#updateCanvasZoom();
        this.controls.zoom.increaseBtnOnClick = () => this.#updateCanvasZoom();

        this.#updateCanvasZoom();
    }

    #initSections() {
        this.sectionSelector.setOnClick(
            0,
            () => (this.visibleSection = "neighborhood")
        );

        this.sectionSelector.setOnClick(
            1,
            () => (this.visibleSection = "rules")
        );

        this.sectionSelector.setOnClick(
            2,
            () => (this.visibleSection = "initialState")
        );

        this.#initNeighborhoodSection();
        this.#initRulesSection();
        this.#initInitialStateSection();
    }

    #initNeighborhoodSection() {
        // 1D

        this.neighborhood.d1.size.change(() => {
            this.rules.maxRuleNumber = this.neighborhood.maxRuleNumber;

            this.rules.reloadRules1D(this.neighborhood.getSize("d1"));

            this.rules.setRandomRule();

            this.#updateInitialStateNeighborhoods();
        });

        this.neighborhood.d1.type.change(() => {
            this.initialState.enableNeighborhoodsBtn(
                this.neighborhood.getType("d1")
            );

            this.#updateInitialStateNeighborhoods();
        });

        this.neighborhood.d1.alignment.change(() => {
            this.#updateInitialStateNeighborhoods();
        });

        // 2D

        this.neighborhood.d2.size.change(() => this.#updateRules2D());

        this.neighborhood.d2.type.change(() => this.#updateRules2D());
    }

    #initRulesSection() {
        this.rules.maxRuleNumber = this.neighborhood.maxRuleNumber;

        this.rules.reloadRules1D(this.neighborhood.getSize("d1"));

        this.rules.ruleNumber = 90;

        this.#updateRules2D();

        this.rules.d2.rules = [
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

    #initInitialStateSection() {
        this.initialState.neighborhoodsBtn.onClick = () =>
            this.#updateInitialStateNeighborhoods();

        this.initialState.enableNeighborhoodsBtn(
            this.neighborhood.getType("d1")
        );

        this.#updateInitialStateNeighborhoods();
    }

    #updateCanvasZoom() {
        this.canvas.cellSize = this.controls.zoom.value;

        this.canvas.paintBuffer();
    }

    #updateInitialStateNeighborhoods() {
        this.initialState.reloadNeighborhoods(
            this.neighborhood.getSize("d1"),
            this.neighborhood.getType("d1"),
            this.neighborhood.getAlignment("d1")
        );
    }

    #updateRules2D() {
        this.rules.reloadRules2D(
            this.neighborhood.getSize("d2"),
            this.neighborhood.getType("d2")
        );
    }

    // public

    setMode1D() {
        // this.dimensionSelectorBtn.state = 0;

        $("." + GUI.IDS.components2D).hide();
        $("." + GUI.IDS.components1D).show();

        this.sectionSelector.active = 0;
        this.visibleSection = "neighborhood";

        // enable initial state section selector
        this.sectionSelector.setEnabled(2, true);

        this.initialState.enableNeighborhoodsBtn(
            this.neighborhood.getType("d1")
        );

        this.canvas.clearBuffer();
        this.canvas.clear();
    }

    setMode2D() {
        // this.dimensionSelectorBtn.state = 1;

        $("." + GUI.IDS.components1D).hide();
        $("." + GUI.IDS.components2D).show();

        this.sectionSelector.active = 0;
        this.visibleSection = "neighborhood";

        // disable initial state section selector
        this.sectionSelector.setEnabled(2, false);

        this.canvas.initBuffer();
        this.canvas.clear();
    }

    toggleDimensionMode() {
        // true on 2D mode
        if (this.dimensionSelectorBtn.state == 0) {
            this.setMode1D();
        } else {
            this.setMode2D();
        }
    }

    get currentDimension() {
        return this.dimensionSelectorBtn.state == 0 ? "d1" : "d2";
    }

    set visibleSection(sectionName) {
        $("." + GUI.IDS.sectionClass).hide();
        this[sectionName].container.show();
    }

    static setEnabled(element, bool) {
        element.removeAttr("disabled");
        if (!bool) {
            element.attr("disabled", "true");
        }
    }
}
