/**
 * Checks that at least one value in the specified `Iterable` matches the predicate
 *
 * @param iterable -The `Iterable` object to check
 *
 * @param predicate - The callback function that will be invoked on every iteration and recieve
 * the value. It should return `boolean`
 *
 * @returns `true` in case at least one call of the predicate returned `true`, otherwise returns `false`
 *
 * @example
 * const
 *   isPositive = (val: number) => val > 0;
 *
 * some([1, 2, 3], isPositive); // true
 * some([1, -2, 3], isPositive); // true
 * some([-1, -2, -3], isPositive); // false
 */
export declare function some<T>(iterable: Iterable<T>, predicate: (val: T) => boolean): boolean;
/**
 * Checks that at least one value in the specified `AsyncIterable` matches the predicate
 *
 * @param iterable -The `AsyncIterable` object to check
 *
 * @param predicate - The callback function that will be invoked on every iteration and recieve
 * the value. It should return `boolean`
 *
 * @returns Promise with `true` in case at least one call of the predicate returned `true`, otherwise returns Promise with `false`
 *
 * @example
 * const
 *   isPositive = (val: number) => val > 0;
 *
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 * every(gen(), isPositive); // Promise<true>
 *
 * async function* gen2(): AsyncGenerator<number> {
 *   yield -1;
 * }
 * every(gen2(), isPositive); // Promise<false>
 *
 * async function* gen3(): AsyncGenerator<number> {
 *   yield* gen2();
 *   yield* gen();
 * }
 * every(gen3(), isPositive); // Promise<true>
 */
export declare function some<T>(iterable: AsyncIterable<T>, predicate: (val: T) => boolean): Promise<boolean>;
/**
 * Service overload
 */
export declare function some<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): Promisify<boolean>;
