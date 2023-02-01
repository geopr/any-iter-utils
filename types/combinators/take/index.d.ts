/**
 * takes specified amount of values from `Iterable`
 * in other words, it yields values of the `Iterable` before the specified index, including the value on index
 *
 * @param iterable - `Iterable` object to take values from
 *
 * @param amount - amount of values to take (index to stop yielding values at)
 *
 * @returns new `IterableIterator` with taken values
 *
 * @example
 * take([1, 2, 3, 4, 5], 2); // IterableIterator<1, 2>
 * take([1, 2, 3, 4, 5], 10); // IterableIterator<1, 2, 3, 4, 5>
 * take([1, 2, 3, 4, 5], 0); // IterableIterator<> (done=true)
 */
export declare function take<T>(iterable: Iterable<T>, amount: number): IterableIterator<T>;
/**
 * takes specified amount of values from `AsyncIterable`
 * in other words, it yields values of the `AsyncIterable` before the specified index, including the value on index
 *
 * @param iterable - `AsyncIterable` object to take values from
 *
 * @param amount - amount of values to take (index to stop yielding values at)
 *
 * @returns new `AsyncIterableIterator` with taken values
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield* <any>[1, 2, 3, 4, 5];
 * }
 * take(gen(), 2); // AsyncIterableIterator<1, 2>
 * take(gen(), 10); // AsyncIterableIterator<1, 2, 3, 4, 5>
 * take(gen(), 0); // AsyncIterableIterator<> (done=true)
 */
export declare function take<T>(iterable: AsyncIterable<T>, amount: number): AsyncIterableIterator<T>;
/**
 * service overload
 */
export declare function take<T>(iterable: AnyIterable<T>, amount: number): AnyIterableIterator<T>;
