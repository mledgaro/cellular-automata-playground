class CAPRulesChecker2D {
    #CLASS_NAME = "cap-rule-2d";

    #container;
    #arr;

    constructor(containerId) {
        this.#container = $("#" + containerId);

        this.#arr = [];
    }

    #addRules(num) {
        this.#arr = [];

        this.#container.empty();

        for (let i = 0, rule; i <= num; i++) {
            rule = new CAPRuleCheck2D(i);

            this.#arr.push(rule);

            this.#container.append(rule.element);
        }
    }

    loadRules(neighborhoodSize, neighborhoodType) {
        switch (neighborhoodType) {
            case "moore":
                this.#addRules(Math.pow(neighborhoodSize, 2) - 1);
                break;
            case "vonneumann":
            case "diagonal":
                this.#addRules((neighborhoodSize - 1) * 2);
                break;
        }
    }

    get rules() {
        return this.#arr.map((e) => (e.state == 0 ? null : e.state == 2));
    }

    set rules(rules) {
        this.#arr.forEach(
            (e, i) => (e.state = rules[i] == null ? 0 : rules[i] ? 2 : 1)
        );
    }

    set enabled(bool) {
        this.#container.find("button").removeAttr("disabled");
        if (!bool) {
            this.#container.find("button").attr("disabled", "true");
        }
    }
}
