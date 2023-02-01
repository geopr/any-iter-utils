import { assert, forceAsyncII, isIterable } from '../../utils';
import { BaseIter } from './base';
export * from './factory';
export class SyncIter extends BaseIter {
    [Symbol.iterator]() {
        assert(isIterable(this.iterable), 'cannot use Symbol.iterator of AsyncIterable object');
        return this.iterable[Symbol.iterator]();
    }
    static from(iterable) {
        return new SyncIter(iterable);
    }
}
export class AsyncIter extends BaseIter {
    [Symbol.asyncIterator]() {
        return forceAsyncII(this.iterable);
    }
    static from(iterable) {
        return new AsyncIter(iterable);
    }
}
