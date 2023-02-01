import { BaseIter } from './base';
export * from './factory';
export declare class SyncIter<T = unknown> extends BaseIter<T, SyncIter> {
    [Symbol.iterator](): Iterator<T, any, undefined>;
    static from<R>(iterable: Iterable<R>): SyncIter<R>;
}
export declare class AsyncIter<T = unknown> extends BaseIter<T, AsyncIter> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
    static from<R>(iterable: AnyIterable<R>): AsyncIter<R>;
}
