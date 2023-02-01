"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
const utils_1 = require("../utils");
/**
 * creates `IterableIterator` with a range of numbers
 *
 * @param from - the range starts from this number
 *
 * @param to - the range ends at this number
 * if not specified either negative or positive `Inifinity` will be taken
 * depending on the sign of "from"
 *
 * @returns new `IterableIterator` with the range
 *
 * @example
 * range(1, 3); // IterableIterator<1, 2, 3>
 * range(-1, -3); // IterableIterator<-1, -2, -3>
 * range(-1, 1); // IterableIterator<-1, 0, 1>
 * range(1); // IterableIterator<from 1 to Inifinity>
 * range(-1); // IterableIterator<from -1 to -Infinity>
 */
function range(from, to) {
    to !== null && to !== void 0 ? to : (to = from < 0 ? -Infinity : Infinity);
    if (from < to) {
        return (0, utils_1.syncIIFactory)(() => ({ done: from > to, value: from++ }));
    }
    return (0, utils_1.syncIIFactory)(() => ({ done: from < to, value: from-- }));
}
exports.range = range;
