/**
 * transforms `Iterable` into `Set` and returns the result
 *
 * @param iterable - the `Iterable` object
 *
 * @param init - initial `Set` to add values to
 * if not specified empty `Set` is taken
 *
 * @returns the `Set` of values from the specified `Iterable` object
 *
 * @example
 * function* gen(): Generator<number> {
 *   yield 1; yield 2; yield 1;
 * }
 *
 * intoSet(gen()); // Set<1, 2>
 * intoSet(gen(), new Set(0)); // Set<0, 1, 2>
 */
export declare function intoSet<T>(iterable: Iterable<T>, init?: Set<T>): Set<T>;
/**
 * transforms `AsyncIterable` into `Set` and returns `Promise` with the result
 *
 * @param iterable - the `AsyncIterable` object
 *
 * @param init - initial `Set` to add values to
 * if not specified empty `Set` is taken
 *
 * @returns `Promise` with the `Set` of values from the specified `AsyncIterable` object
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 1;
 * }
 *
 * intoSet(gen()); // Promise<Set<1, 2>>
 * intoSet(gen(), new Set(0)); // Promise<Set<0, 1, 2>>
 */
export declare function intoSet<T>(iterable: AsyncIterable<T>, init?: Set<T>): Promise<Set<T>>;
/**
 * service overload
 */
export declare function intoSet<T>(iterable: AnyIterable<T>, init?: Set<T>): Promisify<Set<T>>;
