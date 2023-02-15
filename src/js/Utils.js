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
    arr = arr.map((e) => e == "1");
    arr = arr.reverse();

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

    int = reverse ? arr.reverse() : arr;
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
