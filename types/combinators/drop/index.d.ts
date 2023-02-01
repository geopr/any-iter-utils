/**
 * drops specified amount of values from `Iterable`
 * in other words, it starts yielding values of the `Iterable` from the specified index
 *
 * @param iterable - `Iterable` object to drop values from
 *
 * @param amount - amount of values to drop (index to start yielding values from)
 *
 * @returns new `IterableIterator` without dropped vales
 *
 * @example
 * drop([1, 2, 3, 4, 5], 2); // IterableIterator<[3, 4, 5]>
 */
export declare function drop<T>(iterable: Iterable<T>, amount: number): IterableIterator<T>;
/**
 * drops specified amount of values from `AsyncIterable`
 * in other words, it starts yielding values of the `AsyncIterable` from the specified index
 *
 * @param iterable - `AsyncIterable` object to drop values from
 *
 * @param amount - amount of values to drop (index to start yielding values from)
 *
 * @returns new `AsyncIterableIterator` without dropped vales
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield* <any>[1, 2, 3, 4, 5];
 * }
 * drop(gen(), 2); // AsyncIterableIterator<[3, 4, 5]>
 */
export declare function drop<T>(iterable: AsyncIterable<T>, amount: number): AsyncIterableIterator<T>;
/**
 * service overload
 */
export declare function drop<T>(iterable: AnyIterable<T>, amount: number): AnyIterableIterator<T>;
