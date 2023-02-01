"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeWhile = void 0;
const utils_1 = require("../../utils");
function takeWhile(iterable, predicate) {
    return (0, utils_1.createII)(iterable, (chunk) => {
        return predicate(chunk.value) ? chunk : { done: true, value: undefined };
    });
}
exports.takeWhile = takeWhile;
