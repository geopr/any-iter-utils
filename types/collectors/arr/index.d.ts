/**
 * transforms `Iterable` into array and returns the result
 *
 * @param iterable - the `Iterable` object
 *
 * @param init - initial array to add values to
 * if not specified empty array is taken
 *
 * @returns array of values from the specified `Iterable` object
 *
 * @example
 * function* gen(): Generator<number> {
 *   yield 1; yield 2;
 * }
 *
 * intoArr(gen()); // [1, 2]
 * intoArr(gen(), [0]); // [0, 1, 2]
 */
export declare function intoArr<T>(iterable: Iterable<T>, init?: T[]): T[];
/**
 * transforms `AsyncIterable` into array and returns `Promise` with the result
 *
 * @param iterable - the `AsyncIterable` object
 *
 * @param init - initial array to add values to
 * if not specified empty array is taken
 *
 * @returns `Promise` with the array of values from the specified `AsyncIterable` object
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2;
 * }
 *
 * intoArr(gen()); // Promise<[1, 2]>
 * intoArr(gen(), [0]); // Promise<[0, 1, 2]>
 */
export declare function intoArr<T>(iterable: AsyncIterable<T>, init?: T[]): Promise<T[]>;
/**
 * service overload
 */
export declare function intoArr<T>(iterable: AnyIterable<T>, init?: T[]): Promisify<T[]>;
