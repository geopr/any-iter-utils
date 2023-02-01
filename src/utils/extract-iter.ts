import { isAsyncIterable } from 'utils';

/**
 * Takes `Symbol.iterator` from the specified `Iterable` object
 */
export function extractIter<T>(iterable: Iterable<T>): Iterator<T>;

/**
 * Takes `Symbol.asyncIterator` from the specified `AsyncIterable` object
 */
export function extractIter<T>(iterable: AsyncIterable<T>): AsyncIterator<T>;

/**
 * Service overload
 */
export function extractIter<T>(iterable: AnyIterable<T>): AnyIterator<T>;

export function extractIter<T>(iterable: AnyIterable<T>): AnyIterator<T> {
  return isAsyncIterable(iterable) ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
}
