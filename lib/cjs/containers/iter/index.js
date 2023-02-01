"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncIter = exports.SyncIter = void 0;
const utils_1 = require("../../utils");
const base_1 = require("./base");
__exportStar(require("./factory"), exports);
class SyncIter extends base_1.BaseIter {
    [Symbol.iterator]() {
        (0, utils_1.assert)((0, utils_1.isIterable)(this.iterable), 'cannot use Symbol.iterator of AsyncIterable object');
        return this.iterable[Symbol.iterator]();
    }
    static from(iterable) {
        return new SyncIter(iterable);
    }
}
exports.SyncIter = SyncIter;
class AsyncIter extends base_1.BaseIter {
    [Symbol.asyncIterator]() {
        return (0, utils_1.forceAsyncII)(this.iterable);
    }
    static from(iterable) {
        return new AsyncIter(iterable);
    }
}
exports.AsyncIter = AsyncIter;
