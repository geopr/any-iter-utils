var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asyncIIFactory, isAsyncIterable, syncIIFactory } from '../../utils';
export function cycle(iterable) {
    return isAsyncIterable(iterable) ? acycle(iterable) : scycle(iterable);
}
function scycle(iterable) {
    const buffer = [];
    let iter = iterable[Symbol.iterator]();
    return syncIIFactory(function () {
        const chunk = iter.next();
        if (chunk.done) {
            iter = buffer[Symbol.iterator]();
            return this.next();
        }
        buffer.push(chunk.value);
        return chunk;
    });
}
function acycle(iterable) {
    const buffer = [];
    let iter = iterable[Symbol.asyncIterator]();
    return asyncIIFactory(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const chunk = yield iter.next();
            if (chunk.done) {
                iter = buffer[Symbol.iterator]();
                return this.next();
            }
            buffer.push(chunk.value);
            return chunk;
        });
    });
}
