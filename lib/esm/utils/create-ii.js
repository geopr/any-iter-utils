import { asyncIIFactory, cast, isAsyncIterable, syncIIFactory } from 'utils';
export function createII(iterable, cb) {
    return isAsyncIterable(iterable) ? createAsync(iterable, cb) : createSync(iterable, cb);
}
function createSync(iterable, cb) {
    const iter = iterable[Symbol.iterator]();
    if (cb == null) {
        return cast(syncIIFactory(iter.next.bind(iter)));
    }
    return syncIIFactory(function () {
        const chunk = iter.next();
        return chunk.done ? chunk : cb.call(this, chunk);
    });
}
function createAsync(iterable, cb) {
    const iter = iterable[Symbol.asyncIterator]();
    if (cb == null) {
        return cast(asyncIIFactory(iter.next.bind(iter)));
    }
    return asyncIIFactory(function () {
        return iter.next().then((chunk) => chunk.done ? chunk : cb.call(this, chunk));
    });
}
