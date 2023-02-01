"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceAsyncII = void 0;
const utils_1 = require("../utils");
/**
 * converts specified `AnyIterable` into `AsyncIterableIterator`
 *
 * @param iterable - `AnyIterable` to convert
 *
 * @example
 * forcesyncII([1, 2, 3]); // AsyncIterableIterator<1, 2, 3>
 *
 * async function* gen() {
 *   yield 1; yield 2; yield 3;
 * }
 * forceAsyncII(gen()); // AsyncIterableIterator<1, 2, 3>
 */
function forceAsyncII(iterable) {
    const iter = (0, utils_1.extractIter)(iterable);
    return (0, utils_1.asyncIIFactory)(iter.next.bind(iter));
}
exports.forceAsyncII = forceAsyncII;
