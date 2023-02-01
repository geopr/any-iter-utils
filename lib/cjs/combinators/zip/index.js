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
exports.zip = void 0;
const utils_1 = require("../../utils");
function zip(...iterables) {
    return iterables.some(utils_1.isAsyncIterable) ? azip(...iterables) : szip(...iterables);
}
exports.zip = zip;
function szip(...iterables) {
    const [firstIterable, ...restIterables] = iterables, restIters = restIterables.map(utils_1.extractIter);
    return (0, utils_1.createII)(firstIterable, ({ done, value }) => {
        const result = [value];
        for (const iter of restIters) {
            const { done, value } = iter.next();
            if (done) {
                return { done: true, value: undefined };
            }
            result.push(value);
        }
        return { done, value: (0, utils_1.cast)(result) };
    });
}
function azip(...iterables) {
    const [firstIterable, ...restIterables] = iterables.map(utils_1.forceAsyncII), restIters = restIterables.map(utils_1.extractIter);
    return (0, utils_1.createII)(firstIterable, ({ done, value }) => __awaiter(this, void 0, void 0, function* () {
        const result = [value];
        for (const iter of restIters) {
            const { done, value } = yield iter.next();
            if (done) {
                return { done: true, value: undefined };
            }
            result.push(value);
        }
        return { done, value: (0, utils_1.cast)(result) };
    }));
}
