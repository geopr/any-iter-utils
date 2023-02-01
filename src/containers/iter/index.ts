import { assert, forceAsyncII, isIterable } from 'utils';

import { BaseIter } from './base';

export * from './factory';

export class SyncIter<T = unknown> extends BaseIter<T, SyncIter> {
  [Symbol.iterator]() {
    assert(isIterable(this.iterable), 'cannot use Symbol.iterator of AsyncIterable object');
    return this.iterable[Symbol.iterator]();
  }

  static from<R>(iterable: Iterable<R>): SyncIter<R> {
    return new SyncIter(iterable);
  }
}

export class AsyncIter<T = unknown> extends BaseIter<T, AsyncIter> {
  [Symbol.asyncIterator]() {
    return forceAsyncII(this.iterable);
  }

  static from<R>(iterable: AnyIterable<R>): AsyncIter<R> {
    return new AsyncIter(iterable);
  }
}
