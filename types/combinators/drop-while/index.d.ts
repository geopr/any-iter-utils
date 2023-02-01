/**
 * drops values from `Iterable` while the predicate returns true
 *
 * @param iterable - `Iterable` object to drop values from
 *
 * @param predicate - the predicate function
 * it will be called on each `Iterator.next` call and recieve the value
 * if it returns true the value will be dropped otherwise the dropping process stops
 *
 * @returns new `IterableIterator` without dropped vales
 *
 * @example
 * dropWhile([3, 2, 5, 1, 4], (val) => val <= 3); // IterableIterator<5, 1, 4>
 */
export declare function dropWhile<T>(iterable: Iterable<T>, predicate: (val: T) => boolean): IterableIterator<T>;
/**
 * drops values from `AsyncIterable` while the predicate returns true
 *
 * @param iterable - `AsyncIterable` object to drop values from
 *
 * @param predicate - the predicate function
 * it will be called on each `AsyncIterator.next` call and recieve the value
 * if it returns true the value will be dropped otherwise the dropping process stops
 *
 * @returns new `AsyncIterableIterator` without dropped vales
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield* <any>[3, 2, 5, 1, 4];
 * }
 * dropWhile([3, 2, 5, 1, 4], (val) => val <= 3); // AsyncIterableIterator<5, 1, 4>
 */
export declare function dropWhile<T>(iterable: AsyncIterable<T>, predicate: (val: T) => boolean): AsyncIterableIterator<T>;
/**
 * service overload
 */
export declare function dropWhile<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): AnyIterableIterator<T>;
