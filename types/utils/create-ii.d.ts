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
export declare function createII<T, R = T>(iterable: Iterable<T>, cb?: (this: IterableIterator<R>, chunk: IteratorResult<T>) => IteratorResult<R>): IterableIterator<R>;
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
export declare function createII<T, R = T>(iterable: AsyncIterable<T>, cb?: (this: AsyncIterableIterator<R>, chunk: IteratorResult<T>) => IteratorResult<R> | PromiseLike<IteratorResult<R>>): AsyncIterableIterator<R>;
/**
 * Service overload
 */
export declare function createII<T, R = T>(iterable: AnyIterable<T>, cb?: (this: AnyIterableIterator<R>, chunk: IteratorResult<T>) => IteratorResult<R> | PromiseLike<IteratorResult<R>>): AnyIterableIterator<R>;
