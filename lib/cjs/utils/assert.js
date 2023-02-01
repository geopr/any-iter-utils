"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
/**
 * standart assert function
 *
 * @param condition - condition to be asserted
 * @param msg - additional error message in case assertion's failed
 */
function assert(condition, msg) {
    if (!condition)
        throw new Error(msg);
}
exports.assert = assert;
