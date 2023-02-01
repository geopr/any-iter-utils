import { Option } from 'containers';
/**
 * it works with the `Option` container type
 * if the returned from callback value is Option.Some it will stay in the returnable `IterableIterator`
 * otherwise it will be excluded
 *
 * @param iterable - the target `Iterable` object
 *
 * @param cb - the callback function
 * it will be called on each `Iterator.next` call and recieve the value
 * the returned value of the callback should be either Option.Some or Option.None
 *
 * @returns new `IterableIterator` with excluded and transformed values
 *
 * let's say we have some container type that's pretty domain specific
 * and contains a bunch of methods to do some task
 *
 * for example "Entry" can have methods like "val", "key", etc...
 * it also can have a method called "valAnd" which returns Option.Some with the value from the entry
 * if the passed predicate callback returns true, otherwise it returns Option.None
 *
 * ```
 * Entry(['foo' 1]).valAnd(([, val]) => val > 0); // Option.Some(1)
 * Entry(['foo' 1]).valAnd(([, val]) => val > 2); // Option.None()
 * ```
 *
 * then you can write pretty declarative code with this
 *
 * @example
 * filterMap(
 *   Map([['foo', 21], ['_bar', 42]]),
 *   (entry) => Entry(entry).valAnd(([key]) => !key.startsWith('_')),
 * ); // IterableIterator<['foo', 21]>
 */
export declare function filterMap<T, R>(iterable: Iterable<T>, cb: (value: T) => Option<R>): IterableIterator<R>;
/**
 * it works with the `Option` container type
 * if the returned from callback value is Option.Some it will stay in the returnable `AsyncIterableIterator`
 * otherwise it will be excluded
 *
 * @param iterable - the target `AsyncIterable` object
 *
 * @returns new `AsyncIterableIterator` with excluded and transformed values
 *
 * @param cb - the callback function
 * it will be called on each `AsyncIterator.next` call and recieve the value
 * the returned value of the callback should be either Option.Some or Option.None
 *
 * let's say we have some container type that's pretty domain specific
 * and contains a bunch of methods to do some task
 *
 * for example "Entry" can have methods like "val", "key", etc...
 * it also can have a method called "valAnd" which returns Option.Some with the value from the entry
 * if the passed predicate callback returns true, otherwise it returns Option.None
 *
 * ```
 * Entry(['foo' 1]).valAnd(([, val]) => val > 0); // Option.Some(1)
 * Entry(['foo' 1]).valAnd(([, val]) => val > 2); // Option.None()
 * ```
 *
 * then you can write pretty declarative code with this
 *
 * @example
 * filterMap(
 *   Map([['foo', 21], ['_bar', 42]]),
 *   (entry) => Entry(entry).valAnd(([key]) => !key.startsWith('_')),
 * ); // AsyncIterableIterator<['foo', 21]>
 */
export declare function filterMap<T, R>(iterable: AsyncIterable<T>, cb: (value: T) => Option<R>): AsyncIterableIterator<R>;
/**
 * service overload
 */
export declare function filterMap<T, R>(iterable: AnyIterable<T>, cb: (value: T) => Option<R>): AnyIterableIterator<R>;
