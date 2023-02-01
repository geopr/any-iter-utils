"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
/**
 * @returns a `Promise` that will be resolved in the specified milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
