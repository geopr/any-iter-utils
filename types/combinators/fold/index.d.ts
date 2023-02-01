/**
 * transforms `Iterable` object into another specified value
 *
 * @param iterable - the target `Iterable` object
 *
 * @param init - the initial value for furher transformation
 *
 * @param cb - the callback will be called on each iteration and accept 2 arguments
 *
 * the first one is the current accumulator value
 * the second one is the current value of iteration
 *
 * it should return the new accumulator value for the next iteration
 *
 * @returns the transformed value
 *
 * @example
 * fold([1, 2, 3], 0, (acc, val) => acc + val); // 6
 * fold([1, 2, 3], '', (acc, val) => `${acc}${val}`); // '123'
 */
export declare function fold<T, R>(iterable: Iterable<T>, init: R, cb: (acc: R, val: T) => R): R;
/**
 * transforms `AsyncIterable` object into another specified value
 *
 * @param iterable - the target `AsyncIterable` object
 *
 * @param init - the initial value for furher transformation
 *
 * @param cb - the callback will be called on each iteration and accept 2 arguments
 *
 * the first one is the current accumulator value
 * the second one is the current value of iteration
 *
 * it should return the new accumulator value for the next iteration
 *
 * @returns the `Promise` with the transformed value
 *
 * @example
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 *
 * fold(gen(), 0, (acc, val) => acc + val); // Promise<6>
 * fold(gen(), '', (acc, val) => `${acc}${val}`); // Promise<'123'>
 */
export declare function fold<T, R>(iterable: AsyncIterable<T>, init: R, cb: (acc: R, val: T) => R): Promise<R>;
/**
 * service overload
 */
export declare function fold<T, R>(iterable: AnyIterable<T>, init: R, cb: (acc: R, val: T) => R): Promisify<R>;
