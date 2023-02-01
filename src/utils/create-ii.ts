import { asyncIIFactory, cast, isAsyncIterable, syncIIFactory } from 'utils';

/**
 * Creates `IterableIterator` based on the specified `Iterable`
 *
 * @param iterable - `Iterable` object to create `IterableIterator` from
 *
 * @param cb - The callback function that will be invoked in every `next` call and recieve the `IteratorResult` chunk
 * It should return a new `IteratorResult` chunk
 * The function will be bound (`this`) to the new `IterableIterator` object
 *
 * @example
 * createII([1, 2, 3], ({ done, value }) => ({ done, value: value * 2 })); // IterableIterator<2, 4, 6>
 *
 * createII([1, 2, 3], function (chunk) {
 *   return chunk.value < 1 ? this.next() : chunk;
 * }); // IterableIterator<2, 3>
 */
export function createII<T, R = T>(
  iterable: Iterable<T>,
  cb?: (this: IterableIterator<R>, chunk: IteratorResult<T>) => IteratorResult<R>
): IterableIterator<R>;

/**
 * Creates `AsyncIterableIterator` based on the specified `AsyncIterable`
 *
 * @param iterable - `AsyncIterable` object to create `AsyncIterableIterator` from
 *
 * @param cb - The callback function that will be invoked in every `next` call and recieve the `IteratorResult` chunk
 * It should return a new `IteratorResult` chunk
 * The function will be bound (`this`) to the new `AsyncIterableIterator` object
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 * createII(gen(), ({ done, value }) => ({ done, value: value * 2 })); // AsyncIterableIterator<2, 4, 6>
 */
export function createII<T, R = T>(
  iterable: AsyncIterable<T>,
  cb?: (this: AsyncIterableIterator<R>, chunk: IteratorResult<T>) => IteratorResult<R> | PromiseLike<IteratorResult<R>>,
): AsyncIterableIterator<R>;

/**
 * Service overload
 */
export function createII<T, R = T>(
  iterable: AnyIterable<T>,
  cb?: (this: AnyIterableIterator<R>, chunk: IteratorResult<T>) => IteratorResult<R> | PromiseLike<IteratorResult<R>>,
): AnyIterableIterator<R>;

export function createII<T, R>(
  iterable: AnyIterable<T>,
  cb?: (this: AnyIterable<R>, chunk: IteratorResult<T>) => IteratorResult<R> | PromiseLike<IteratorResult<R>>,
): AnyIterableIterator<R> {
  return isAsyncIterable(iterable) ? createAsync(iterable, cb) : createSync(iterable, <any>cb);
}

function createSync<T, R = T>(
  iterable: Iterable<T>,
  cb?: (chunk: IteratorResult<T>) => IteratorResult<R>,
): IterableIterator<R> {
  const iter = iterable[Symbol.iterator]();

  if (cb == null) {
    return cast(syncIIFactory(iter.next.bind(iter)));
  }

  return syncIIFactory(function () {
    const chunk = iter.next();
    return chunk.done ? chunk : cb.call(this, chunk);
  });
}

function createAsync<T, R = T>(
  iterable: AsyncIterable<T>,
  cb?: (chunk: IteratorResult<T>) => IteratorResult<R> | PromiseLike<IteratorResult<R>>,
): AsyncIterableIterator<R> {
  const iter = iterable[Symbol.asyncIterator]();

  if (cb == null) {
    return cast(asyncIIFactory(iter.next.bind(iter)));
  }

  return asyncIIFactory(function () {
    return iter.next().then(
      (chunk) => chunk.done ? chunk : cb.call(this, chunk),
    );
  });
}
