import { createII } from 'utils';

/**
 * excludes values from `Iterable` object if predicate returns false
 *
 * @param iterable - `Iterable` object to exclude values from
 *
 * @param predicate - predicate function
 * it will be called on each `Iterator.next` call and recieve the value
 * if it returns true the value will stay in the returnable `IterableIterator` otherwise it will be excluded
 *
 * @returns new `IterableIterator` with filtered values
 *
 * @example
 * filter([1, 2, 3], (val) => val > 1); // IterableIterator<2, 3>
 */
export function filter<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): IterableIterator<T>;

/**
 * excludes values from `AsyncIterable` object if predicate returns false
 *
 * @param iterable - `AsyncIterable` object to exclude values from
 * @param predicate - predicate function
 * it will be called on each `AsyncIterator.next` call and recieve the value
 * if it returns true the value will stay in the returnable `AsyncIterableIterator` otherwise it will be excluded
 *
 * @returns new `AsyncIterableIterator` with filtered values
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 * filter(gen(), (val) => val > 1); // AsyncIterableIterator<2, 3>
 */
export function filter<T>(iterable: AsyncIterable<T>, predicate: (value: T) => boolean): AsyncIterableIterator<T>;

/**
 * service overload
 */
export function filter<T>(iterable: AnyIterable<T>, predicate: (value: T) => boolean): AnyIterableIterator<T>;

export function filter<T>(iterable: AnyIterable<T>, predicate: (value: T) => boolean): AnyIterableIterator<T> {
  return createII(iterable, function (chunk) {
    return predicate(chunk.value) ? chunk : this.next();
  });
}
