import type { ItersValues } from 'combinators/interface';

import { flat } from 'combinators';

import { forceAsyncII, isAsyncIterable } from 'utils';

/**
 * The function yields values of all passed `Iterable` objects
 *
 * @returns new `IterableIterator` with values from all specified iterables
 *
 * @example
 * seq('foo', [1, 2], [true]); // IterableIterator<'f', 'o', 'o', 1, 2, true>;
 */
export function seq<Iters extends Iterable<any>[]>(...iterables: Iters): IterableIterator<ItersValues<Iters>>;

/**
 * The function yields values of all passed `AnyIterable` objects
 *
 * @returns new `AsyncIterableIterator` with values from all specified sync/async iterables
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2;
 * }
 * seq('foo', gen(), [true]); // AsyncIterableIterator<'f', 'o', 'o', 1, 2, true>;
 */
export function seq<Iters extends AnyIterable<any>[]>(...iterables: Iters): AsyncIterableIterator<ItersValues<Iters>>;

export function seq<Iters extends AnyIterable<any>[]>(...iterables: Iters): AnyIterableIterator<Iters> {
  const isAsync = iterables.some(isAsyncIterable);
  return flat(isAsync ? forceAsyncII(iterables) : iterables);
}
