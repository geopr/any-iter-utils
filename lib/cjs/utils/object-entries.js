"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectEntries = void 0;
const utils_1 = require("../utils");
/**
 * converts object into `IterableIterator` with entries `[key, value]`
 *
 * @param obj - the object to convert
 *
 * @returns new `IterableIterator` instance with the entries
 *
 * @example
 * objectEntries({ foo: '1', bar: '2' }); // IterableIterator<['foo', 1], ['bar', 2]>
 */
function objectEntries(obj) {
    return (0, utils_1.fromGen)(function* () {
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                yield [key, obj[key]];
            }
        }
    });
}
exports.objectEntries = objectEntries;
