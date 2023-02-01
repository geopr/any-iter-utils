"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropWhile = void 0;
const utils_1 = require("../../utils");
function dropWhile(iterable, predicate) {
    return (0, utils_1.createII)(iterable, function (chunk) {
        return predicate(chunk.value) ? this.next() : chunk;
    });
}
exports.dropWhile = dropWhile;
