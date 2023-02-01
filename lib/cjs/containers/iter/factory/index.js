"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoIter = void 0;
const utils_1 = require("../../../utils");
const containers_1 = require("../../../containers");
function intoIter(value, to) {
    if ((0, utils_1.isNumber)(value)) {
        return containers_1.SyncIter.from((0, utils_1.range)(value, to));
    }
    if ((0, utils_1.isAsyncIterable)(value)) {
        return containers_1.AsyncIter.from(value);
    }
    if ((0, utils_1.isIterable)(value)) {
        return containers_1.SyncIter.from(value);
    }
    return containers_1.SyncIter.from((0, utils_1.objectEntries)(value));
}
exports.intoIter = intoIter;
