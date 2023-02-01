import { map } from 'combinators';

/**
 * transforms values of `Iterable` into entries `[index, value]`
 *
 * @param iterable - `Iterable` object to be transformed
 *
 * @returns new `IterableIterator` with entries `[index, value]`
 *
 * @example
 * enumerate(['foo', 'bar']); // IterableIterator<[0, 'foo'], [1, 'bar']>
 */
export function enumerate<T>(iterable: Iterable<T>): IterableIterator<Entry<number, T>>;

/**
 * transforms values of `AsyncIterable` into entries `[index, value]`
 *
 * @param iterable - `AsyncIterable` object to be transformed
 *
 * @returns new `AsyncIterableIterator` with entries `[index, value]`
 *
 * @example
 * async function* gen(): AsyncGenerator<string> {
 *   yield 'foo'; yield 'bar';
 * }
 * enumerate(gen()); // AsyncIterableIterator<[0, 'foo'], [1, 'bar']>
 */
export function enumerate<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<Entry<number, T>>;

/**
 * service overload
 */
export function enumerate<T>(iterable: AnyIterable<T>): AnyIterableIterator<Entry<number, T>>;

export function enumerate<T>(iterable: AnyIterable<T>): AnyIterableIterator<Entry<number, T>> {
  let i = 0;
  return map(iterable, (value) => [i++, value]);
}
