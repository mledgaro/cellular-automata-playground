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

