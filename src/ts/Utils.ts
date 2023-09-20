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
export function intToBoolArray(
    int: number,
    size: number,
    reverse = true
): boolean[] {
    //
    let arr;

    arr = "0".repeat(size) + int.toString(2);
    arr = arr.slice(-size);
    arr = arr.split("");
    arr = arr.map((e) => e === "1");
    // it is originally reversed
    if (!reverse) {
        arr = arr.reverse();
    }

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
export function boolArrayToInt(
    arr: boolean[],
    reverse: boolean = false
): number {
    //
    let int;

    int = [...arr];
    int = reverse ? int.reverse() : int;
    int = int.map((e) => (e ? "1" : "0"));
    int = int.join("");
    int = parseInt(int, 2);

    return int;
}

export function randomBool(size: number, trueProb: number): boolean[] {
    //
    let boolArr = [];

    for (let i = 0; i < size; i++) {
        boolArr.push(Math.random() <= trueProb);
    }

    return boolArr;
}

export function randomBool2d(
    rows: number,
    cols: number,
    trueDensity: number
): boolean[][] {
    //
    let boolArr = [];

    for (let i = 0; i < rows; i++) {
        boolArr.push(randomBool(cols, trueDensity));
    }

    return boolArr;
}

export function count(
    array: any[],
    countFunc: (e: any, i: number) => boolean
): number {
    //
    return array.reduce((acc, e, i) => acc + (countFunc(e, i) ? 1 : 0), 0);
}

export function count2d(
    array: any[][],
    countFunc: (e: any, r: number, c: number) => boolean
): number {
    //
    return array.reduce(
        (acc, row, r) =>
            acc +
            row.reduce((accR, e, c) => accR + (countFunc(e, r, c) ? 1 : 0), 0),
        0
    );
}

export function countTrue(array: boolean[]): number {
    return count(array, (e) => e);
}

export function countNotNull(array: any[]): number {
    return count(array, (e) => e !== null);
}

export function countTrue2d(array: boolean[][]): number {
    return count2d(array, (e) => e);
}

export function countNotNull2d(array: any[][]): number {
    return count2d(array, (e) => e !== null);
}

export function boolArray(length: number, fillValue: boolean) {
    //
    return Array(length).fill(fillValue);
}

export function boolArrayNot(boolArr: boolean[]): boolean[] {
    //
    return boolArr.map((e) => !e);
}

export function createArray(size: number, fill: any) {
    return Array(size)
        .fill(null)
        .map(() => fill);
}

export function createArray2d(rows: number, cols: number, fill: any): any[][] {
    return Array(rows)
        .fill(null)
        .map(() =>
            Array(cols)
                .fill(null)
                .map(() => fill)
        );
}

export function copyArray(array: any[]): any[] {
    //
    return array.map((e) => e);
}

export function copyArray2d(array: any[][]): any[][] {
    //
    // return Array.from(array);
    return array.map((row) => row.map((cell) => cell));
}

export function setArrayItem(array: any[], index: number, value: any) {
    let nArray = copyArray(array);
    nArray[index] = value;
    return nArray;
}

export function setArray2dItem(
    r: number,
    c: number,
    matrix: any[][],
    value: any
): any[][] {
    //
    let nMatrix = copyArray2d(matrix);
    nMatrix[r][c] = value;
    return nMatrix;
}

export function addRow(
    matrix: any[][],
    // atStart: boolean,
    remove: boolean
): any[][] {
    //
    let nMatrix = copyArray2d(matrix);

    if (remove) {
        // if (atStart) {
        //     nMatrix.shift();
        // } else {
        nMatrix.pop();
        // }
    } else {
        const newRow = Array(matrix[0].length).fill(false);
        // if (atStart) {
        // nMatrix.unshift(newRow);
        // } else {
        nMatrix.push(newRow);
        // }
    }

    return nMatrix;
}

export function addColumn(
    matrix: any[][],
    // atStart: boolean,
    remove: boolean
): any[][] {
    //
    let nMatrix = copyArray2d(matrix);

    if (remove) {
        // if (atStart) {
        //     nMatrix.forEach((row) => row.shift());
        // } else {
        nMatrix.forEach((row) => row.pop());
        // }
    } else {
        // if (atStart) {
        //     nMatrix.forEach((row) => row.unshift(false));
        // } else {
        nMatrix.forEach((row) => row.push(false));
        // }
    }

    return nMatrix;
}

export function resizeArray(arr: any[], nlength: number, fill: any): any[] {
    //
    const diff = nlength - arr.length;
    if (diff > 0) {
        return arr.concat(createArray(diff, fill));
    } else if (diff < 0) {
        return arr.slice(0, nlength);
    } else {
        return copyArray(arr);
    }
}

export function resizeArray2d(
    arr: any[][],
    nrows: number,
    ncols: number,
    fill: any
): any[][] {
    //
    let narr = copyArray2d(arr);
    let diff = ncols - narr[0].length;

    if (diff > 0) {
        narr = narr.map((row) => row.concat(createArray(diff, fill)));
    } else if (diff < 0) {
        narr = narr.map((row) => row.slice(0, ncols));
    }

    diff = nrows - arr.length;

    if (diff > 0) {
        narr = narr.concat(createArray2d(diff, narr[0].length, fill));
    } else if (diff < 0) {
        narr = narr.slice(0, nrows);
    }

    return narr;
}
