import { isAsyncIterable } from 'utils';
export function extractIter(iterable) {
    return isAsyncIterable(iterable) ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
}
