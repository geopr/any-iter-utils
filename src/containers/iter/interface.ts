import type { SyncIter, AsyncIter } from './index';

export type PickIter<T, Iter> = Iter extends SyncIter ? SyncIter<T> : AsyncIter<T>;

export type PromisifyValue<T, Iter> = Iter extends SyncIter ? T : Promise<T>;

export type PickCollectResult<T, Iter> = Iter extends SyncIter ? T : Promise<T>;

export type GetNativeIterable<T, Iter> = Iter extends SyncIter ? Iterable<T> : AnyIterable<T>;

export type FlatIterable<T, Iter> = Iter extends SyncIter
  ? T extends Iterable<infer R> ? R : T
  : T extends AnyIterable<infer R> ? R : T;
