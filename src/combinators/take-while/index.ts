import { createII } from 'utils';

/**
 * takes values from `Iterable` while the predicate returns true
 *
 * @param iterable - `Iterable` object to take values from
 * 
 * @param predicate - the predicate function 
 * it will be called on each `Iterator.next` call and recieve the value
 * if it returns true the value will stay otherwise the taking process stops
 *
 * @returns new `IterableIterator` with taken values
 *
 * @example
 * takeWhile([3, 2, 5, 1, 4], (val) => val <= 3); // IterableIterator<3, 2>
 */
export function takeWhile<T>(iterable: Iterable<T>, predicate: (val: T) => boolean): IterableIterator<T>;

/**
 * takes values from `AsyncIterable` while the predicate returns true
 *
 * @param iterable - `AsyncIterable` object to take values from
 * 
 * @param predicate - the predicate function 
 * it will be called on each `AsyncIterator.next` call and recieve the value
 * if it returns true the value will stay otherwise the taking process stops
 *
 * @returns new `AsyncIterableIterator` with taken values
 *
 * @example
 * takeWhile([3, 2, 5, 1, 4], (val) => val <= 3); // AsyncIterableIterator<3, 2>
 */
export function takeWhile<T>(iterable: AsyncIterable<T>, predicate: (val: T) => boolean): AsyncIterableIterator<T>;

/**
 * service overload
 */
export function takeWhile<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): AnyIterableIterator<T>;

export function takeWhile<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): AnyIterableIterator<T> {
  return createII(iterable, (chunk) => {
    return predicate(chunk.value) ? chunk : { done: true, value: undefined };
  });
}
