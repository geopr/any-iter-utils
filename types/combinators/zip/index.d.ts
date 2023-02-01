import type { TuplesFromIters } from '../../combinators';
/**
 * Zips the specified `Iterable` objects together
 * It takes one element from every `Iterable` object and creates a tuple from them
 * If any `Iterable` returns `{ done: true }` the returable `IterableIterator` also returns `{ done: true }`
 *
 * @param iterables - `Iterable` objects to zip together
 *
 * @returns `IterableIterator` object with tuples of values from every `Iterable` object
 *
 * @example
 * zip([1, 2, 3], [4, 5, 6], [7, 8, 9]); // IterableIterator<[1, 4, 7], [2, 5, 8], [3, 6, 9]>
 * zip([1, 2, 3], [4, 5], [7, 8, 9]); // IterableIterator<[1, 4, 7], [2, 5, 8]>
 */
export declare function zip<Iters extends Iterable<any>[]>(...iterables: Iters): IterableIterator<TuplesFromIters<Iters>>;
/**
 * Zips the specified `AnyIterable` objects together
 * It takes one element from every `AnyIterable` object and creates a tuple from them
 * If any `AnyIterable` returns `{ done: true }` the returable `AsyncIterableIterator` also returns `{ done: true }`
 *
 * @param iterables - `AnyIterable` objects to zip together
 *
 * @returns `AsyncIterableIterator` object with tuples of values from every `AnyIterable` object
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 * zip(gen(), [4, 5, 6], [7, 8, 9]); // AsyncIterableIterator<[1, 4, 7], [2, 5, 8], [3, 6, 9]>
 * zip(gen(), [4, 5], [7, 8, 9]); // AsyncIterableIterator<[1, 4, 7], [2, 5, 8]>
 */
export declare function zip<Iters extends AnyIterable<any>[]>(...iterables: Iters): AsyncIterableIterator<TuplesFromIters<Iters>>;
