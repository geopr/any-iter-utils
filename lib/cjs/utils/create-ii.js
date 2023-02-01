"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createII = void 0;
const utils_1 = require("../utils");
function createII(iterable, cb) {
    return (0, utils_1.isAsyncIterable)(iterable) ? createAsync(iterable, cb) : createSync(iterable, cb);
}
exports.createII = createII;
function createSync(iterable, cb) {
    const iter = iterable[Symbol.iterator]();
    if (cb == null) {
        return (0, utils_1.cast)((0, utils_1.syncIIFactory)(iter.next.bind(iter)));
    }
    return (0, utils_1.syncIIFactory)(function () {
        const chunk = iter.next();
        return chunk.done ? chunk : cb.call(this, chunk);
    });
}
function createAsync(iterable, cb) {
    const iter = iterable[Symbol.asyncIterator]();
    if (cb == null) {
        return (0, utils_1.cast)((0, utils_1.asyncIIFactory)(iter.next.bind(iter)));
    }
    return (0, utils_1.asyncIIFactory)(function () {
        return iter.next().then((chunk) => chunk.done ? chunk : cb.call(this, chunk));
    });
}
