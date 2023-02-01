/**
 * transforms each value to the value returned from the callback function and flats if the returned value is `Iterable`
 *
 * @param iterable - `Iterable` object on which the operatoin will be performed
 *
 * @param cb - the callback function
 * it will be called on each `Iterator.next` call and recieve the value
 * if the returned value of the callback is `Iterable` all its values will be yielded
 * otherwise the value itself will be in the returnable `IterableIterator`
 *
 * @returns new `IterableIterator` with transformed and possibly flatted values
 *
 * @example
 * flatMap(<number[]>[1, 2, 3], (val) => [String(val), String(val)]); // IterableIterator<"1", "1", "2", "2", "3", "3">
 */
export declare function flatMap<T, R>(iterable: Iterable<T>, cb: (val: T) => Iterable<R> | R): IterableIterator<R>;
/**
 * transforms each value to the value returned from the callback function and flats if the returned value is `AsyncIterable`
 *
 * @param iterable - `AsyncIterable` object on which the operatoin will be performed
 *
 * @param cb - the callback function
 * it will be called on each `AsyncIterator.next` call and recieve the value
 * if the returned value of the callback is `AsyncIterable` all its values will be yielded
 * otherwise the value itself will be in the returnable `AsyncIterableIterator`
 *
 * @returns new `AsyncIterableIterator` with transformed and possibly flatted values
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 * flatMap(gen(), (val) => [String(val), String(val)]); // AsyncIterableIterator<"1", "1", "2", "2", "3", "3">
 */
export declare function flatMap<T, R>(iterable: AsyncIterable<T>, cb: (val: T) => AnyIterable<R> | R): AsyncIterableIterator<R>;
/**
 * service overload
 */
export declare function flatMap<T, R>(iterable: AnyIterable<T>, cb: (val: T) => AnyIterable<R> | R): AnyIterableIterator<R>;
