"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractIter = void 0;
const utils_1 = require("../utils");
function extractIter(iterable) {
    return (0, utils_1.isAsyncIterable)(iterable) ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
}
exports.extractIter = extractIter;
