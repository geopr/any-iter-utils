var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isAsyncIterable, isIterable, isAnyIterable, syncIIFactory, cast, extractIter, asyncIIFactory } from '../../utils';
export function flat(iterable) {
    return isAsyncIterable(iterable) ? aflat(iterable) : sflat(iterable);
}
function sflat(iterable) {
    const mainIter = iterable[Symbol.iterator]();
    let subIter;
    return syncIIFactory(cast(function () {
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
        if (isIterable(chunk.value)) {
            subIter = chunk.value[Symbol.iterator]();
            return this.next();
        }
        return chunk;
    }));
}
function aflat(iterable) {
    const mainIter = iterable[Symbol.asyncIterator]();
    let subIter;
    return asyncIIFactory(cast(function () {
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
            if (isAnyIterable(chunk.value)) {
                subIter = extractIter(chunk.value);
                return this.next();
            }
            return chunk;
        });
    }));
}
