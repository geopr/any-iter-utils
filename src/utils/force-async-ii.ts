import { asyncIIFactory, extractIter } from 'utils';

/**
 * converts specified `AnyIterable` into `AsyncIterableIterator`
 *
 * @param iterable - `AnyIterable` to convert
 *
 * @example
 * forcesyncII([1, 2, 3]); // AsyncIterableIterator<1, 2, 3>
 *
 * async function* gen() {
 *   yield 1; yield 2; yield 3;
 * }
 * forceAsyncII(gen()); // AsyncIterableIterator<1, 2, 3>
 */
export function forceAsyncII<T>(iterable: AnyIterable<T>): AsyncIterableIterator<T> {
  const iter = extractIter(iterable);
  return asyncIIFactory(iter.next.bind(iter));
}
