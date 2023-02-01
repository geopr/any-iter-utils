/**
 * Checks that every value in the specified `Iterable` matches the predicate callback
 *
 * @param iterable -The `Iterable` object to check
 *
 * @param predicate - The callback function that will be invoked on every iteration and recieve
 * the value. It should return `boolean`
 *
 * @returns `true` in case every call of the predicate returned `true`, otherwise returns `false`
 *
 * @example
 * const
 *   isPositive = (val: number) => val > 0;
 *
 * every([1, 2, 3], isPositive); // true
 * every([1, -2, 3], isPositive); // false
 */
export declare function every<T>(iterable: Iterable<T>, predicate: (val: T) => boolean): boolean;
/**
 * Checks that every value in the specified `AsyncIterable` matches the predicate callback
 *
 * @param iterable -The `AsyncIterable` object to check
 *
 * @param predicate - The callback function that will be invoked on every iteration and recieve
 * the value. It should return `boolean`
 *
 * @returns Promise with `true` in case every call of the predicate returned `true`, otherwise returns Promise with `false`
 *
 * @example
 * const
 *   isPositive = (val: number) => val > 0;
 *
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 *
 * async function* gen2(): AsyncGenerator<number> {
 *   yield -1;
 *   yield* gen();
 * }
 *
 * every(gen(), isPositive); // Promise<true>
 * every(gen2(), isPositive); // Promise<false>
 */
export declare function every<T>(iterable: AsyncIterable<T>, predicate: (val: T) => boolean): Promise<boolean>;
/**
 * Service overload
 */
export declare function every<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): Promisify<boolean>;
