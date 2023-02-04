"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flat = void 0;
const utils_1 = require("../../utils");
function flat(iterable) {
    return (0, utils_1.isAsyncIterable)(iterable) ? aflat(iterable) : sflat(iterable);
}
exports.flat = flat;
function sflat(iterable) {
    const mainIter = iterable[Symbol.iterator]();
    let subIter;
    return (0, utils_1.syncIIFactory)((0, utils_1.cast)(function () {
        if (subIter != null) {
            const chunk = subIter.next();
            if (chunk.done) {
                subIter = null;
            }
            else {
                return chunk;
            }
        }
        const chunk = mainIter.next();
        if (chunk.done) {
            return { done: true, value: undefined };
        }
        if ((0, utils_1.isIterable)(chunk.value)) {
            subIter = chunk.value[Symbol.iterator]();
            return this.next();
        }
        return chunk;
    }));
}
function aflat(iterable) {
    const mainIter = iterable[Symbol.asyncIterator]();
    let subIter;
    return (0, utils_1.asyncIIFactory)((0, utils_1.cast)(function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (subIter != null) {
                const chunk = yield subIter.next();
                if (chunk.done) {
                    subIter = null;
                }
                else {
                    return chunk;
                }
            }
            const chunk = yield mainIter.next();
            if (chunk.done) {
                return { done: true, value: undefined };
            }
            if ((0, utils_1.isAnyIterable)(chunk.value)) {
                subIter = (0, utils_1.extractIter)(chunk.value);
                return this.next();
            }
            return chunk;
        });
    }));
}
