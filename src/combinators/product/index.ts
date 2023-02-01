import { flatMap, map, seq } from 'combinators';

import type { TuplesFromIters } from 'combinators';

import { cast } from 'utils';

/**
 * does cartesian product for the specified `Iterable` objects
 * 
 * @example iterables - the `Iterable` objects to apply cartesian product to
 *
 * @returns new `IterableIterator` with the pairs pairs from cartesian product application
 *
 * @example
 * product([1, 2], 'ab', [true]); // IterableIterator<[1, 'a'], [1, 'b'], [1, true], [2, 'a'], [2, 'b'], [2, true]>
 */
export function product<Iters extends Iterable<any>[]>(...iterables: Iters): IterableIterator<TuplesFromIters<Iters>>;

/**
 * does cartesian product for the specified `AnyIterable` objects
 * 
 * @example iterables - the `AnyIterable` objects to apply cartesian product to
 *
 * @returns new `AsyncIterableIterator` with the pairs pairs from cartesian product application
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2;
 * }
 * product(gen(), 'ab', [true]); // AsyncIterableIterator<[1, 'a'], [1, 'b'], [1, true], [2, 'a'], [2, 'b'], [2, true]>
 */
export function product<Iters extends AnyIterable<any>[]>(...iterables: Iters): AsyncIterableIterator<TuplesFromIters<Iters>>;

export function product<Iters extends AnyIterable<any>[]>(...iterables: Iters): AnyIterableIterator<TuplesFromIters<Iters>> {
  const [firstIterable, ...restIterables] = iterables;
  return cast(flatMap(
    firstIterable,
    (firstVal) => map(seq(...restIterables), (val) => [firstVal, val])
  ));
}
