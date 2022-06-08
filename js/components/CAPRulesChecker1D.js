class CAPRulesChecker1D
{
    #container;
    #arr;
    #onClickFunc;

    constructor(containerId)
    {
        this.#container = $("#" + containerId);
        this.#arr = [];
    }

    loadRules(neighborhoodSize)
    {
        /* 
            TODO  
            Recycle atomic rules comonponents instead of removing them all and
            create new ones.
        */

        let size;

        size = Math.pow(2, neighborhoodSize);

        this.#arr = [];
        this.#container.empty();

        for (let i = 0, arule; i < size; i++)
        {
            arule = new CAPRuleCheck1D(i, neighborhoodSize);
            arule.onClick = () => this.#onClickFunc();

            this.#arr.push(arule);
            this.#container.append(arule.element);
        }
    }

    get values()
    {
        return this.#arr.map((e) => e.checked);
    }

    get ruleNumber()
    {
        return CellularAutomaton.boolArrayToInt(this.values, true);
    }

    get size()
    {
        return this.#arr.length;
    }

    set ruleNumber(ruleNumber)
    {
        let boolArr = CellularAutomaton.intToBoolArray(ruleNumber, this.size);

        this.#arr.forEach((e, i, arr) => e.checked = boolArr[i]);
    }

    set enabled(bool)
    {
        this.#container.find("button").removeAttr("disabled");
        if (!bool)
        {
            this.#container.find("button").attr("disabled", "true");
        }
    }

    set onClick(func)
    {
        this.#onClickFunc = func;
    }
}
