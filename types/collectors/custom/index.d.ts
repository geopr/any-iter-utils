import type { Collectable } from './interface';
export { Collectable };
/**
 * transforms `Iterable` into custom `Collectable` data structure and returns the result
 *
 * @param iterable - the `Iterable` object
 *
 * @param init - the `Collectable` data structure
 *
 * @returns the specified `Collectable`
 *
 * @example
 * class Impl<T> implements Collectable<T> {
 *   store: T[] = [];
 *
 *   add(val: T): void {
 *     this.store.push(val);
 *   }
 * }
 *
 * function* gen(): Generator<number> {
 *   yield 1; yield 2;
 * }
 *
 * intoCustom(gen(), new Impl()).store; // [1, 2]
 */
export declare function intoCustom<T, R extends Collectable<T> = Collectable<T>>(iterable: Iterable<T>, init: R): R;
/**
 * transforms `AsyncIterable` into custom `Collectable` data structure and `Promise` with the result
 *
 * @param iterable - the `AsyncIterable` object
 *
 * @param init - the `Collectable` data structure
 *
 * @returns the `Promise` with the specified `Collectable`
 *
 * @example
 * class Impl<T> implements Collectable<T> {
 *   store: T[] = [];
 *
 *   add(val: T): void {
 *     this.store.push(val);
 *   }
 * }
 *
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2;
 * }
 *
 * (await intoCustom(gen(), new Impl())).store; // [1, 2]
 */
export declare function intoCustom<T, R extends Collectable<T> = Collectable<T>>(iterable: AsyncIterable<T>, init: R): Promise<R>;
/**
 * service overload
 */
export declare function intoCustom<T, R extends Collectable<T> = Collectable<T>>(iterable: AnyIterable<T>, init: R): Promisify<R>;
