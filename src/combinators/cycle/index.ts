import { asyncIIFactory, isAsyncIterable, syncIIFactory } from 'utils';

/**
 * loops through the specified `Iterable` and stores each value
 * once the iterable is done infinitely yields stored values
 *
 * @param iterable - the target `Iterable` object
 *
 * @returns inifinite `IterableIterator` with the value from original iterable
 *
 * @example
 * cycle('ab'); // IterableIterator<'a', 'b', 'a', 'b', 'a', 'b', ...>;
 */
export function cycle<T>(iterable: Iterable<T>): IterableIterator<T>;

/**
 * loops through the specified `AsyncIterable` and stores each value
 * once the iterable is done infinitely yields stored values
 *
 * @param iterable - the target `AsyncIterable` object
 *
 * @returns inifinite `AsyncIterableIterator` with the value from original iterable
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 'a'; yield 'b';
 * }
 * cycle(gen()); // AsyncIterableIterator<'a', 'b', 'a', 'b', 'a', 'b', ...>;
 */
export function cycle<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T>;

/**
 * service overload
 */
export function cycle<T>(iterable: AnyIterable<T>): AnyIterableIterator<T>;

export function cycle<T>(iterable: AnyIterable<T>): AnyIterableIterator<T> {
  return isAsyncIterable(iterable) ? acycle(iterable) : scycle(iterable);
}

function scycle<T>(iterable: Iterable<T>): IterableIterator<T> {
  const buffer: T[] = [];

  let iter: Iterator<T> = iterable[Symbol.iterator]();

  return syncIIFactory(function () {
    const chunk = iter.next();

    if (chunk.done) {
      iter = buffer[Symbol.iterator]();
      return this.next();
    }

    buffer.push(chunk.value);

    return chunk;
  });
}

function acycle<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> {
  const buffer: T[] = [];

  let iter: AnyIterator<T> = iterable[Symbol.asyncIterator]();

  return asyncIIFactory(async function () {
    const chunk = await iter.next();

    if (chunk.done) {
      iter = buffer[Symbol.iterator]();
      return this.next();
    }

    buffer.push(chunk.value);

    return chunk;
  });
}
