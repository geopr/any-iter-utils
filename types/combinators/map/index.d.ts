/**
 * transforms each value to the value returned from the callback function
 *
 * @param iterable - `Iterable` object on which the operatoin will be performed
 *
 * @param cb - the callback function
 * it will be called on each `Iterator.next` call and recieve the value
 * the returned value of the callback will be in the returnable `IterableIterator`
 *
 * @returns new `IterableIterator` with transformed values
 *
 * @example
 * const iterable: number[] = [1, 2, 3];
 *
 * map(iterable, (val) => val * 2); // IterableIterator<2, 4, 6>
 * map(iterable, String); // IterableIterator<'1', '2', '3'>
 */
export declare function map<T, R>(iterable: Iterable<T>, cb: (value: T) => R): IterableIterator<R>;
/**
 * transforms each value to the value returned from the callback function
 *
 * @param iterable - `AsyncIterable` object on which the operatoin will be performed
 *
 * @param cb - the callback function
 * it will be called on each `AsyncIterator.next` call and recieve the value
 * the returned value of the callback will be in the returnable `AsyncIterableIterator`
 *
 * @returns new `AsyncIterableIterator` with transformed values
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2;
 * }
 *
 * map(gen(), (val) => val * 2); // AsyncIterableIterator<2, 4, 6>
 * map(gen(), String); // AsyncIterableIterator<'1', '2', '3'>
 */
export declare function map<T, R>(iterable: AsyncIterable<T>, cb: (value: T) => R): AsyncIterableIterator<R>;
/**
 * service overload
 */
export declare function map<T, R>(iterable: AnyIterable<T>, cb: (value: T) => R): AnyIterableIterator<R>;
