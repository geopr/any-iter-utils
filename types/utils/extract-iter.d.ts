/**
 * Takes `Symbol.iterator` from the specified `Iterable` object
 */
export declare function extractIter<T>(iterable: Iterable<T>): Iterator<T>;
/**
 * Takes `Symbol.asyncIterator` from the specified `AsyncIterable` object
 */
export declare function extractIter<T>(iterable: AsyncIterable<T>): AsyncIterator<T>;
/**
 * Service overload
 */
export declare function extractIter<T>(iterable: AnyIterable<T>): AnyIterator<T>;
