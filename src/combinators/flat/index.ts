import { isAsyncIterable, isIterable, isAnyIterable, syncIIFactory, cast, extractIter, asyncIIFactory } from 'utils';

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
  const mainIter = iterable[Symbol.iterator]();

  let subIter: Nullable<Iterator<T>>;

  return syncIIFactory(cast(function (this: IterableIterator<T | Iterable<T>>) {
    if (subIter != null) {
      const chunk = subIter.next();

      if (chunk.done) {
        subIter = null;
      } else {
        return chunk;
      }
    }

    const chunk = mainIter.next();

    if (chunk.done) {
      return { done: true, value: undefined };
    }

    if (isIterable(chunk.value)) {
      subIter = chunk.value[Symbol.iterator]();
      return this.next();
    }

    return chunk;
  }));
}

function aflat<T>(iterable: AsyncIterable<T | AnyIterable<T>>): AsyncIterableIterator<T> {
  const mainIter = iterable[Symbol.asyncIterator]();

  let subIter: Nullable<AnyIterator<T>>;

  return asyncIIFactory(cast(async function (this: AsyncIterableIterator<T | AnyIterable<T>>) {
    if (subIter != null) {
      const chunk = await subIter.next();

      if (chunk.done) {
        subIter = null;
      } else {
        return chunk;
      }
    }

    const chunk = await mainIter.next();

    if (chunk.done) {
      return { done: true, value: undefined };
    }

    if (isAnyIterable(chunk.value)) {
      subIter = extractIter(chunk.value);
      return this.next();
    }

    return chunk;
  }));
}
