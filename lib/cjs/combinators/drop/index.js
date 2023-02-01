"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drop = void 0;
const enumerate_1 = require("../../combinators/enumerate");
const utils_1 = require("../../utils");
function drop(iterable, amount) {
    return (0, utils_1.createII)((0, enumerate_1.enumerate)(iterable), function ({ value: entry }) {
        const [idx, value] = entry;
        return idx < amount ? this.next() : { done: false, value };
    });
}
exports.drop = drop;
