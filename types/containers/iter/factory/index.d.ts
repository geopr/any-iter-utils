import { SyncIter, AsyncIter } from 'containers';
/**
 * converts `Iterable` object into `SyncIter`
 *
 * @param iterable - the `Iterable` object to convert
 *
 * @returns new `SyncIter` instance bound to the specified `Iterable`
 *
 * @example
 * const iterable: Iterable<number> = [];
 * intoIter(iterable); // SyncIter<number>
 */
export declare function intoIter<T>(iterable: Iterable<T>): SyncIter<T>;
/**
 * converts `AsyncIterable` object into `AsyncIter`
 *
 * @param iterable - the `AsyncjIterable` object to convert
 *
 * @returns new `AsyncIter` instance bound to the specified `AsyncIterable`
 *
 * @example
 * const iterable: AsyncGenerator<number> = (async function* () {})();
 * intoIter(iterable); // AsyncIter<number>
 */
export declare function intoIter<T>(iterable: AsyncIterable<T>): AsyncIter<T>;
/**
 * service overload
 */
export declare function intoIter<T>(iterable: AnyIterable<T>): SyncIter<T> | AsyncIter<T>;
/**
 * creates `SyncIter` with a range of numbers
 *
 * @param from - the range starts from this number
 *
 * @param to - the range ends at this number
 * if not specified either negative or positive `Inifinity` will be taken
 * depending on the sign of "from"
 *
 * @returns new `SyncIter` instance with the range
 *
 * @example
 * intoIter(1, 3); // SyncIter<1, 2, 3>
 * intoIter(-1, -3); // SyncIter<-1, -2, -3>
 * intoIter(-1, 1); // SyncIter<-1, 0, 1>
 * intoIter(1); // SyncIter<from 1 to Inifinity>
 * intoIter(-1); // SyncIter<from -1 to -Infinity>
 */
export declare function intoIter(from: number, to?: number): SyncIter<number>;
/**
 * converts object into `SyncIter` with entries `[key, value]`
 *
 * @param obj - the object to convert
 *
 * @returns new `SyncIter` instance with the entries
 *
 * @example
 * intoIter({ foo: '1', bar: '2' }); // SyncIter<['foo', 1], ['bar', 2]>
 */
export declare function intoIter<T extends Record<PropertyKey, any>>(obj: T): SyncIter<Entry<keyof T, T[keyof T]>>;
