class GUISectionRules {
    static IDS = {
        container: "section-rules-container",
        class: "cap-section-rules",
        d1: {
            ruleNumber: "rules-rule-number",
            randomBtn: "rules-random-rule-btn",
            uncheckAllBtn: "rules-uncheck-all-rules-btn",
            checkAllBtn: "rules-check-all-rules-btn",
            checker: "rules-atomic-rules-cont",
        },
        d2: {
            container: "rules-2d-cont",
        },
    };

    container;
    d1;
    d2;

    #maxRuleNumber;

    constructor() {
        this.container = $("#" + GUISectionRules.IDS.container);

        this.d1 = {
            ruleNumber: $("#" + GUISectionRules.IDS.d1.ruleNumber),
            randomBtn: new CAPButton(
                GUISectionRules.IDS.d1.randomBtn,
                "Random",
                "shuffle",
                "lg"
            ),
            uncheckAllBtn: new CAPButton(
                GUISectionRules.IDS.d1.uncheckAllBtn,
                "Uncheck all",
                "square",
                "lg"
            ),
            checkAllBtn: new CAPButton(
                GUISectionRules.IDS.d1.checkAllBtn,
                "Check all",
                "square-check",
                "lg"
            ),
            checker: new CAPRulesChecker1D(GUISectionRules.IDS.d1.checker),
        };

        this.d2 = new CAPRulesChecker2D(GUISectionRules.IDS.d2.container);

        this.d1.ruleNumber.change(
            () => (this.d1.checker.ruleNumber = this.ruleNumber)
        );

        this.d1.randomBtn.onClick = () => this.setRandomRule();

        this.d1.uncheckAllBtn.onClick = () => this.setMinRule();

        this.d1.checkAllBtn.onClick = () => this.setMaxRule();

        this.d1.checker.onClick = () =>
            this.d1.ruleNumber.val(this.d1.checker.ruleNumber);
    }

    setRandomRule() {
        this.ruleNumber = Math.floor(Math.random() * this.#maxRuleNumber);
    }

    setMinRule() {
        this.ruleNumber = 0;
    }

    setMaxRule() {
        this.ruleNumber = this.#maxRuleNumber;
    }

    reloadRules1D(neighborhoodSize) {
        this.d1.checker.loadRules(neighborhoodSize);
    }

    reloadRules2D(neighborhoodSize, neighborhoodType) {
        this.d2.loadRules(neighborhoodSize, neighborhoodType);
    }

    get ruleNumber() {
        return Number(this.d1.ruleNumber.val());
    }

    get rules2D() {
        return this.d2.rules;
    }

    set maxRuleNumber(num) {
        this.#maxRuleNumber = num;
        this.d1.ruleNumber.attr("max", num);
    }

    set ruleNumber(num) {
        this.d1.ruleNumber.val(num);
        this.d1.checker.ruleNumber = num;
    }

    set enabled(bool) {
        GUI.setEnabled($("." + GUISectionRules.IDS.class), bool);
        this.d1.checker.enabled = bool;
        this.d2.enabled = bool;
    }
}
