//

import { boolArrayToInt } from "./Utils";

export type NbhdType = "adjacent" | "grouped" | "scattered";
export type DistributionType = "rand" | "even";

export default class CellularAutomaton {
    //

    #numCells: number;
    #cellsNbhd: number[][]; // Array(Array(Integer))[cellsNumber][nbhdWidth]
    #rules: boolean[];
    #state: boolean[];

    constructor(numCells: number) {
        //

        this.#numCells = numCells;
        this.#cellsNbhd = [];
        this.#rules = [];
        this.#state = Array(this.#numCells).fill(false);

        this.setCellsNbhds(3, "adjacent", 1);
        this.setRulesRandom();
        this.setCellsState(1, 1, 1, "even");
    }

    get cellsNumber(): number {
        return this.#numCells;
    }

    #adjacentNbhd(index: number, width: number, main: number): number[] {
        //

        let nbhd = [];
        let a = index - main;
        let b = a + width;

        for (let i = a; i < b; i++) {
            nbhd.push(i);
        }

        if (a < 0) {
            nbhd = nbhd.map((e) => (e < 0 ? this.#numCells + e : e));
        }

        if (b >= this.#numCells) {
            nbhd = nbhd.map((e) => e % this.#numCells);
        }

        return nbhd;
    }

    #groupedNbhd(index: number, width: number, mainCell: number): number[] {
        //

        let nbhd = [];
        let a = Math.round(Math.random() * this.#numCells);
        let b = a + width;

        for (let i = a; i < b; i++) {
            nbhd.push(i);
        }

        if (a < 0) {
            nbhd = nbhd.map((e) => (e < 0 ? this.#numCells + e : e));
        }

        if (b >= this.#numCells) {
            nbhd = nbhd.map((e) => e % this.#numCells);
        }

        if (mainCell >= 0) {
            nbhd.splice(mainCell, 1, index);
        }

        return nbhd;
    }

    #scatteredNbhd(index: number, width: number, mainCell: number): number[] {
        //

        let nbhd = [];

        for (let i = 0; i < width; i++) {
            nbhd.push(Math.round(Math.random() * this.#numCells));
        }

        if (mainCell >= 0) {
            nbhd.splice(mainCell, 1, index);
        }

        return nbhd;
    }

    setCellsNbhds(width: number, type: NbhdType, mainCell: number) {
        //

        let nbhds = [];
        let getNbhd;

        switch (type) {
            case "adjacent":
                getNbhd = (index: number) =>
                    this.#adjacentNbhd(index, width, mainCell);
                break;
            case "grouped":
                getNbhd = (index: number) =>
                    this.#groupedNbhd(index, width, mainCell);
                break;
            case "scattered":
                getNbhd = (index: number) =>
                    this.#scatteredNbhd(index, width, mainCell);
                break;
        }

        for (let i = 0; i < this.#numCells; i++) {
            nbhds.push(getNbhd(i));
        }

        this.#cellsNbhd = nbhds;
        this.#rules = Array(Math.pow(2, width)).fill(false);
    }

    getCellNbhd(index: number): number[] {
        return this.#cellsNbhd[index];
    }

    setRule(index: number, state: boolean) {
        //

        this.#rules[index] = state;
    }

    toggleRule(index: number) {
        this.#rules[index] = !this.#rules[index];
    }

    setRulesRandom() {
        //

        for (let i = 0; i < this.#rules.length; i++) {
            this.#rules[i] = Math.random() <= 0.5;
        }
    }

    setRulesAlive() {
        //

        for (let i = 0; i < this.#rules.length; i++) {
            this.#rules[i] = true;
        }
    }

    setRulesDead() {
        //

        for (let i = 0; i < this.#rules.length; i++) {
            this.#rules[i] = false;
        }
    }

    setRulesInverse() {
        //

        for (let i = 0; i < this.#rules.length; i++) {
            this.#rules[i] = !this.#rules[i];
        }
    }

    getRule(index: number): boolean {
        return this.#rules[index];
    }

    get rulesAsNum(): number {
        return boolArrayToInt(this.#rules, true);
    }

    get numRules(): number {
        return this.#rules.length;
    }

    /**
     * Returns an array of integers between 'minVal' and 'maxVal' whose sum equals totalSum.
     * @param {Int} minVal min value
     * @param {Int} maxVal max value
     * @param {Int} totalSum total sum
     */
    #variableDist(minVal: number, maxVal: number, totalSum: number): number[] {
        //

        let arr = [];
        let diff = Math.abs(maxVal - minVal);
        let sum = 0;
        let num;

        while (sum < totalSum) {
            num = minVal + Math.round(Math.random() * diff);
            arr.push(num);
            sum += num;
        }

        arr[arr.length - 1] -= sum - totalSum;

        return arr;
    }

    /**
     * Returns an array of n = 'nums' random integers whose sum equals 'totalSum'.
     * @param {Int} nums number of integers
     * @param {Int} totalSum total sum
     */
    #randomDist(nums: number, totalSum: number): number[] {
        //

        let arr = [];
        let sum = 0;

        for (let i = 0, n; i < nums; i++) {
            n = Math.round(Math.random() * totalSum);
            arr.push(n);
            sum += n;
        }

        let trim = Math.round((sum - totalSum) / nums);

        for (let i = 0, diff, trimAc = 0; i < nums; i++) {
            diff = arr[i] - (trim + trimAc);
            if (diff > 0) {
                arr[i] = diff;
                trimAc = 0;
            } else {
                arr[i] = 1;
                trimAc = Math.abs(diff + 1);
            }
        }

        return arr;
    }

    /**
     *
     * @param liveCells Mumber of live cells. If it is smaller than one, it will be considered as percentage.
     * @param groupMinSize
     * @param groupMaxSize
     * @param distribution
     * @returns
     */
    setCellsState(
        liveCells: number,
        groupMinSize: number,
        groupMaxSize: number,
        distribution: DistributionType
    ) {
        //

        if (liveCells >= 0 && liveCells < 1) {
            liveCells = Math.round(liveCells * this.#numCells);
        } else {
            liveCells = Math.max(1, Math.min(liveCells, this.#numCells));
        }

        let deadCells = this.#numCells - liveCells;

        let groupSizeDiff = Math.abs(groupMaxSize - groupMinSize);

        let trueArr, falseArr;

        if (groupSizeDiff > 0) {
            trueArr = this.#variableDist(groupMinSize, groupMaxSize, liveCells);
        } else {
            trueArr = Array(Math.round(liveCells / groupMinSize)).fill(
                groupMinSize
            );
        }

        if (distribution === "rand") {
            falseArr = this.#randomDist(trueArr.length + 1, deadCells);
        } else {
            falseArr = Array(trueArr.length + 1).fill(
                Math.round(deadCells / (trueArr.length + 1))
            );
        }

        let arr: boolean[] = [];

        for (let i = 0; i < trueArr.length; i++) {
            arr = arr.concat(
                Array(falseArr[i])
                    .fill(false)
                    .concat(Array(trueArr[i]).fill(true))
            );
        }

        let diff = this.#numCells - arr.length;
        if (diff <= 0) {
            arr = arr.slice(0, this.#numCells);
        } else {
            arr = arr.concat(Array(diff).fill(false));
        }

        this.#state = arr;
    }

    toggleCellState(index: number) {
        this.#state[index] = !this.#state[index];
    }

    get cellsState(): boolean[] {
        return this.#state;
    }

    #nextCellState(index: number): boolean {
        //

        let nstate;

        nstate = this.#cellsNbhd[index];
        nstate = nstate.map((e) => this.#state[e]);
        nstate = boolArrayToInt(nstate, false);
        nstate = this.#rules[nstate];

        return nstate;
    }

    nextCellsState(): boolean[] {
        //

        let nstate = this.#state.map((cell, i) => this.#nextCellState(i));

        this.#state = nstate;

        return nstate;
    }
}
