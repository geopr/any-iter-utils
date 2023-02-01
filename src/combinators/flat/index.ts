import { fromGen, isAsyncIterable, isIterable, isAnyIterable } from 'utils';

/**
 * checks each value of the specified `Iterable` 
 * if the value is `Iterable` yields its values otherwise yields the value itself
 * 
 * @param iterable - `Iterable` object on flat
 *
 * @returns new `IterableIterator` with possibly flatted values
 *
 * @example
 * function* gen(): Generator<number | Iterable<number>> {
 *   yield 1;
 *   yield [2, 3];
 * }
 * flat(gen()); // IterableIterator<1, 2, 3>
 */
export function flat<T>(iterable: Iterable<T | Iterable<T>>): IterableIterator<T>;

/**
 * checks each value of the specified `AsyncIterable` 
 * if the value is any iterable yields its values otherwise yields the value itself
 * 
 * @param iterable - `AsyncIterable` object on flat
 *
 * @returns new `AsyncIterableIterator` with possibly flatted values
 *
 * @example
 * async function* gen(): AsyncGenerator<number | Iterable<number> | AsyncIterable<number>> {
 *   yield 1;
 *   yield [2];
 *   yield (async function* () { yield 3; })();
 * }
 * flat(gen()); // IterableIterator<1, 2, 3>
 */
export function flat<T>(iterable: AsyncIterable<T | AnyIterable<T>>): AsyncIterableIterator<T>;

/**
 * service overload
 */
export function flat<T>(iterable: AnyIterable<T | AnyIterable<T>>): AnyIterableIterator<T>;

export function flat<T>(iterable: Iterable<T | Iterable<T>> | AsyncIterable<T | AnyIterable<T>>): AnyIterableIterator<T> {
  return isAsyncIterable(iterable) ? aflat(iterable) : sflat(iterable);
}

function sflat<T>(iterable: Iterable<T | Iterable<T>>): IterableIterator<T> {
  return fromGen(function* () {
    for (const value of iterable) {
      if (isIterable(value)) {
        yield* value;
      } else {
        yield value;
      }
    }
  });
}

function aflat<T>(iterable: AsyncIterable<T | AnyIterable<T>>): AsyncIterableIterator<T> {
  return fromGen(async function* () {
    for await (const value of iterable) {
      if (isAnyIterable(value)) {
        yield* value;
      } else {
        yield value;
      }
    }
  });
}
