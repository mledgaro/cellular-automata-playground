//

/**
 * Converts an integer number to an array of booleans that represents
 * the digits of its binary representation.
 * E.G.
 * 30 -> 00011110_b -> [false, true, true, true, true, false, false, false]
 * @param {int} int integer number
 * @param {int} size array size
 * @returns {Array} array of booleans
 */
export function intToBoolArray(int: number, size: number): boolean[] {
    //

    let arr;

    arr = "0".repeat(size) + int.toString(2);
    arr = arr.slice(-size);
    arr = arr.split("");
    arr = arr.map((e) => e === "1");
    // arr = arr.reverse();

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
export function boolArrayToInt(arr: boolean[], reverse?: boolean): number {
    //

    let int;

    int = [...arr];
    int = (reverse || false) ? int.reverse() : int;
    int = int.map((e) => (e ? "1" : "0"));
    int = int.join("");
    int = parseInt(int, 2);

    return int;
}

export type Size = "sm" | "md" | "lg";
export type Alignment = "start" | "center" | "end";

/**
 * Builds a string with the corresponding BS5 input group classes.
 * @param {String} size size ('sm', 'lg', '')
 * @param {String} alignment alignment ('start', 'center', 'end', '')
 * @param {String} classes other classes
 * @returns {String} classes
 */
export function inputGroupClasses(
    size: Size,
    alignment: Alignment,
    classes: string
): string {
    //

    let size_, alignment_;

    if (size === "sm" || size === "lg") {
        size_ = `input-group-${size}`;
    } else {
        size_ = "";
    }

    if (
        alignment === "start" ||
        alignment === "center" ||
        alignment === "end"
    ) {
        alignment_ = `d-flex justify-content-${alignment}`;
    } else {
        alignment_ = "";
    }

    return `input-group ${size_} ${alignment_} ${classes}`;
}

/**
 * Returns the number of elements in the diagonal given of an entry in a matrix.
 * @param {Int} width
 * @param {Int} height
 * @param {Int} row
 * @param {Int} col
 * @returns number of elements in the diagonal
 */
export function diagonalSize(
    width: number,
    height: number,
    row: number,
    col: number
): number {
    //

    let diff = col - row;

    if (0 > diff) {
        return Math.min(width, height) - Math.abs(diff);
    } else if (diff > Math.abs(width - height)) {
        return Math.max(width, height) - Math.abs(diff);
    } else {
        // 0 <= d <= Math.abs(width - height)
        return Math.min(width, height);
    }
}

/**
 * Returns the number of neighbors in the diagonals given of an entry in a matrix.
 * @param {Int} width
 * @param {Int} height
 * @param {Int} row
 * @param {Int} col
 * @returns number of elements in the diagonal
 */
export function diagonalNeighbors(
    width: number,
    height: number,
    row: number,
    col: number
): number {
    //

    return (
        diagonalSize(width, height, row, col) +
        diagonalSize(width, height, row, width - col) -
        1
    );
}

export function randomBoolArray(size: number): boolean[] {
    //

    let boolArr = [];

    for (let i = 0; i < size; i++) {
        boolArr.push(Math.random() <= 0.5);
    }

    return boolArr;
}

export function boolArray(length: number, fillValue: boolean) {
    //

    return Array(length).fill(fillValue);
}

export function boolArrayNot(boolArr: boolean[]): boolean[] {
    //

    return boolArr.map((e) => !e);
}

/**
 * Returns an array of integers between 'minVal' and 'maxVal' whose sum equals totalSum.
 * @param {Int} minVal min value
 * @param {Int} maxVal max value
 * @param {Int} totalSum total sum
 */
function variableDist(
    minVal: number,
    maxVal: number,
    totalSum: number
): number[] {
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
function randomDist(nums: number, totalSum: number): number[] {
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

function normalizeBoolArr(
    arr: boolean[],
    size: number,
    fill: boolean
): boolean[] {
    //

    let diff = size - arr.length;
    if (diff <= 0) {
        return arr.slice(0, size);
    } else {
        return arr.concat(boolArray(diff, fill));
    }
}

/**
 * Interlaced bool strings
 * @param {*} falseArr each element determines the size of false bool string
 * @param {*} trueArr each element determines the size of true bool string
 * @param {*} length length of the resulting array
 */
function interlacedBoolArrays(
    falseArr: number[],
    trueArr: number[],
    length: number
): boolean[] {
    //

    let arr: boolean[] = [];

    for (let i = 0; i < trueArr.length; i++) {
        arr = arr.concat(
            boolArray(falseArr[i], false).concat(boolArray(trueArr[i], true))
        );
    }

    return normalizeBoolArr(arr, length, false);
}

export function buildState(
    liveCellsType: 'num' | 'perc',
    distributionType: 'rand' | 'even',
    numCells: number,
    liveCells: number,
    groupMinSize: number,
    groupMaxSize: number
): boolean[] {
    //

    if (liveCellsType === "perc") {
        liveCells = Math.max(1, Math.min(liveCells, 100));
        liveCells = Math.round((liveCells / 100) * numCells);
    } else {
        // liveCellsType === "num"
        liveCells = Math.max(1, Math.min(liveCells, numCells));
    }

    let groupSizeDiff = Math.abs(groupMaxSize - groupMinSize);
    let deadCells = numCells - liveCells;

    let trueArr, falseArr;

    if (groupSizeDiff > 0) {
        trueArr = variableDist(groupMinSize, groupMaxSize, liveCells);
    } else {
        trueArr = Array(Math.round(liveCells / groupMinSize)).fill(
            groupMinSize
        );
    }

    if (distributionType === "rand") {
        falseArr = randomDist(trueArr.length + 1, deadCells);
    } else {
        falseArr = Array(trueArr.length + 1).fill(
            Math.round(deadCells / (trueArr.length + 1))
        );
    }

    return interlacedBoolArrays(falseArr, trueArr, numCells);
}
