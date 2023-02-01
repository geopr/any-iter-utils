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
export declare function cycle<T>(iterable: Iterable<T>): IterableIterator<T>;
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
export declare function cycle<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T>;
/**
 * service overload
 */
export declare function cycle<T>(iterable: AnyIterable<T>): AnyIterableIterator<T>;
