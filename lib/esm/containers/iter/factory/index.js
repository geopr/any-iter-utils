import { isAsyncIterable, isNumber, range, objectEntries, isIterable } from '../../../utils';
import { SyncIter, AsyncIter } from '../../../containers';
export function intoIter(value, to) {
    if (isNumber(value)) {
        return SyncIter.from(range(value, to));
    }
    if (isAsyncIterable(value)) {
        return AsyncIter.from(value);
    }
    if (isIterable(value)) {
        return SyncIter.from(value);
    }
    return SyncIter.from(objectEntries(value));
}
