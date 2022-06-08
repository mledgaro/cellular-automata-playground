class WolframCellularAutomaton
{
    constructor (maxCells, neighborhoodRadius=1)
    {
        this.maxCells = maxCells;
        this.neighborhoodRadius = neighborhoodRadius;
        this.neighborhoodDiameter = 2 * neighborhoodRadius;
        this.cells = {
            states: Array(maxCells + this.neighborhoodDiameter).fill(false),
            neighborhood: Array(maxCells).fill(0)
        }

        this.activeCells = maxCells;

        this.numRules = Math.pow(2, this.neighborhoodDiameter + 1);
        this.maxRuleNum = Math.pow(2, this.numRules);
        this.rules = Array(this.numRules).fill(false);
    }

    #calcCellNeighborhood(idx)
    {
        this.cells.neighborhood[idx] = parseInt(
            this.cells.states.slice(
                idx, idx + this.neighborhoodDiameter).map((e) => e ? "1" : "0").join(""), 2);
    }

    #updateCellState(idx)
    {
        this.cells.states[idx - this.neighborhoodRadius] = this.rules[this.cells.nelghborhood[idx]];
    }

    #calcNeighborhoods()
    {
        for (let i = 0; i < this.activeCells; i++)
        {
            this.#calcCellNeighborhood(i);
        }
    }

    #updateStates()
    {
        for (let i = 0; i < this.activeCells; i++)
        {
            this.#updateCellState(i);
        }
    }

    integerToBooleanArray(intNum)
    {
        return ("0".repeat(this.numRules - 1) + intNum.toString(2))
            .slice(-this.numRules).split("").map((e) => e == "1");
    }

    booleanArrayToInteger(boolArr)
    {
        return parseInt(boolArr.map((e) => e ? "1" : "0").join(""), 2);
    }

    cellState(idx)
    {
        return this.cells.states[idx - this.neighborhoodRadius];
    }

    nextState()
    {
        this.#calcNeighborhoods();
        this.#updateStates();
    }

    setActiveCells(numCells)
    {
        if (numCells >= 0 && numCells < this.maxCells)
        {
            this.activeCells = numCells;
        }
        else{
            console.error("numCells must be between 0 and " + this.maxCells);
        }
    }

    setRule(ruleNum)
    {
        
        if (ruleNum >= 0 && ruleNum < this.maxRuleNum)
        {
            this.rules = this.integerToBooleanArray(ruleNum);
        }
        else
        {
            console.error("ruleNum must be between 0 and " + this.maxRuleNum);
        }
    }
}