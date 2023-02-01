"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.take = void 0;
const combinators_1 = require("../../combinators");
const utils_1 = require("../../utils");
function take(iterable, amount) {
    return (0, utils_1.createII)((0, combinators_1.enumerate)(iterable), ({ value: entry }) => {
        const [idx, value] = entry;
        return idx >= amount ? { done: true, value: undefined } : { done: false, value };
    });
}
exports.take = take;
