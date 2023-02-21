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
export function intToBoolArray(int, size) {
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
export function boolArrayToInt(arr, reverse) {
    let int;

    int = [...arr];
    int = reverse ? int.reverse() : int;
    int = int.map((e) => (e ? "1" : "0"));
    int = int.join("");
    int = parseInt(int, 2);

    return int;
}

/**
 * Builds a string with the corresponding BS5 input group classes.
 * @param {String} size size ('sm', 'lg', '')
 * @param {String} alignment alignment ('start', 'center', 'end', '')
 * @param {String} classes other classes
 * @returns {String} classes
 */
export function inputGroupClasses(size, alignment, classes) {
    //

    if (size === "sm" || size === "lg") {
        size = `input-group-${size}`;
    } else {
        size = "";
    }

    if (
        alignment === "start" ||
        alignment === "center" ||
        alignment === "end"
    ) {
        alignment = `d-flex justify-content-${alignment}`;
    } else {
        alignment = "";
    }

    return `input-group ${size} ${alignment} ${classes}`;
}

/**
 * Returns the number of elements in the diagonal given of an entry in a matrix.
 * @param {Int} width
 * @param {Int} height
 * @param {Int} row
 * @param {Int} col
 * @returns number of elements in the diagonal
 */
export function diagonalSize(width, height, row, col) {
    //

    let d = col - row;

    if (0 > d) {
        return Math.min(width, height) - Math.abs(d);
    } else if (d > Math.abs(width - height)) {
        return Math.max(width, height) - Math.abs(d);
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
export function diagonalNeighbors(width, height, row, col) {
    return (
        diagonalSize(width, height, row, col) +
        diagonalSize(width, height, row, width - col) -
        1
    );
}

// export function randomBoolArray(size) {
//     //

//     let boolArr = [];

//     for (let i = 0; i < size; i++) {
//         boolArr.push(Math.random() <= 0.5);
//     }

//     return boolArr;
// }

export function boolArray(length, bool) {
    return Array(length).fill(bool);
}

export function boolArrayNot(boolArr) {
    return boolArr.map((e) => !e);
}

export function randBoolArr(length, numTrue) {
    //

    let boolArr = boolArray(length, false);

    for (let i = 0, r; i < numTrue; i++) {
        r = Math.round(Math.random() * length);
        boolArr[r] = true;
    }

    return boolArr;
}

export function randBoolArrEvenDist(length, numTrue, groupSize) {
    //

    let boolArr = [];

    let numGroups = Math.round(numTrue / groupSize);
    let padding = Math.round((length - numTrue) / (numGroups + 1));

    for (let i = 0; i <= numGroups; i++) {
        boolArr = boolArr.concat(boolArray(padding, false));
        boolArr = boolArr.concat(boolArray(groupSize, true));
    }

    return boolArr.slice(0, length);
}

export function randBoolArrRandDist(
    length,
    numTrue,
    groupMinSize,
    groupMaxSize
) {
    //

    let boolArr = [];
    let groups = [];

    let groupSizeDif = Math.abs(groupMaxSize - groupMinSize);

    let sum = 0;
    let groupSize = 0;

    while (sum < numTrue) {
        groupSize = groupMinSize + Math.round(Math.random() * groupSizeDif);
        groups.push(groupSize);
        sum += groupSize;
    }

    let padding = Math.round((length - numTrue) / (groups.length + 1));

    groups.forEach((e) => {
        boolArr = boolArr.concat(boolArray(padding, false));
        boolArr = boolArr.concat(boolArray(e, true));
    });

    while (boolArr.length < length) {
        boolArr = boolArr.concat(boolArray(padding, false));
        boolArr = boolArr.concat(boolArray(groupMaxSize, true));
    }

    return boolArr.slice(0, length);
}

export function randBoolArrPercent(length, percentTrue) {
    //

    return randBoolArr(length, Math.round((percentTrue / 100) * length));
}

export function ranBoolArrEvenDistPercent(length, percentTrue, groupSize) {
    //

    return randBoolArrEvenDist(
        length,
        Math.round((percentTrue / 100) * length),
        groupSize
    );
}

export function randBoolArrRandDistPercent(
    length,
    percentTrue,
    groupMinSize,
    groupMaxSize
) {
    //

    return randBoolArrRandDist(
        length,
        Math.round((percentTrue / 100) * length),
        groupMinSize,
        groupMaxSize
    );
}

export function initState(
    liveCellsType,
    distribution,
    groupSizeType,
    numCells,
    liveCells,
    groupSize,
    groupMinSize,
    groupMaxSize
) {
    if (liveCellsType === 0) {
        // number
        if (distribution === 0) {
            // random
            console.log("number - random");
            return randBoolArr(numCells, liveCells);
        } else {
            // even
            if (groupSizeType === 0) {
                // fixed
                console.log("number - even - fixed");
                return randBoolArrEvenDist(numCells, liveCells, groupSize);
            } else {
                // random
                console.log("number - even - random");
                return randBoolArrRandDist(
                    numCells,
                    liveCells,
                    groupMinSize,
                    groupMaxSize
                );
            }
        }
    } else {
        // percentage
        if (distribution === 0) {
            // random
            console.log("percentage - random");
            return randBoolArrPercent(numCells, liveCells);
        } else {
            // even
            if (groupSizeType === 0) {
                // fixed
                console.log("percentage - even - fixed");
                return ranBoolArrEvenDistPercent(
                    numCells,
                    liveCells,
                    groupSize
                );
            } else {
                // random
                console.log("percentage - even - random");
                return randBoolArrRandDistPercent(
                    numCells,
                    liveCells,
                    groupMinSize,
                    groupMaxSize
                );
            }
        }
    }
}