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

export function copyArray(array: any[]): any[] {
    //
    return array.map((e) => e);
}

export function setArrayItem(array: any[], index: number, value: any) {
    let nArray = copyArray(array);
    nArray[index] = value;
    return nArray;
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

export function copyMatrix(matrix: any[][]): any[][] {
    //
    return matrix.map((row) => row.map((cell) => cell));
}

export function setArray2dItem(
    r: number,
    c: number,
    matrix: any[][],
    value: any
): any[][] {
    //
    let nMatrix = copyMatrix(matrix);
    nMatrix[r][c] = value;
    return nMatrix;
}

export function addRow(
    matrix: any[][],
    // atStart: boolean,
    remove: boolean
): any[][] {
    //
    let nMatrix = copyMatrix(matrix);

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
    let nMatrix = copyMatrix(matrix);

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
